<?php

use Illuminate\Database\Seeder;

class FaqTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faqs = [
            ['question' => 'Ngành Kỹ thuật điều khiển và tự động hóa là gì?', 'answer' => 'Ngành Kỹ thuật điều khiển và tự động hóa là gì?', 'note' => 'example'],
            ['question' => 'Ngành Kỹ thuật điều khiển và tự động hóa ra trường làm gì?', 'answer' => 'Ngành Kỹ thuật điều khiển và tự động hóa ra trường làm gì?', 'note' => 'example'],
            ['question' => 'Ngành Kỹ thuật điều khiển và tự động hóa xét tuyển những môn nào?', 'answer' => 'Ngành Kỹ thuật điều khiển và tự động hóa xét tuyển những môn nào?', 'note' => 'example'],
            ['question' => 'Học ngành Kỹ thuật điều khiển và tự động hóa ở đâu?', 'answer' => 'Học ngành Kỹ thuật điều khiển và tự động hóa ở đâu?', 'note' => 'example'],
            ['question' => 'Cơ hội nghề nghiệp của ngành Kỹ thuật điều khiển và tự động hóa?', 'answer' => 'Cơ hội nghề nghiệp của ngành Kỹ thuật điều khiển và tự động hóa?', 'note' => 'example']
        ];
        DB::table('faq')->insert($faqs);
    }
}
