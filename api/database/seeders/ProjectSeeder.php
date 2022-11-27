<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::insert([
            [
                'user_id' => User::where('role', 'CLIENT')->first()->id,
                'name' => 'My Telkomsel',
                'budget' => 300000000,
                'documents' => json_encode([]),
                'description' => 'Telkomsel app that can manage all users phone number that using Telkomsel Provider',
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addDays(60)
            ]
        ]);
    }
}
