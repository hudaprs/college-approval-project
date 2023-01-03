<?php

namespace App\Services\V1\ProjectTransaction;

use App\Constants\ProjectTransactionConstant;
use App\Constants\RoleConstant;
use App\Helpers\Auth\AuthHelper;
use App\Helpers\Queries\QueryHelper;
use App\Http\Resources\V1\ProjectTransaction\ProjectTransactionCollection;
use App\Models\ProjectTransaction;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ProjectTransactionService
{
    use ResponseApi;


    public function validate(Request $request, mixed $type = "UPDATE_STATUS")
    {
        $validation = [];

        switch ($type) {
            case "UPDATE_STATUS":
                $validation = [
                    'status' => 'required|string'
                ];
                break;
            case "ASSIGN_USERS":
                $validation = [
                    'users' => 'required'
                ];
                break;
            case "REJECT_REASON":
                $validation = [
                    'reject_reason' => 'required|max:255'
                ];
                break;
            default:
                $validation = [
                    'project_id' => 'required|exists:projects,id',
                    'created_by' => 'required|exists:users,id',
                    'reject_reason' => 'required|string|max:255',
                ];
                return;
        };

        $request->validate($validation);
    }

    public function getList(Request $request, $isPerUser = true)
    {
        $projectTransactionQuery = new QueryHelper(new ProjectTransaction, $request);
        $projectTransactionQuery = $projectTransactionQuery->query()->with(['users', 'user']);

        if ($isPerUser && AuthHelper::roleContain([RoleConstant::CLIENT])) {
            $projectTransactionQuery = $projectTransactionQuery->whereHas('user', function ($query) {
                $query->where('id', AuthHelper::currentUser()->id);
            });
        }

        return new ProjectTransactionCollection($projectTransactionQuery->paginate());
    }

    public function create(mixed $payload)
    {
        $projectTransaction = new ProjectTransaction();
        $projectTransaction->project_id = $payload['project']['id'];
        $projectTransaction->created_by = AuthHelper::currentUser()->id;
        $projectTransaction->active_project = $payload['project'];
        $projectTransaction->save();

        return $projectTransaction;
    }

    public function getDetail($id)
    {
        return ProjectTransaction::with('user', 'users')->findOrFail($id);
    }

    public function getStatusList()
    {
        return ProjectTransactionConstant::PROJECT_TRANSACTION_STATUS_LIST();
    }

    public function updateStatus(Request $request, $id)
    {
        $projectTransaction = $this->getDetail($id);
        $projectTransaction->status = $request->get('status');

        // Check if user input reject reason
        if ($request->get('status') === ProjectTransactionConstant::REJECTED && $request->has('reject_reason')) {
            $projectTransaction->reject_reason = $request->get('reject_reason');
            $projectTransaction->rejected_date = Carbon::now();
        }

        // Check if user assigning users to project
        if ($request->has('users') && count($request->get('users')) > 0) {
            $projectTransaction->users()->sync($request->get('users'));
        }

        if ($request->get('status') === ProjectTransactionConstant::APPROVED) {
            $projectTransaction->approved_date = Carbon::now();
        }

        $projectTransaction->save();
        $projectTransaction->load(['users']);

        return $projectTransaction;
    }

    public function getNotProcessedTransaction($projectId)
    {
        // Get transaction that not processed yet, PENDING and Revise are status that not processed
        // In that case, user can edit
        return ProjectTransaction::where('project_id', $projectId)
            ->whereIn('status', ProjectTransactionConstant::PROJECT_TRANSACTION_STATUS_NOT_PROCESSED())->first();
    }

    public function assignUsers(Request $request, $id)
    {
        $projectTransaction = $this->getDetail($id);
        $projectTransaction->users()->sync($request->get('users'));
        $projectTransaction->load(['users']);

        return $projectTransaction;
    }

    public function getAssignedUser($id)
    {
        $projectTransaction = $this->getDetail($id);

        // Check if user that logged in are match with user that included to approve this project
        $projectTransactionUser = $projectTransaction->users()->where('user_id', AuthHelper::currentUser()->id)->first();
        if (!$projectTransactionUser) {
            $error = ValidationException::withMessages(['You cannot process this approval!']);
            throw $error;
        }

        return [
            'project_transaction' => $projectTransaction,
            'project_transaction_user' => $projectTransactionUser,
        ];
    }

    public function userApprove($id)
    {
        $projectTransaction = $this->getAssignedUser($id);
        $projectTransaction['project_transaction']->users()->syncWithoutDetaching([$projectTransaction['project_transaction_user']->id => ['approved_date' => Carbon::now()]]);
        $projectTransaction['project_transaction']->load(['users']);

        return $projectTransaction['project_transaction'];
    }


    public function userResetDecision($id)
    {
        $projectTransaction = $this->getAssignedUser($id);
        $projectTransaction['project_transaction']
            ->users()
            ->syncWithoutDetaching([
                $projectTransaction['project_transaction_user']->id => [
                    'approved_date' => null,
                    'rejected_date' => null,
                    'reject_reason' => null,
                ]
            ]);
        $projectTransaction['project_transaction']->load(['users']);

        return $projectTransaction['project_transaction'];
    }

    public function userReject(mixed $payload, $id)
    {
        $projectTransactionUser = $this->getAssignedUser($id);
        $projectTransactionUser['project_transaction']->users()->syncWithoutDetaching([
            $projectTransactionUser['project_transaction_user']->id => [
                'rejected_date' => Carbon::now(),
                'reject_reason' => $payload['reject_reason']
            ]
        ]);
        $projectTransactionUser['project_transaction']->load(['users']);

        return $projectTransactionUser['project_transaction'];
    }

    public function update($id, $currentProject)
    {
        $projectTransaction = $this->getDetail($id);
        $projectTransaction->active_project = json_encode($currentProject);
        $projectTransaction->save();

        return $projectTransaction;
    }

    public function calculateProjectBudget()
    {
        return ProjectTransaction::query()
            ->select(
                DB::raw('MONTH(created_at) month_number, MONTHNAME(created_at) month'),
                DB::raw("SUM(CAST(JSON_EXTRACT(active_project, '$.budget') as float)) as budget"),
            )
            ->groupby('month')
            ->orderBy('month_number', 'asc')
            ->get();
    }
}
