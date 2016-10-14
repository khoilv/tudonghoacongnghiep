<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterCityProvince extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'master_cities_provinces';
    protected $fillable = array('name', 'active', 'created_at', 'updated_at');
}
