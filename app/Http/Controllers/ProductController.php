<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductController extends Controller
{
    // get new products
    public function index(Request $request)
    {
        $columns = ['id', 'product_title', 'product_url', 'product_price', 'product_price_discount', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->offset(0)->limit(12)->orderBy('id', 'desc')->get($columns)->toArray();

        // get main product image
        foreach ($products as &$product) {
            $productImages = json_decode($product['product_images'], true);
            foreach ($productImages as $productImage) {
                if ($productImage['main'] == 1) {
                    $product['product_image'] = $productImage['image'];
                }
            }
            unset($product['product_images']);
        }

        // return json result
        if ($request->input('callback')) {
            return response()->json($products)->withCallback($request->input('callback'));
        } else {
            return response()->json($products);
        }
    }
}
