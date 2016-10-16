<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['name' => 'test', 'email' => 'test@gmail.com', 'password' => Hash::make('secret')]
        ];
        DB::table('users')->insert($users);
    }
}
