<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\MasterCityProvince;

class UtilsController extends Controller
{
    public function generateCaptcha(Request $request)
    {
        $data = ['captcha_src' => captcha_src()];

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

    public function getCitiesProvinces(Request $request)
    {
        $data = MasterCityProvince::all(['id', 'name'])->toArray();

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
