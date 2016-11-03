<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'product_categories';
    protected $fillable = array('name', 'slug', 'order', 'parent_id', 'created_at', 'updated_at');

    /**
     * Get the products for the product category.
     */
    public function products()
    {
        return $this->hasMany('App\Product');
    }
}
