<?php

use Illuminate\Database\Seeder;

class OnlineSupportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $onlineSupports = [
            ['name' => 'Mr. Khoi', 'skype' => 'laivankhoi318', 'contact_phone' => '0974422633', 'contact_email' => 'laivankhoi318@gmail.com', 'active' => 1],
            ['name' => 'Ms. Chang', 'skype' => 'phamhuyenchang102', 'contact_phone' => '0988455592', 'contact_email' => 'phamhuyenchang102@gmail.com', 'active' => 1],
        ];
        DB::table('online_supports')->insert($onlineSupports);
    }
}
