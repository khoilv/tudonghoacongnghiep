<?php

namespace App\Http\Controllers;

use App\ProductCategory;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductCategoryController extends Controller
{
    public function getProductCategories(Request $request)
    {
        $data = [];
        $menuItems = ProductCategory::all(['id', 'category_title', 'category_url', 'order', 'parent_id'])->toArray();

        // get the list of parent menus
        foreach ($menuItems as $item) {
            if (empty($item['parent_id'])) array_push($data, $item);
        }
        usort($data, function ($a, $b) {
            return ($a['order'] > $b['order']);
        });

        // get the list of children menus
        foreach ($data as &$parent) {
            $parent['subCategories'] = [];
            foreach ($menuItems as $child) {
                if ($child['parent_id'] == $parent['id']) $parent['subCategories'][] = $child;
            }
        }

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
