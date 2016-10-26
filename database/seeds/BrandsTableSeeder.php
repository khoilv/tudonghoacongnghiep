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
            ['brand_title' => 'ATTEN', 'brand_logo' => '../../assets/images/frontend/brands/ATTEN.jpg', 'note' => ''],
            ['brand_title' => 'BOSCH', 'brand_logo' => '../../assets/images/frontend/brands/BOSCH.jpg', 'note' => '',],
            ['brand_title' => 'CROSSMAN', 'brand_logo' => '../../assets/images/frontend/brands/CROSSMAN.jpg', 'note' => ''],
            ['brand_title' => 'DELTA', 'brand_logo' => '../../assets/images/frontend/brands/DELTA.jpg', 'note' => ''],
            ['brand_title' => 'FLUKE', 'brand_logo' => '../../assets/images/frontend/brands/FLUKE.jpg', 'note' => ''],
            ['brand_title' => 'HAKKO', 'brand_logo' => '../../assets/images/frontend/brands/HAKKO.jpg', 'note' => '']
        ];
        DB::table('brands')->insert($brands);
    }
}
