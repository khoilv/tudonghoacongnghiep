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
            [
                'name' => 'Samsung',
                'note' => ''
            ],
            [
                'name' => 'LG',
                'note' => '',
            ],
            [
                'name' => 'Microsoft',
                'note' => ''
            ],
            [
                'name' => 'Apple',
                'note' => ''
            ],
            [
                'name' => 'HP',
                'note' => ''
            ],
            [
                'name' => 'DELL',
                'note' => ''
            ]
        ];
        DB::table('brands')->insert($brands);
    }
}
