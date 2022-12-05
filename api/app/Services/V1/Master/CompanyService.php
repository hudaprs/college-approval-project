<?php

namespace App\Services\V1\Master;

use App\Helpers\Queries\QueryHelper;
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
            'name' => 'required|string|max:100|unique:companies,name,' . $request->route('company'),
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15|unique:companies,phone,' . $request->route('company'),
            'mobile' => 'string|max:15'
        ];

        $request->validate($validation);
    }

    public function getList(Request $request)
    {
        $query = new QueryHelper(new Company(), $request);
        return new CompanyCollection($query->paginate());
    }

    public function getUnfilteredList()
    {
        return Company::select('id', 'name')->orderBy('name', 'asc')->get();
    }

    public function getDetail($id)
    {
        return Company::findOrFail($id);
    }

    public function createUpdate(mixed $payload, $id = null)
    {
        $company = $id ? $this->getDetail($id) : new Company();
        $company->name = $payload['name'];
        $company->address = $payload['address'];
        $company->phone = $payload['phone'];
        $company->mobile = $payload['mobile'];
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