<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::insert([
            [
                'name' => 'PT. Telkom Indonesia Bandung',
                'address' => 'Jl. Japati No.1, Sadang Serang, Kecamatan Coblong, Kota Bandung, Jawa Barat 40133',
                'phone' => '022-4124119',
                'mobile' => '',
            ],
            [
                'name' => 'PT. Vodjo Teknologi Indonesia',
                'address' => 'Graha Pos Indonesia, Lantai 2, Blok C Jl. Banda 30, Bandung 40115, Indonesia',
                'phone' => '',
                'mobile' => '+622220450422',
            ],
            [
                'name' => 'PT. GITS Indonesia',
                'address' => 'Jl. Mars Barat I No 9, Bandung 40286',
                'phone' => '',
                'mobile' => '08111309991',
            ]
        ]);
    }
}
