<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $customers = [
            [
                'email' => 'laivankhoi318@gmail.com',
                'password' => Hash::make('123'),
                'last_name' => 'Lại Văn',
                'first_name' => 'Khôi',
                'birth_date' => DateTime::createFromFormat('d/m/Y', '30/10/1980'),
                'sex' => 1,
                'company' => '',
                'tel' => '0974422633',
                'address' => 'Số 10, ngõ 72/65, đường Đức Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, Hà nội',
                'city_province_id' => 1
            ],
            [
                'email' => 'phamhuyenchang102@gmail.com',
                'password' => Hash::make('123'),
                'last_name' => 'Phạm Thị Huyền',
                'first_name' => 'Chang',
                'birth_date' => DateTime::createFromFormat('d/m/Y', '10/02/1992'),
                'sex' => 0,
                'company' => '',
                'tel' => '0988455592',
                'address' => 'Số 10, ngõ 72/65, đường Đức Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, Hà nội',
                'city_province_id' => 1
            ],
            [
                'email' => 'test@gmail.com',
                'password' => Hash::make('123'),
                'last_name' => 'test',
                'first_name' => 'test',
                'birth_date' => DateTime::createFromFormat('d/m/Y', '27/08/1990'),
                'sex' => 1,
                'company' => '',
                'tel' => '0123456789',
                'address' => 'test',
                'city_province_id' => 2
            ],
        ];
        DB::table('customers')->insert($customers);
    }
}
