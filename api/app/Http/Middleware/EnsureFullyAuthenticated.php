<?php

namespace App\Http\Middleware;

use App\Helpers\Auth\AuthHelper;
use App\Traits\ResponseApi;
use Closure;
use App\Constants\RoleConstant;
use Illuminate\Http\Request;

class EnsureFullyAuthenticated
{
    use ResponseApi;

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $authenticatedUser = AuthHelper::currentUser();

        // Check if user not completed the profile
        if (!AuthHelper::isProfileCompleted()) {
            return $this->error('Please complete your profile first!', 403);
        }


        // Check if user not admin and want to access to route that only admin can access
        if ($authenticatedUser->role === RoleConstant::CLIENT && in_array($request->path(), ["master", "user-management"])) {
            return $this->error("You don't have permission to access this route!", 403);
        }

        return $next($request);
    }
}