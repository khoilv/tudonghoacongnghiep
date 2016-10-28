<?php

namespace App\Http\Controllers;

use App\ProductCategory;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductCategoryController extends Controller
{
    public function getProductCategories(Request $request)
    {
        $menuItems = [];
        $categories = ProductCategory::all(['id', 'category_title', 'category_url', 'order', 'parent_id'])->toArray();

        // get the list of parent menus
        foreach ($categories as $category) {
            if (empty($category['parent_id'])) array_push($menuItems, $category);
        }
        usort($menuItems, function ($a, $b) {
            return ($a['order'] > $b['order']);
        });

        // get the list of children menus
        foreach ($menuItems as &$parentItem) {
            $parentItem['subCategories'] = [];
            foreach ($categories as $category) {
                if ($category['parent_id'] == $parentItem['id']) $parentItem['subCategories'][] = $category;
            }
        }

        // return json result
        if ($request->input('callback')) {
            return response()->json($menuItems)->withCallback($request->input('callback'));
        } else {
            return response()->json($menuItems);
        }
    }
}
