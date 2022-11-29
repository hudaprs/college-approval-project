<?php

namespace App\Services\V1\Master;

use App\Helpers\Queries\Query;
use App\Http\Resources\V1\Master\ProjectCollection;
use App\Models\Project;
use App\Services\V1\Auth\AuthService;
use App\Traits\ResponseApi;
use App\Helpers\Constants\RoleConstant;
use Illuminate\Http\Request;

class ProjectService
{
    use ResponseApi;

    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

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

    public function getList(Request $request)
    {
        $query = new Query(new Project, $request);

        if ($this->authService->roleContain([RoleConstant::CLIENT])) {
            $query = $query->where('user_id', $this->authService->currentUser()->id);
        }

        return new ProjectCollection($query->paginate(10));
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

        // Only insert in the first create / not edit
        if (!$id) {
            $project->user_id = $this->authService->currentUser()->id;
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
