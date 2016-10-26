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
            ['category_title' => 'Bộ chuyển đổi', 'category_url' => '', 'order' => 1, 'parent_id' => 0],
            ['category_title' => 'Oscilloscope', 'category_url' => '', 'order' => 2, 'parent_id' => 0],
            ['category_title' => 'Thiết bị đo lường điện', 'category_url' => '', 'order' => 3, 'parent_id' => 0],
            ['category_title' => 'Thiết bị đo người', 'category_url' => '', 'order' => 4, 'parent_id' => 0],
            ['category_title' => 'Máy hàn LK điện tử', 'category_url' => '', 'order' => 5, 'parent_id' => 0],
            ['category_title' => 'Thiết bị đo CN', 'category_url' => '', 'order' => 6, 'parent_id' => 0],
            ['category_title' => 'Tool cơ khí', 'category_url' => '', 'order' => 7, 'parent_id' => 0],
            ['category_title' => 'Máy khoan - máy cắt', 'category_url' => '', 'order' => 8, 'parent_id' => 0],
            ['category_title' => 'Bộ chuyển đổi 1', 'category_url' => '', 'order' => 1, 'parent_id' => 1],
            ['category_title' => 'Bộ chuyển đổi 2', 'category_url' => '', 'order' => 2, 'parent_id' => 1],
            ['category_title' => 'Bộ chuyển đổi 3', 'category_url' => '', 'order' => 3, 'parent_id' => 1],
            ['category_title' => 'Bộ chuyển đổi 4', 'category_url' => '', 'order' => 4, 'parent_id' => 1],
            ['category_title' => 'Bộ chuyển đổi 5', 'category_url' => '', 'order' => 5, 'parent_id' => 1],
            ['category_title' => 'Bộ chuyển đổi 6', 'category_url' => '', 'order' => 6, 'parent_id' => 1],
            ['category_title' => 'Oscilloscope 1', 'category_url' => '', 'order' => 1, 'parent_id' => 2],
            ['category_title' => 'Oscilloscope 2', 'category_url' => '', 'order' => 2, 'parent_id' => 2],
            ['category_title' => 'Oscilloscope 3', 'category_url' => '', 'order' => 3, 'parent_id' => 2],
            ['category_title' => 'Oscilloscope 4', 'category_url' => '', 'order' => 4, 'parent_id' => 2],
            ['category_title' => 'Thiết bị đo lường điện 1', 'category_url' => '', 'order' => 1, 'parent_id' => 3],
            ['category_title' => 'Thiết bị đo lường điện 2', 'category_url' => '', 'order' => 2, 'parent_id' => 3],
            ['category_title' => 'Thiết bị đo lường điện 3', 'category_url' => '', 'order' => 3, 'parent_id' => 3],
            ['category_title' => 'Thiết bị đo lường điện 4', 'category_url' => '', 'order' => 4, 'parent_id' => 3],
            ['category_title' => 'Thiết bị đo lường điện 5', 'category_url' => '', 'order' => 5, 'parent_id' => 3],
            ['category_title' => 'Thiết bị đo lường điện 6', 'category_url' => '', 'order' => 6, 'parent_id' => 3]
        ];

        foreach ($categories as &$category) {
            $category['category_url'] = $this->removeURL($category['category_title']);
        }

        DB::table('product_categories')->insert($categories);
    }

    private function removeURL($strTitle)
    {
        $strTitle = strtolower($strTitle);
        $strTitle = trim($strTitle);
        $strTitle = str_replace(' ', '-', $strTitle);
        $unicode = array(
            'a' => 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd' => 'đ',
            'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i' => 'í|ì|ỉ|ĩ|ị',
            'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y' => 'ý|ỳ|ỷ|ỹ|ỵ',
            'A' => 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'D' => 'Đ',
            'E' => 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'I' => 'Í|Ì|Ỉ|Ĩ|Ị',
            'O' => 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'U' => 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'Y' => 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
        );
        foreach ($unicode as $nonUnicode => $uni) {
            $strTitle = preg_replace("/($uni)/i", $nonUnicode, $strTitle);
        }
        $strTitle = preg_replace("/[^-a-zA-Z0-9]/", '', $strTitle);
        return $strTitle;
    }
}
