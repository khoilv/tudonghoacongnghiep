<?php

namespace App\Http\Controllers;

use App\Customer;
use App\MasterCityProvince;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\RegisterCustomer;
use Mews\Captcha\Facades\Captcha;

class CustomerController extends Controller
{
    public function initCustomerRegistration(Request $request)
    {
        $data = [
            'csrf_token' => csrf_token(),
            'captcha_src' => captcha_src(),
            'cities_provinces' => MasterCityProvince::all()->toArray()
        ];

        // return json result
        $jsonRes = response()->json($data);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }

    public function registerCustomer(RegisterCustomer $request)
    {
        $customer = new Customer();
        $customer->email = $request->email;
        $customer->password = $request->password;
        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->company = $request->company;
        $customer->tel = $request->tel;
        $customer->address = $request->address;
        $customer->city_province_id = $request->city_province_id;
        $customer->save();

        // return json result
        $jsonRes = response()->json(['status' => 200, 'statusText' => 'Success']);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }

    public function generateCaptcha(Request $request)
    {
        $data = ['captcha_src' => captcha_src()];

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
