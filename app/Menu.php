<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'menu';
    protected $fillable = array('name', 'order', 'parent_id', 'created_at', 'updated_at');
}
