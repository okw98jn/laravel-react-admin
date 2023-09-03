<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Const\CommonConst;
use App\Const\AdminConst;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->truncate();
        for ($i = 1; $i <= 100; $i++) {
            DB::table('admins')->insert([
                'name'       => "admin" . $i,
                'login_id'   => "admin" . $i,
                'password'   => Hash::make('password'),
                'status'     => CommonConst::STATUS_VALID,
                'role'       => AdminConst::ROLE_ADMIN,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
