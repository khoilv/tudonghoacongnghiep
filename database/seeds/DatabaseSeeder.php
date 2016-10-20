<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(ProductCategoryTableSeeder::class);
        $this->call(FaqTableSeeder::class);
        $this->call(OnlineSupportsTableSeeder::class);
        $this->call(CustomersTableSeeder::class);
        $this->call(MasterCitiesProvincesTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(AddressBookSeeder::class);
    }
}
