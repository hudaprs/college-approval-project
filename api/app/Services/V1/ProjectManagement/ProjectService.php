<?php

namespace App\Services\V1\ProjectManagement;

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

    public function getList(Request $request, $isPerUser = true)
    {
        $projectQuery = new QueryHelper(new Project, $request);
        $projectQuery = $projectQuery->query()->with('project_transactions');

        if ($isPerUser && AuthHelper::roleContain([RoleConstant::CLIENT])) {
            $projectQuery = $projectQuery->where('user_id', AuthHelper::currentUser()->id);
        }

        return new ProjectCollection($projectQuery->paginate());
    }

    public function getDetail($id)
    {
        return Project::findOrFail($id);
    }

    public function createUpdate(Request $request, $id = null)
    {
        $project = $id ? $this->getDetail($id) : new Project();
        $project->name = $request->get('name');
        $project->budget = $request->get('budget');
        $project->documents = $request->get('documents');
        $project->description = $request->get('description');
        $project->start_date = date('Y-m-d', strtotime($request->get('start_date')));
        $project->end_date = date('Y-m-d', strtotime($request->get('end_date')));

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