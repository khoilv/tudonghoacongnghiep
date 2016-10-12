<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OnlineSupport extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'online_supports';
    protected $fillable = array('name', 'skype', 'contact_phone', 'contact_email', 'active', 'created_at', 'updated_at');
}
