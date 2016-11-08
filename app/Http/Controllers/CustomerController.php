<?php

namespace App\Http\Controllers;

use App\Customer;
use App\MasterCityProvince;
use Faker\Provider\cs_CZ\DateTime;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

use App\Http\Requests;
use App\Http\Requests\RegisterCustomer;
use App\Http\Requests\LoginCustomer;
use App\Http\Requests\UpdateCustomer;
use App\Http\Requests\ChangePassword;
use Illuminate\Support\Facades\Hash;
use Mews\Captcha\Facades\Captcha;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
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

    public function token()
    {
        $token = JWTAuth::getToken();
        if (!$token) {
            throw new BadRequestHttpException('Token not provided');
        }
        try {
            $token = JWTAuth::refresh($token);
        } catch (TokenInvalidException $e) {
            throw new AccessDeniedException('The token is invalid');
        }
        return response()->json(compact('token'));
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

    public function edit(Request $request, $id)
    {
        if ($request->isMethod('GET')) {
            $columns = ['id', 'first_name', 'last_name', 'birth_date', 'sex', 'company', 'tel', 'city_province_id'];
            $data = Customer::where('id', $id)->first($columns)->toArray();

            // return json result
            if ($request->input('callback')) {
                return response()->json($data)->withCallback($request->input('callback'));
            } else {
                return response()->json($data);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 500);
        }
    }

    public function update(UpdateCustomer $request, $id)
    {
        if ($request->isMethod('PUT')) {
            try {
                $data = $request->only(['first_name', 'last_name', 'birth_date', 'sex', 'company', 'tel', 'city_province_id']);
                $data['birth_date'] = new \DateTime($data['birth_date']);
                Customer::where('id', $id)->update($data);
            } catch (QueryException $e) {
                return response()->json(['error' => $e->errorInfo], 500);
            }

            // return json result
            $result = ['success' => 'Update customer successfully'];
            if ($request->input('callback')) {
                return response()->json($result)->withCallback($request->input('callback'));
            } else {
                return response()->json($result);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 500);
        }
    }

    public function changePassword(ChangePassword $request, $id)
    {
        if ($request->isMethod('PATCH')) {
            $input = $request->all();
            $customer = Customer::find($id);
            if (!Hash::check($input['old_password'], $customer->password)) {
                return response()->json(['old_password' => ['Mật khẩu đã nhập không khớp']], 422);
            } else {
                try {
                    $customer->password = Hash::make($input['new_password']);
                    $customer->save();
                } catch (QueryException $e) {
                    return response()->json(['error' => $e->errorInfo], 500);
                }
            }

            // return json result
            $result = ['success' => 'Change password successfully', 'id' => $id];
            if ($request->input('callback')) {
                return response()->json($result)->withCallback($request->input('callback'));
            } else {
                return response()->json($result);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 500);
        }
    }

    public function favorite(Request $request, $id)
    {
        if ($request->isMethod('PUT')) {
            try {
                $productId = $request->input('product_id');
                $action = $request->input('action');
                $customer = Customer::find($id);
                $favoriteProductList = $this->buildFavoriteList($customer->favorite_product_list, $productId, $action);
                Customer::where('id', $id)->update(['favorite_product_list' => $favoriteProductList]);
            } catch (QueryException $e) {
                return response()->json(['error' => $e->errorInfo], 500);
            }

            // return json result
            $result = ['success' => 'Update customer successfully'];
            if ($request->input('callback')) {
                return response()->json($result)->withCallback($request->input('callback'));
            } else {
                return response()->json($result);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 500);
        }
    }

    private function buildFavoriteList($favoriteProductList, $productId, $action)
    {
        if ($favoriteProductList) {
            $arr = explode(',', $favoriteProductList);
        } else {
            $arr = [];
        }
        if ($action == 'add') {
            if (!in_array($productId, $arr)) {
                array_push($arr, $productId);
            }
        } elseif ($action == 'remove') {
            $index = array_search($productId, $arr);
            if ($index !== false) {
                unset($arr[$index]);
            }
        }

        return implode(',', $arr);
    }
}
