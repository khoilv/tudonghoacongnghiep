<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
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
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_category_id',
        'product_brand_id',
        'product_code',
        'product_title',
        'product_url',
        'product_price',
        'product_price_discount',
        'warranty_period',
        'product_evaluation',
        'product_description',
        'product_images',
        'product_keywords',
        'note',
        'active',
        'created_at',
        'updated_at'
    ];
}
