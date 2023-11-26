<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin\Category;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryNameList = [
            'カット',
            'カラー',
            'パーマ',
            '縮毛矯正',
            'トリートメント',
            'ヘアセット',
            'ヘッドスパ',
            'その他',
        ];
        Category::truncate();
        foreach ($categoryNameList as $categoryName) {
            DB::table('categories')->insert([
                [
                    'category_name'     => $categoryName,
                    'created_at'        => now(),
                    'updated_at'        => now(),
                ],
            ]);
        }
    }
}
