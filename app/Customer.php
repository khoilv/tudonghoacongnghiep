<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable
{
    protected $primaryKey = 'id';
    protected $table = 'customers';
    protected $fillable = array('email', 'password', 'first_name', 'last_name', 'company', 'tel', 'address', 'city_province_id', 'created_at', 'updated_at');
}
