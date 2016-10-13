<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mews\Captcha\Facades\Captcha;

class CustomerController extends Controller
{
    public function getCitiesProvincesList(Request $request)
    {
        $path = storage_path() . "/json/cities_provinces.json";
        $data = json_decode(file_get_contents($path), true);

        // return json result
        $jsonRes = response()->json($data);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }

    public function generateCaptcha(Request $request)
    {
        $data = ['src' => captcha_src()];

        // return json result
        $jsonRes = response()->json($data);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }

    public function captchaTest(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            $this->validate($request, [
                'captcha' => 'required|captcha'
            ]);
        } else {
            return captcha();
        }
    }

    public function sendCaptcha()
    {
        return captcha_img();
    }
}
