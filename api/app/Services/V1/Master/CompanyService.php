<?php

namespace App\Services\V1\Master;

use App\Http\Resources\V1\Master\CompanyCollection;
use App\Models\Company;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;

class CompanyService
{
    use ResponseApi;

    public function validate(Request $request)
    {

        $validation = [
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15|unique:companies,phone,' . $request->route('company'),
            'mobile' => 'required|string|max:15|unique:companies,mobile,' . $request->route('company'),
        ];

        $request->validate($validation);
    }

    public function getList()
    {
        return new CompanyCollection(Company::paginate(10));
    }

    public function getDetail($id)
    {
        return Company::findOrFail($id);
    }

    public function createUpdate(Request $request, $id = null)
    {
        $company = $id ? $this->getDetail($id) : new Company();
        $company->name = $request->get('name');
        $company->address = $request->get('address');
        $company->phone = $request->get('phone');
        $company->mobile = $request->get('mobile');
        $company->save();

        return $company;
    }

    public function delete($id)
    {
        $company = $this->getDetail($id);
        $company->delete();

        return $company;
    }
}
