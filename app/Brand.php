<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'brands';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'brand_title',
        'brand_logo',
        'note',
        'created_at',
        'updated_at'
    ];
}
