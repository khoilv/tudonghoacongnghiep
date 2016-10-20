<?php

use Illuminate\Database\Seeder;

class AddressBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $addressBook = [
            [
                'customer_id' => 1,
                'first_name' => 'Khôi',
                'last_name' => 'Lại Văn',
                'address_1' => 'Số 10, ngõ 27/72/65, đường Đức Diễn, phường Phúc Diễn, Bắc Từ Liêm, Hà Nội',
                'address_2' => 'Đội 15, xóm Trung Lễ, xã Hải Hưng, huyện Hải Hậu, tỉnh Nam Định',
                'tel' => '0974422633',
                'company' => 'KcqHome',
                'city_province_id' => 1
            ],
            [
                'customer_id' => 1,
                'first_name' => 'Khương',
                'last_name' => 'Lại Văn',
                'address_1' => 'Phòng 802, Khu tập thể Viện Vũ Khí Hà nội, Cầu Diễn, Hà nội',
                'address_2' => 'Đội 15, xóm Trung Lễ, xã Hải Hưng, huyện Hải Hậu, tỉnh Nam Định',
                'tel' => '0985036131',
                'company' => '',
                'city_province_id' => 1
            ],
            [
                'customer_id' => 2,
                'first_name' => 'Chang',
                'last_name' => 'Phạm Thị Huyền',
                'address_1' => 'Số 10, ngõ 27/72/65, đường Đức Diễn, phường Phúc Diễn, Bắc Từ Liêm, Hà Nội',
                'address_2' => 'Xóm 3, xã Nam Vân, t.p Nam Định',
                'tel' => '0988455592',
                'company' => 'KcqHome',
                'city_province_id' => 1
            ],
        ];
        DB::table('address_book')->insert($addressBook);
    }
}
