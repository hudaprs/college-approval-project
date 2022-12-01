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

    public function validate(Request $request, $isRegister = false): void
    {
        $validation = !$isRegister ? [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ] : [
            'name' => 'required|max:100',
            'email' => 'required|string|email|unique:users,email|max:100',
            'password' => 'required|string|max:255',
        ];

        $request->validate($validation);
    }


    public function login(Request $request)
    {
        $token = Auth::attempt($request->only('email', 'password'));
        return $token;
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

    public function refreshToken()
    {
        return Auth::refresh();
    }

    public function logout()
    {
        Auth::logout();
    }

    public function me()
    {
        return AuthHelper::currentUser();
    }
}
