<?php

namespace App\Http\Controllers;

use App\ProductCategory;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductCategoryController extends Controller
{
    public function getMenuList(Request $request)
    {
        $retData = [];
        $menuData = ProductCategory::all(['id', 'name', 'slug', 'order', 'parent_id'])->toArray();

        // get the list of parent menus
        foreach ($menuData as $item) {
            if (empty($item['parent_id'])) array_push($retData, $item);
        }
        usort($retData, function ($a, $b) {
            return ($a['order'] > $b['order']);
        });

        // get the list of children menus
        foreach ($retData as &$parent) {
            $parent['subMenus'] = [];
            foreach ($menuData as $child) {
                if ($child['parent_id'] == $parent['id']) $parent['subMenus'][] = $child;
            }
        }

        // return json result
        $jsonRes = response()->json($retData);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }
}
