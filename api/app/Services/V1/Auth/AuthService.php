<?php

namespace App\Services\V1\Auth;

use App\Helpers\Auth\AuthHelper;
use App\Models\User;
use App\Traits\ResponseApi;
use App\Constants\RoleConstant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    use ResponseApi;

    public function validate(Request $request, string $type): void
    {
        $validation = [];

        switch ($type) {
            case "LOGIN":
                $validation = [
                    'email' => 'required|string|email',
                    'password' => 'required|string'
                ];
                break;
            case "REGISTER":
                $validation = [
                    'name' => 'required|max:100',
                    'email' => 'required|string|email|unique:users,email|max:100',
                    'password' => 'required|string|max:255',
                ];
                break;
            case "COMPLETE_PROFILE":
                $isCompanyNotExists = $request->get('is_company_not_exists');
                $validation = [
                    'company' => !$isCompanyNotExists ? 'required' : '',
                    'phone_number' => 'required|unique:users,phone_number',
                    'is_company_not_exists' => 'required',
                    'company_name' => $isCompanyNotExists ? 'required|string|max:100|unique:companies,name' : '',
                    'company_address' => $isCompanyNotExists ? 'required|string|max:255' : '',
                    'company_phone' => $isCompanyNotExists ? 'required|string|max:15|unique:companies,phone' : '',
                    'company_mobile' => $isCompanyNotExists ? 'string|max:15' : ''
                ];
                break;
            default:
                $validation = [];
                return;
        }

        $request->validate($validation);
    }


    public function login(Request $request)
    {
        return Auth::attempt($request->only('email', 'password'));
    }

    public function register(Request $request)
    {
        return User::create([
            'name' => $request->get('name'),
            'email' => strtolower($request->get('email')),
            'role' => RoleConstant::CLIENT,
            'password' => Hash::make($request->get('password')),
        ]);
    }

    public function refreshToken(Request $request)
    {
        return Auth::refresh($request->header('Authorization'));
    }

    public function updateProfile(mixed $payload)
    {
        $auth = User::findOrFail(auth()->user()->id);
        $auth->phone_number = $payload['phone_number'];
        $auth->company_id = $payload['company_id'];
        $auth->save();

        return $auth;
    }

    public function logout()
    {
        Auth::logout();
    }

    public function me()
    {
        return AuthHelper::currentUser();
    }

    public function ensureUserProfileCompleted()
    {
        return AuthHelper::isProfileCompleted();
    }
}