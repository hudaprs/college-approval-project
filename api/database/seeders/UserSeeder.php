<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use App\Constants\RoleConstant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new RoleConstant();

        User::insert([
            [
                'company_id' => Company::findCompanyByName('PT. Vodjo Teknologi Indonesia')->id,
                'name' => 'Admin',
                'role' => $role::ADMIN,
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '081081081080'
            ],
            [
                'company_id' => Company::findCompanyByName('PT. Telkom Indonesia Bandung')->id,
                'name' => 'Client',
                'role' => $role::CLIENT,
                'email' => 'client@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '081081081081'
            ],
            [
                'company_id' => Company::findCompanyByName('PT. GITS Indonesia')->id,
                'name' => 'Marketing',
                'role' => $role::MARKETING,
                'email' => 'marketing@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '082082082082'
            ],
            [
                'company_id' => Company::findCompanyByName('PT. GITS Indonesia')->id,
                'name' => 'CFO',
                'role' => $role::CFO,
                'email' => 'cfo@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '082082082083'
            ],
            [
                'company_id' => Company::findCompanyByName('PT. GITS Indonesia')->id,
                'name' => 'CEO',
                'role' => $role::CEO,
                'email' => 'ceo@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '082082082084'
            ],
            [
                'company_id' => Company::findCompanyByName('PT. GITS Indonesia')->id,
                'name' => 'CTO',
                'role' => $role::CTO,
                'email' => 'cto@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '082082082085'
            ]
        ]);
    }
}
