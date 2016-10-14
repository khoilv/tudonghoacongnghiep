<?php

use Illuminate\Database\Seeder;

class MasterCitiesProvincesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = storage_path() . "/json/cities_provinces.json";
        $records = json_decode(file_get_contents($path), true);
        $data = [];
        foreach ($records as $record) {
            array_push($data, [
               'name' => $record['name'],
                'active' => 1
            ]);
        }
        DB::table('master_cities_provinces')->insert($data);
    }
}
