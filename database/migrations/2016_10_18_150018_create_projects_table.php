<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('project_name');
            $table->string('slug')->unique();
            $table->bigInteger('project_budget');
            $table->text('project_description');
            $table->longText('project_content');
            $table->string('project_duration');
            $table->date('start_date');
            $table->date('end_date');
            $table->tinyInteger('project_status');
            $table->string('project_owner');
            $table->string('project_role');
            $table->string('project_evaluation');
            $table->text('project_images');
            $table->text('project_note');
            $table->tinyInteger('active');
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
        Schema::dropIfExists('projects');
    }
}
