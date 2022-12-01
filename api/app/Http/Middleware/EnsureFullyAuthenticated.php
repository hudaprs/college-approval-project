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
        if ($authenticatedUser->role === RoleConstant::CLIENT && !AuthHelper::currentUser()->phone_number || !AuthHelper::currentUser()->company_id) {
            return $this->error('Please complete your profile first!', 403);
        }


        // Check if user not admin and want to access to route that only admin can access
        if ($authenticatedUser->role === RoleConstant::CLIENT && str_contains($request->path(), "master")) {
            return $this->error("You don't have permission to access this route!", 403);
        }

        return $next($request);
    }
}
