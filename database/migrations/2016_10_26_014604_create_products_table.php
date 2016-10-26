<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_category_id', false, true);
            $table->integer('product_brand_id', false, true);
            $table->string('product_code');
            $table->string('product_title');
            $table->string('product_url')->unique();
            $table->integer('product_price', false, true);
            $table->integer('product_price_discount', false, true);
            $table->float('discount_rate');
            $table->integer('num_products_purchased', false, true); // the number of products have been purchased
            $table->string('warranty_period');
            $table->tinyInteger('inventory_status', false, true); // 1: stocking status; 0: out of stock
            //$table->integer('inventory_quantity', false, true);
            //$table->integer('input_unit_price', false, true);
            //$table->string('vendor');
            $table->string('product_evaluation');
            $table->text('product_description');
            $table->text('product_images');
            $table->text('product_keywords');
            $table->text('note');
            $table->tinyInteger('active', false, true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
