<?php

namespace App\Http\Middleware;

use App\Services\V1\Auth\AuthService;
use App\Traits\ResponseApi;
use Closure;
use App\Helpers\Constant\RoleConstant;
use Illuminate\Http\Request;

class EnsureFullyAuthenticated
{
    use ResponseApi;

    private AuthService $authService;
    private RoleConstant $roleConstant;

    function __construct(AuthService $authService, RoleConstant $roleConstant)
    {
        $this->authService = $authService;
        $this->roleConstant = $roleConstant;
    }

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $authenticatedUser = $this->authService->currentUser();

        // Check if user not completed the profile
        if ($authenticatedUser->role === $this->roleConstant::CLIENT && !$this->authService->currentUser()->phone_number || !$this->authService->currentUser()->company_id) {
            return $this->error('Please complete your profile first!', 403);
        }


        // Check if user not admin and want to access to route that only admin can access
        if ($authenticatedUser->role === $this->roleConstant::CLIENT && str_contains($request->path(), "master")) {
            return $this->error("You don't have permission to access this route!", 403);
        }

        return $next($request);
    }
}
