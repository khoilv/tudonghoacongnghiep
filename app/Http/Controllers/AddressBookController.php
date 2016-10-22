<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\AddressBook as AddressBookRequest;
use App\AddressBook;

class AddressBookController extends Controller
{
    public function getAddressList(Request $request)
    {
        $customerId = $request->input('customer_id');
        $data = AddressBook::where('customer_id', $customerId)->get()->toArray();

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

    public function getAddress(Request $request)
    {
        $addressId = $request->input('address_id');
        $data = AddressBook::find($addressId)->toArray();

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

    public function store(AddressBookRequest $request)
    {
        $data = $request->only(['id', 'first_name', 'last_name', 'company', 'tel', 'address_1', 'address_2', 'city_province_id', 'customer_id']);

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
