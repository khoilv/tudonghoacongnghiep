<?php

namespace App\Http\Controllers;

use App\Customer;
use App\MasterCityProvince;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

use App\Http\Requests;
use App\Http\Requests\RegisterCustomer;
use App\Http\Requests\LoginCustomer;
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
        //$this->middleware('jwt.refresh',['only' => ['authenticate']]);
    }

    public function authenticate(LoginCustomer $request)
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

        $customer = Customer::where('email', $credentials['email'])->first();
        $customerId = $customer->id;
        $username = $customer->last_name . ' ' . $customer->first_name;

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token', 'username', 'customerId'));
    }

    public function initRegisterCustomer(Request $request)
    {
        $data = [
            'csrf_token' => csrf_token(),
            'captcha_src' => captcha_src(),
            'cities_provinces' => MasterCityProvince::all()->toArray()
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

    public function registerCustomer(RegisterCustomer $request)
    {
        try {
            $customer = $request->only(['email', 'password', 'first_name', 'last_name', 'company', 'tel', 'address', 'city_province_id']);
            $customer['password'] = Hash::make($customer['password']);
            Customer::create($customer);

        } catch (QueryException $e) {
            return response()->json(['error' => $e->errorInfo], 500);
        }

        // return json result
        $data = ['success' => 'Register customer successfully'];
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

    public function generateCaptcha(Request $request)
    {
        // return json result
        $data = ['captcha_src' => captcha_src()];
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
