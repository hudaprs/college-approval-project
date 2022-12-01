<?php

use App\Http\Controllers\V1\Auth\AuthController as AuthControllerV1;
use App\Http\Controllers\V1\Master\CompanyController as CompanyControllerV1;
use App\Http\Controllers\V1\ProjectManagement\ProjectController as ProjectControllerV1;
use App\Http\Controllers\V1\ProjectTransaction\ProjectTransactionController as ProjectTransactionControllerV1;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('v1')->group(function () {
    // Auth
    Route::controller(AuthControllerV1::class)->prefix('auth')->group(
        function () {
            Route::post('login', 'login');
            Route::post('register', 'register');
            Route::post('refresh', 'refreshToken');
            Route::post('logout', 'logout');
            Route::get('me', 'me');
            Route::get('company/dropdown', 'companyDropdown');
        }
    );


    Route::middleware('ensureFullyAuthenticated')->group(
        function () {
            // Master
            Route::prefix('master')->group(
                function () {
                    Route::resource('companies', CompanyControllerV1::class);
                }
            );

            // Project Management
            Route::prefix('project-management')->group(
                function () {
                    Route::resource('projects', ProjectControllerV1::class);
                }
            );

            // Project Transaction
            Route::prefix('project-transaction')->group(
                function () {
                    Route::get('/', [ProjectTransactionControllerV1::class, 'index']);
                    Route::get('/{id}', [ProjectTransactionControllerV1::class, 'show']);
                    Route::get('/status/list', [ProjectTransactionControllerV1::class, 'getStatusList']);
                    Route::patch('/status/update/{id}', [ProjectTransactionControllerV1::class, 'updateStatus']);
                    Route::get('/users/list', [ProjectTransactionControllerV1::class, 'getUserList']);
                    Route::patch('/users/assign/{id}', [ProjectTransactionControllerV1::class, 'assignUsers']);
                }
            );
        }
    );
});