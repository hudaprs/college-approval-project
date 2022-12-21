<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Services\V1\Auth\AuthService;
use App\Services\V1\Master\CompanyService;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    use ResponseApi;

    protected AuthService $authService;
    protected CompanyService $companyService;

    function __construct(AuthService $authService, CompanyService $companyService)
    {
        $this->authService = $authService;
        $this->companyService = $companyService;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $this->authService->validate($request, "LOGIN");

        try {
            $token = $this->authService->login($request);

            if (!$token)
                return $this->error("Invalid credentials", 400);

            return $this->success('Login success', [
                'token' => $token
            ]);
        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    public function register(Request $request)
    {
        $this->authService->validate($request, "REGISTER");

        DB::beginTransaction();
        try {
            $auth = $this->authService->register($request);

            DB::commit();
            return $this->success('Register success', $auth, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    public function refreshToken(Request $request)
    {
        return $this->success('Token refreshed', [
            'token' => $this->authService->refreshToken($request)
        ]);
    }

    public function logout()
    {
        $this->authService->logout();
        return $this->success('Successfully logout');
    }

    public function me()
    {
        $currentUser = $this->authService->me();
        return $this->success("Hi " . $currentUser->name, $currentUser);
    }

    public function ensureProfileCompleted()
    {
        return $this->success('Profile check success', [
            'is_completed' => $this->authService->ensureUserProfileCompleted()
        ]);
    }

    public function completeProfile(Request $request)
    {
        $this->authService->validate($request, "COMPLETE_PROFILE");

        // Initial data
        $company = null;
        $auth = null;

        DB::beginTransaction();
        try {
            $isCompanyNotExists = $request->get('is_company_not_exists');

            // Check if company not exists, user must create a new one
            // Whatever, user can fill the form freely
            if ($isCompanyNotExists)
                $company = $this->companyService->createUpdate([
                    'name' => $request->get('company_name'),
                    'address' => $request->get('company_address'),
                    'phone' => $request->get('company_phone'),
                    'mobile' => $request->get('company_mobile'),
                ]);


            // And assign the empty value for the profile
            // And also assign company that created or the existing company that user select
            $auth = $this->authService->updateProfile([
                'phone_number' => $request->get('phone_number'),
                'company_id' => $request->has('company') ? $request->get('company') : $company->id
            ]);

            DB::commit();
            return $this->success('You successfully complete the profile', [
                'company' => $company,
                'auth' => $auth
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    public function getCompanyList()
    {
        return $this->success('Get company list success', $this->companyService->getUnfilteredList());
    }
}