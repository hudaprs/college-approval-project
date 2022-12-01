<?php

namespace App\Helpers\Auth;

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
}
