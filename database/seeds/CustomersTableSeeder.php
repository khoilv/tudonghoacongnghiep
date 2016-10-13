<?php

use Illuminate\Database\Seeder;

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
            ['email' => 'laivankhoi318@gmail.com', 'password' => '123', 'last_name' => 'Lại Văn', 'first_name' => 'Khôi', 'company' => '', 'tel' => '0974422633', 'address' => 'Số 10, ngõ 72/65, đường Đức Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, Hà nội', 'city_province_id' => 1],
            ['email' => 'phamhuyenchang102@gmail.com', 'password' => '123', 'last_name' => 'Phạm Thị Huyền', 'first_name' => 'Chang', 'company' => '', 'tel' => '0988455592', 'address' => 'Số 10, ngõ 72/65, đường Đức Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, Hà nội', 'city_province_id' => 1],
        ];
        DB::table('customers')->insert($customers);
    }
}
