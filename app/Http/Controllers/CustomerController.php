<?php

namespace App\Http\Controllers;

use App\Customer;
use App\MasterCityProvince;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

use App\Http\Requests;
use App\Http\Requests\RegisterCustomer;
use Mews\Captcha\Facades\Captcha;

class CustomerController extends Controller
{
    public function initSignUpCustomer(Request $request)
    {
        $data = [
            'csrf_token' => csrf_token(),
            'captcha_src' => captcha_src(),
            'cities_provinces' => MasterCityProvince::all()->toArray()
        ];

        // return json result
        return $this->outputJson($request, $data);
    }

    public function signUpCustomer(RegisterCustomer $request)
    {
        try {
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
        } catch (QueryException $e) {
            $data = ['status' => false, 'message' => $e->errorInfo];
            return $this->outputJson($request, $data);
        }

        // return json result
        $data = ['status' => true, 'message' => 'Success'];
        return $this->outputJson($request, $data);
    }

    public function generateCaptcha(Request $request)
    {
        // return json result
        $data = ['captcha_src' => captcha_src()];
        return $this->outputJson($request, $data);
    }
}
