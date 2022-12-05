<?php

namespace App\Services\V1\UserManagement;

use App\Helpers\Queries\QueryHelper;
use App\Http\Resources\V1\UserManagement\UserCollection;
use App\Models\User;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserService
{
    use ResponseApi;

    public function validate(Request $request)
    {
        $validation = [
            'company' => 'required|exists:companies,id',
            'name' => 'required|max:100',
            'role' => 'required',
            'email' => 'required|max:100|unique:users,email,' . $request->route('user'),
            'password' => 'max:255' . !$request->route('user') ? '|required' : '',
            'phone_number' => 'required|max:15|unique:users,phone_number,' . $request->route('user')
        ];

        $request->validate($validation);
    }

    public function getList(Request $request)
    {
        $userQuery = new QueryHelper(new User, $request);
        return new UserCollection($userQuery->paginate());
    }

    public function getDetail($id)
    {
        return User::findOrFail($id);
    }

    public function createUpdate(Request $request, $id = null)
    {
        $user = $id ? $this->getDetail($id) : new User();
        $user->company_id = $request->get('company');
        $user->name = $request->get('name');
        $user->role = $request->get('role');
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->phone_number = $request->get('phone_number');
        $user->save();

        return $user;
    }

    public function delete($id)
    {
        $user = $this->getDetail($id);
        $user->delete();

        return $user;
    }
}