<?php

namespace App\Services\V1\ProjectTransaction;

use App\Constants\ProjectTransactionConstant;
use App\Constants\RoleConstant;
use App\Helpers\Auth\AuthHelper;
use App\Helpers\Queries\QueryHelper;
use App\Http\Resources\V1\ProjectTransaction\ProjectTransactionCollection;
use App\Models\ProjectTransaction;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectTransactionService
{
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
            default:
                $validation = [
                    'project_id' => 'required|exists:projects,id',
                    'created_by' => 'required|exists:users,id',
                    'reject_reason' => 'required|string|max:255',
                ];
                return;
        }
        ;

        $request->validate($validation);
    }

    public function getList(Request $request, $isPerUser = true)
    {
        $projectTransactionQuery = new QueryHelper(new ProjectTransaction, $request);
        $projectTransactionQuery = $projectTransactionQuery->query()->with(['users', 'user']);

        if ($isPerUser && AuthHelper::roleContain([RoleConstant::CLIENT])) {
            $projectTransactionQuery = $projectTransactionQuery->with([
                'user' => function ($query) {
                    $query->where('id', AuthHelper::currentUser()->id);
                }
            ]);
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
        $projectTransaction->save();

        return $projectTransaction;
    }

    public function getUnfilteredList()
    {
        return User::select('id', 'name', 'email', 'role')->whereIn('role', [RoleConstant::CEO, RoleConstant::CFO, RoleConstant::CTO])->get();
    }

    public function assignUsers(Request $request, $id)
    {
        $projectTransaction = $this->getDetail($id);
        $projectTransaction->users()->sync($request->get('users'));
        $projectTransaction->load(['users']);

        return $projectTransaction;
    }

    public function update($id, $currentProject)
    {
        $projectTransaction = $this->getDetail($id);
        $projectTransaction->active_project = json_encode($currentProject);
        $projectTransaction->save();

        return $projectTransaction;
    }
}