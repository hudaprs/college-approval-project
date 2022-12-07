<?php

namespace App\Services\V1\ProjectManagement;

use App\Constants\ProjectTransactionConstant;
use App\Helpers\Auth\AuthHelper;
use App\Constants\RoleConstant;
use App\Helpers\Queries\QueryHelper;
use App\Http\Resources\V1\ProjectManagement\ProjectCollection;
use App\Models\Project;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;

class ProjectService
{
    use ResponseApi;

    public function validate(Request $request)
    {
        $validation = [
            'name' => 'required|string|max:100',
            'budget' => 'required|numeric',
            'documents' => 'required',
            'description' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date'
        ];

        $request->validate($validation);
    }

    public function query()
    {
        return Project::query();
    }

    public function getList(Request $request, $isPerUser = true)
    {
        $projectQuery = new QueryHelper(new Project, $request);
        $projectQuery = $projectQuery->query()->with('user', 'project_transactions', 'project_transactions');

        if ($isPerUser && AuthHelper::roleContain([RoleConstant::CLIENT])) {
            $projectQuery = $projectQuery->where('user_id', AuthHelper::currentUser()->id);
        }

        return new ProjectCollection($projectQuery->paginate());
    }

    public function getDetail($id)
    {
        return $this->query()->findOrFail($id);
    }

    public function getDetailMapped($id)
    {
        $project = $this->query()->with('project_transactions')->findOrFail($id);

        return array_merge($project->toArray(), [
            'active_project_transaction' => collect($project->project_transactions)
                ->whereIn('status', ProjectTransactionConstant::PROJECT_TRANSACTION_STATUS_ON_GOING())
                ->first()
        ]);
    }

    public function createUpdate(mixed $payload, $id = null)
    {
        $project = $id ? $this->getDetail($id) : new Project();
        $project->name = $payload['name'];
        $project->budget = $payload['budget'];
        $project->documents = $payload['documents'];
        $project->description = $payload['description'];
        $project->start_date = date('Y-m-d', strtotime($payload['start_date']));
        $project->end_date = date('Y-m-d', strtotime($payload['end_date']));

        // Check if user creating this project
        if (!$id) {
            $project->user_id = AuthHelper::currentUser()->id;
        }

        $project->save();

        return $project;
    }

    public function delete($id)
    {
        $project = $this->getDetail($id);
        $project->delete();

        return $project;
    }
}