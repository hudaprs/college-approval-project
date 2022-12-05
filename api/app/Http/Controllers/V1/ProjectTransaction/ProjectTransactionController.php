<?php

namespace App\Http\Controllers\V1\ProjectTransaction;

use App\Http\Controllers\Controller;
use App\Services\V1\ProjectTransaction\ProjectTransactionService;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectTransactionController extends Controller
{
    use ResponseApi;

    private ProjectTransactionService $projectTransactionService;

    public function __construct(ProjectTransactionService $projectTransactionService)
    {
        $this->projectTransactionService = $projectTransactionService;
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        return $this->success('Get project transaction list success', $this->projectTransactionService->getList($request));
    }

    public function show($id)
    {
        try {
            return $this->success('Get project transaction detail success', $this->projectTransactionService->getDetail($id));
        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    public function getStatusList()
    {
        return $this->success('Get project transaction status list success', $this->projectTransactionService->getStatusList());
    }

    public function updateStatus(Request $request, $id)
    {
        $this->projectTransactionService->validate($request);

        DB::beginTransaction();
        try {
            $projectTransaction = $this->projectTransactionService->updateStatus($request, $id);

            DB::commit();
            return $this->success('Update project transaction success', $projectTransaction);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    public function getUserList()
    {
        return $this->success('Get user list success', $this->projectTransactionService->getUnfilteredList());
    }

    public function assignUsers(Request $request, $id)
    {
        $this->projectTransactionService->validate($request, "ASSIGN_USERS");

        DB::beginTransaction();
        try {
            $projectTransaction = $this->projectTransactionService->assignUsers($request, $id);

            DB::commit();
            return $this->success("Users has been successfully added to project transaction", $projectTransaction);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }
}