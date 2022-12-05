<?php

namespace App\Http\Controllers\V1\UserManagement;

use App\Http\Controllers\Controller;
use App\Services\V1\UserManagement\UserService;
use App\Traits\ResponseApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    use ResponseApi;

    private UserService $userService;

    function __construct(UserService $userService)
    {
        $this->userService = $userService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        return $this->success('Get user list success', $this->userService->getList($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): JsonResponse
    {
        $this->userService->validate($request);

        try {
            DB::beginTransaction();

            $user = $this->userService->createUpdate($request);

            DB::commit();
            return $this->success('User created successfully', $user, 201);
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
            return $this->success('Get user detail success', $this->userService->getDetail($id));
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
        $this->userService->validate($request);

        try {
            DB::beginTransaction();

            $user = $this->userService->createUpdate($request, $id);

            DB::commit();
            return $this->success('User updated successfully', $user);
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

            $user = $this->userService->delete($id);

            DB::commit();
            return $this->success('User deleted successfully', $user);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }
}