<?php

namespace App\Http\Controllers\V1\Master;

use App\Http\Controllers\Controller;
use App\Services\V1\Master\CompanyService;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    use ResponseApi;

    protected CompanyService $companyService;

    function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->success('Get company list success', $this->companyService->getList($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->companyService->validate($request);

        try {
            DB::beginTransaction();

            $company = $this->companyService->createUpdate([
                'name' => $request->get('name'),
                'address' => $request->get('address'),
                'phone' => $request->get('phone'),
                'mobile' => $request->get('mobile'),
            ]);

            DB::commit();
            return $this->success('Company created successfully', $company, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            return $this->success('Get company detail success', $this->companyService->getDetail($id));
        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->companyService->validate($request);

        try {
            DB::beginTransaction();

            $company = $this->companyService->createUpdate([
                'name' => $request->get('name'),
                'address' => $request->get('address'),
                'phone' => $request->get('phone'),
                'mobile' => $request->get('mobile'),
            ], $id);

            DB::commit();
            return $this->success('Company updated successfully', $company);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $company = $this->companyService->delete($id);

            DB::commit();
            return $this->success('Company deleted successfully', $company);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error($e);
        }
    }
}