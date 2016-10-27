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
        $this->setMainProductImage($products);

        // return json result
        if ($request->input('callback')) {
            return response()->json($products)->withCallback($request->input('callback'));
        } else {
            return response()->json($products);
        }
    }

    // get hot products
    public function getHotProducts(Request $request)
    {
        $columns = ['id', 'product_title', 'product_url', 'product_price', 'product_price_discount', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->offset(0)->limit(12)->orderBy('num_products_purchased', 'desc')->get($columns)->toArray();

        // get main product image
        $this->setMainProductImage($products);

        // return json result
        if ($request->input('callback')) {
            return response()->json($products)->withCallback($request->input('callback'));
        } else {
            return response()->json($products);
        }
    }

    // get product list
    public function getProductList(Request $request)
    {
        // sorting
        $sortField = $request->input('sort_field');
        $sortOrder = $request->input('sort_order');

        // paging
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        $columns = ['id', 'product_title', 'product_url', 'product_price', 'product_price_discount', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->offset($offset)->limit($itemsPerPage)->orderBy($sortField, $sortOrder)->get($columns)->toArray();

        // get main product image
        $this->setMainProductImage($products);

        $paginationResult = [
            "total" => Product::where('active', 1)->count(),
            "data" => $products
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($paginationResult)->withCallback($request->input('callback'));
        } else {
            return response()->json($paginationResult);
        }
    }

    // get promotion list
    public function getPromotionList(Request $request)
    {
        // paging
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        $columns = ['id', 'product_title', 'product_url', 'product_price', 'product_price_discount', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->where('discount_rate', '>', 0)->offset($offset)->limit($itemsPerPage)->orderBy('discount_rate', 'desc')->get($columns)->toArray();

        // get main product image
        $this->setMainProductImage($products);

        $paginationResult = [
            "total" => Product::where('active', 1)->where('discount_rate', '>', 0)->count(),
            "data" => $products
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($paginationResult)->withCallback($request->input('callback'));
        } else {
            return response()->json($paginationResult);
        }
    }

    // set main product image
    private function setMainProductImage(&$products)
    {
        foreach ($products as &$product) {
            $productImages = json_decode($product['product_images'], true);
            foreach ($productImages as $productImage) {
                if ($productImage['main'] == 1) {
                    $product['product_image'] = $productImage['image'];
                }
            }
            unset($product['product_images']);
        }
    }
}
