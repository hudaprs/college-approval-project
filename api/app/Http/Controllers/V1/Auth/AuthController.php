<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Services\V1\Auth\AuthService;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    use ResponseApi;

    protected AuthService $authService;

    function __construct(AuthService $authService)
    {
        $this->authService = $authService;
        $this->middleware('auth:api', ['except' => ['login', 'register', 'companyDropdown']]);
    }

    public function login(Request $request)
    {
        $this->authService->validate($request);

        try {
            $token = $this->authService->login($request);

            if (!$token) return $this->error("Invalid credentials", 400);

            return $this->success('Login success', [
                'token' => $token
            ]);
        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    public function register(Request $request)
    {
        $this->authService->validate($request, true);

        DB::beginTransaction();
        try {
            $user = $this->authService->register($request);

            DB::commit();
            return $this->success('Register success', $user, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    public function refreshToken()
    {
        return $this->success('Token refreshed', [
            'token' => $this->authService->refreshToken()
        ]);
    }

    public function logout()
    {
        $this->authService->logout();
        return $this->success('Successfully logout');
    }

    public function me()
    {
        return $this->success("Hi " . $this->authService->me()->name, $this->authService->me());
    }

    public function companyDropdown()
    {

    }
}
