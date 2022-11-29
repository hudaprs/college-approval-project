<?php

namespace App\Http\Controllers\V1\Master;

use App\Http\Controllers\Controller;
use App\Services\V1\Master\ProjectService;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    use ResponseApi;

    protected ProjectService $projectService;

    function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->success('Get company list success', $this->projectService->getList($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->projectService->validate($request);

        try {
            DB::beginTransaction();

            $company = $this->projectService->createUpdate($request);

            DB::commit();
            return $this->success('Project created successfully', $company, 201);
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
    public function show($id)
    {
        try {
            return $this->success('Get project detail success', $this->projectService->getDetail($id));
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
    public function update(Request $request, $id)
    {
        $this->projectService->validate($request);

        try {
            DB::beginTransaction();

            $company = $this->projectService->createUpdate($request, $id);

            DB::commit();
            return $this->success('Project updated successfully', $company);
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
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $company = $this->projectService->delete($id);

            DB::commit();
            return $this->success('Project deleted successfully', $company);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }
}
