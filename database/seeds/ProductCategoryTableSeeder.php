<?php

use Illuminate\Database\Seeder;

class ProductCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Bộ chuyển đổi', 'slug' => 'bo-chuyen-doi', 'order' => 1, 'parent_id' => 0],
            ['name' => 'Oscilloscope', 'slug' => 'oscilloscope', 'order' => 2, 'parent_id' => 0],
            ['name' => 'Thiết bị đo lường điện', 'slug' => 'thiet-bi-do-luong-dien', 'order' => 3, 'parent_id' => 0],
            ['name' => 'Thiết bị đo người', 'slug' => 'thiet-bi-do-nguoi', 'order' => 4, 'parent_id' => 0],
            ['name' => 'Máy hàn LK điện tử', 'slug' => 'may-han-linh-kien-dien-tu', 'order' => 5, 'parent_id' => 0],
            ['name' => 'Thiết bị đo CN', 'slug' => 'thiet-bi-do-cong-nghiep', 'order' => 6, 'parent_id' => 0],
            ['name' => 'Tool cơ khí', 'slug' => 'tool-co-khi', 'order' => 7, 'parent_id' => 0],
            ['name' => 'Máy khoan - máy cắt', 'slug' => 'may-khoan-may-cat', 'order' => 8, 'parent_id' => 0],
            ['name' => 'Bộ chuyển đổi 1', 'slug' => 'bo-chuyen-doi-1', 'order' => 1, 'parent_id' => 1],
            ['name' => 'Bộ chuyển đổi 2', 'slug' => 'bo-chuyen-doi-2', 'order' => 2, 'parent_id' => 1],
            ['name' => 'Bộ chuyển đổi 3', 'slug' => 'bo-chuyen-doi-3', 'order' => 3, 'parent_id' => 1],
            ['name' => 'Bộ chuyển đổi 4', 'slug' => 'bo-chuyen-doi-4', 'order' => 4, 'parent_id' => 1],
            ['name' => 'Bộ chuyển đổi 5', 'slug' => 'bo-chuyen-doi-5', 'order' => 5, 'parent_id' => 1],
            ['name' => 'Bộ chuyển đổi 6', 'slug' => 'bo-chuyen-doi-6', 'order' => 6, 'parent_id' => 1],
            ['name' => 'Oscilloscope 1', 'slug' => 'oscilloscope-1', 'order' => 1, 'parent_id' => 2],
            ['name' => 'Oscilloscope 2', 'slug' => 'oscilloscope-2', 'order' => 2, 'parent_id' => 2],
            ['name' => 'Oscilloscope 3', 'slug' => 'oscilloscope-3', 'order' => 3, 'parent_id' => 2],
            ['name' => 'Oscilloscope 4', 'slug' => 'oscilloscope-4', 'order' => 4, 'parent_id' => 2],
            ['name' => 'Thiết bị đo lường điện 1', 'slug' => 'thiet-bi-do-luong-dien-1', 'order' => 1, 'parent_id' => 3],
            ['name' => 'Thiết bị đo lường điện 2', 'slug' => 'thiet-bi-do-luong-dien-2', 'order' => 2, 'parent_id' => 3],
            ['name' => 'Thiết bị đo lường điện 3', 'slug' => 'thiet-bi-do-luong-dien-3', 'order' => 3, 'parent_id' => 3],
            ['name' => 'Thiết bị đo lường điện 4', 'slug' => 'thiet-bi-do-luong-dien-4', 'order' => 4, 'parent_id' => 3],
            ['name' => 'Thiết bị đo lường điện 4', 'slug' => 'thiet-bi-do-luong-dien-5', 'order' => 5, 'parent_id' => 3],
            ['name' => 'Thiết bị đo lường điện 5', 'slug' => 'thiet-bi-do-luong-dien-6', 'order' => 6, 'parent_id' => 3]
        ];
        DB::table('product_categories')->insert($categories);
    }
}
