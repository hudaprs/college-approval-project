<?php

namespace App\Helpers\Auth;

use App\Constants\RoleConstant;

class AuthHelper
{
    public static function currentUser()
    {
        return auth()->user()->load(['company', 'projects']);
    }


    public static function roleContain(mixed $role)
    {
        return in_array(auth()->user()->role, $role);
    }

    public static function isProfileCompleted()
    {
        return auth()->user()->company_id && auth()->user()->phone_number;
    }
}