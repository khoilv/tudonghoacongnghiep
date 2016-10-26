<?php

use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $brands = [
            ['brand_title' => 'Samsung', 'note' => ''],
            ['brand_title' => 'LG', 'note' => '',],
            ['brand_title' => 'Microsoft', 'note' => ''],
            ['brand_title' => 'Apple', 'note' => ''],
            ['brand_title' => 'HP', 'note' => ''],
            ['brand_title' => 'DELL', 'note' => '']
        ];
        DB::table('brands')->insert($brands);
    }
}
