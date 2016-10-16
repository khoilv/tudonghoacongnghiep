<?php

namespace App\Http\Controllers;

use App\Customer;
use App\MasterCityProvince;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

use App\Http\Requests;
use App\Http\Requests\RegisterCustomer;
use Illuminate\Support\Facades\Hash;
use Mews\Captcha\Facades\Captcha;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CustomerController extends Controller
{


    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        //$this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        try {
            \Config::set('auth.providers.users.model', \App\Customer::class);

            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    public function login(Request $request)
    {

    }

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
            $customer->password = Hash::make($request->password);
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
