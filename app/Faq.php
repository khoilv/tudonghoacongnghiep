<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'faq';
    protected $fillable = array('question', 'answer', 'note', 'created_at', 'updated_at');
}
