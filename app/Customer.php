<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'customers';
    protected $fillable = array('email', 'password', 'first_name', 'last_name', 'company', 'tel', 'address', 'city_province_id', 'created_at', 'updated_at');
}
