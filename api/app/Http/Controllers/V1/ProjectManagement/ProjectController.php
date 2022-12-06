<?php

namespace App\Http\Controllers\V1\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Services\V1\ProjectManagement\ProjectService;
use App\Services\V1\ProjectTransaction\ProjectTransactionService;
use App\Traits\ResponseApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    use ResponseApi;

    private ProjectService $projectService;
    private ProjectTransactionService $projectTransactionService;

    function __construct(ProjectService $projectService, ProjectTransactionService $projectTransactionService)
    {
        $this->projectService = $projectService;
        $this->projectTransactionService = $projectTransactionService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        return $this->success('Get company list success', $this->projectService->getList($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): JsonResponse
    {
        $this->projectService->validate($request);

        try {
            DB::beginTransaction();

            $project = $this->projectService->createUpdate([
                'name' => $request->get('name'),
                'budget' => $request->get('budget'),
                'documents' => $request->get('documents'),
                'description' => $request->get('description'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date')
            ]);
            $projectTransaction = $this->projectTransactionService->create(['project' => $project]);

            DB::commit();
            return $this->success('Project created successfully', [
                'project' => $project,
                'project_transaction' => $projectTransaction
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        try {
            return $this->success('Get project detail success', $this->projectService->getDetail($id, true));
        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): JsonResponse
    {
        $this->projectService->validate($request);

        try {
            DB::beginTransaction();

            $project = $this->projectService->createUpdate([
                'name' => $request->get('name'),
                'budget' => $request->get('budget'),
                'documents' => $request->get('documents'),
                'description' => $request->get('description'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date')
            ], $id);

            // Check if project
            $onGoingProjectTransaction = $this->projectTransactionService->getNotProcessedTransaction($id);
            if ($onGoingProjectTransaction) {
                $onGoingProjectTransaction->active_project = $project;
                $onGoingProjectTransaction->save();
            }

            DB::commit();
            return $this->success('Project updated successfully', $project);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $project = $this->projectService->delete($id);

            DB::commit();
            return $this->success('Project deleted successfully', $project);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }
}