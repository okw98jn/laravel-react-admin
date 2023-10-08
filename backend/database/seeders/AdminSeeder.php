<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::truncate();
        Admin::factory(200)->create();
        DB::table('admins')->insert([
            [
                'name'              => 'admin',
                'login_id'          => 'admin',
                'password'          => Hash::make('1234'),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ]);
    }
}
