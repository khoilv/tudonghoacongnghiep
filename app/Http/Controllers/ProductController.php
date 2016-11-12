<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Product;
use App\ProductCategory;
use App\Customer;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductController extends Controller
{
    // get new products
    public function index(Request $request)
    {
        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->offset(0)->limit(12)->orderBy('id', 'desc')->get($columns)->toArray();

        // set main product image
        $this->setMainProductImage($products);

        // return json result
        if ($request->input('callback')) {
            return response()->json($products)->withCallback($request->input('callback'));
        } else {
            return response()->json($products);
        }
    }

    // search products
    public function search(Request $request)
    {
        // search query
        $searchQuery = $request->input('search_query');

        // category_url
        $categoryUrl = $request->input('category_url');
        $subCategoryUrl = $request->input('sub_category_url');
        $categoryUrl = $subCategoryUrl ? $subCategoryUrl : $categoryUrl;

        // sorting
        $sortField = $request->input('sort_field');
        $sortOrder = $request->input('sort_order');

        // paging
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        // search columns
        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];

        // 3 search cases
        if ($categoryUrl) {
            $category = ProductCategory::where('category_url', $categoryUrl)->first();
            $categoryId = $category->id;
            $products = Product::where('active', 1)->where('product_category_id', $categoryId)->offset($offset)->limit($itemsPerPage)->orderBy($sortField, $sortOrder)->get($columns)->toArray();
            $total = Product::where('active', 1)->where('product_category_id', $categoryId)->count();
        } else if ($searchQuery) {
            $products = Product::where('active', 1)->where('product_keywords', 'LIKE', "%{$searchQuery}%")->offset($offset)->limit($itemsPerPage)->orderBy($sortField, $sortOrder)->get($columns)->toArray();
            $total = Product::where('active', 1)->where('product_keywords', 'LIKE', "%{$searchQuery}%")->count();
        } else {
            $products = Product::where('active', 1)->offset($offset)->limit($itemsPerPage)->orderBy($sortField, $sortOrder)->get($columns)->toArray();
            $total = Product::where('active', 1)->count();
        }

        // set main product image
        $this->setMainProductImage($products);

        $paginationResult = [
            "total" => $total,
            "data" => $products
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($paginationResult)->withCallback($request->input('callback'));
        } else {
            return response()->json($paginationResult);
        }
    }

    // get hot products
    public function hot(Request $request)
    {
        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->offset(0)->limit(12)->orderBy('num_products_purchased', 'desc')->get($columns)->toArray();

        // set main product image
        $this->setMainProductImage($products);

        // return json result
        if ($request->input('callback')) {
            return response()->json($products)->withCallback($request->input('callback'));
        } else {
            return response()->json($products);
        }
    }

    // get promotion list
    public function promotion(Request $request)
    {
        // paging
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->where('discount_rate', '>', 0)->offset($offset)->limit($itemsPerPage)->orderBy('discount_rate', 'desc')->get($columns)->toArray();

        // set main product image
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

    // view product detail information
    public function detail(Request $request)
    {
        $productUrl = $request->input('product_url');

        $product = Product::where('product_url', $productUrl)->first()->toArray();
        $product['product_images'] = json_decode($product['product_images'], true);
        $product['product_evaluation'] = json_decode($product['product_evaluation'], true);

        // set category title
        $category = ProductCategory::find($product['product_category_id']);
        $product['product_category_url'] = $category->category_url;
        $product['product_category_title'] = $category->category_title;

        // set brand title
        $brand = Brand::find($product['product_brand_id']);
        $product['product_brand_title'] = $brand->brand_title;

        // find all relevant products (that belong to the same category with the current product)
        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->where('product_category_id', $product['product_category_id'])->where('id', '<>', $product['id'])->get($columns)->toArray();

        // set main product image
        $this->setMainProductImage($products);

        $product['relevant_products'] = $products;

        // return json result
        if ($request->input('callback')) {
            return response()->json($product)->withCallback($request->input('callback'));
        } else {
            return response()->json($product);
        }
    }

    // get favorite product list
    public function favorite(Request $request, $customerId)
    {
        // paging
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        $customer = Customer::find($customerId);
        $favoriteProductList = explode(',', $customer->favorite_product_list);

        $columns = ['id', 'product_code', 'product_title', 'product_url', 'reference_price', 'actual_price', 'discount_rate', 'product_images'];
        $products = Product::where('active', 1)->whereIn('id', $favoriteProductList)->offset($offset)->limit($itemsPerPage)->orderBy('discount_rate', 'desc')->get($columns)->toArray();

        // set main product image
        $this->setMainProductImage($products);

        $paginationResult = [
            "total" => Product::where('active', 1)->whereIn('id', $favoriteProductList)->count(),
            "data" => $products
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($paginationResult)->withCallback($request->input('callback'));
        } else {
            return response()->json($paginationResult);
        }
    }

    public function cart(Request $request)
    {
        if ($request->isMethod('GET')) {
            
            // paging
            $page = $request->input('page');
            $itemsPerPage = $request->input('per_page');
            $offset = ($page - 1) * $itemsPerPage;

            $arrayProductId = json_decode($request->input('array_product_id'));

            $columns = ['id', 'product_code', 'product_title', 'actual_price', 'product_images'];
            $products = Product::whereIn('id', $arrayProductId)->offset($offset)->limit($itemsPerPage)->get($columns)->toArray();

            // set main product image
            $this->setMainProductImage($products);

            $paginationResult = [
                "total" => Product::whereIn('id', $arrayProductId)->count(),
                "data" => $products
            ];

            // return json result
            if ($request->input('callback')) {
                return response()->json($paginationResult)->withCallback($request->input('callback'));
            } else {
                return response()->json($paginationResult);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $product = Product::find($id)->toArray();
        $product['product_images'] = json_decode($product['product_images'], true);
        $product['product_evaluation'] = json_decode($product['product_evaluation'], true);

        // set category title
        $category = ProductCategory::find($product['product_category_id']);
        $product['product_category_url'] = $category->category_url;

        // set brand title
        $brand = Brand::find($product['product_brand_id']);
        $product['product_brand_title'] = $brand->brand_title;

        // return json result
        if ($request->input('callback')) {
            return response()->json($product)->withCallback($request->input('callback'));
        } else {
            return response()->json($product);
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
