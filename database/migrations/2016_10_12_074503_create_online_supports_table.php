<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOnlineSupportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_supports', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('skype');
            $table->string('contact_phone');
            $table->string('contact_email');
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
        Schema::dropIfExists('online_supports');
    }
}
