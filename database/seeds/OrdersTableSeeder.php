<?php

use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orders = [
            [
                'customer_id' => 1,
                'address_id' => 1,
                'payment_status' => 1,
                'order_items' => [
                    ['product_id' => 1, 'quantity' => 1, 'unit_price' => 800000, 'amount' => 800000],
                    ['product_id' => 2, 'quantity' => 2, 'unit_price' => 350000, 'amount' => 700000],
                    ['product_id' => 3, 'quantity' => 3, 'unit_price' => 300000, 'amount' => 900000],
                ],
                'order_total' => 2400000,
                'order_note' => ''
            ],
            [
                'customer_id' => 1,
                'address_id' => 1,
                'payment_status' => 0,
                'order_items' => [
                    ['product_id' => 1, 'quantity' => 1, 'unit_price' => 200000, 'amount' => 200000],
                    ['product_id' => 2, 'quantity' => 1, 'unit_price' => 350000, 'amount' => 350000],
                    ['product_id' => 3, 'quantity' => 1, 'unit_price' => 300000, 'amount' => 300000],
                ],
                'order_total' => 850000,
                'order_note' => ''
            ],
        ];

        foreach ($orders as &$order) {
            $order['order_items'] = json_encode($order['order_items']);
        }

        DB::table('orders')->insert($orders);
    }
}
