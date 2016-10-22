<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\AddressBook as AddressBookRequest;
use App\AddressBook;
use Illuminate\Database\QueryException;

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
        $addressId = $request->input('addressId');
        $data = $request->only(['first_name', 'last_name', 'company', 'tel', 'address_1', 'address_2', 'city_province_id', 'customer_id']);
        if ($addressId) {
            try {
                AddressBook::where('id', $addressId)->update($data);
                $result = ['success' => 'Update address successfully'];
            } catch (QueryException $e) {
                return response()->json(['error' => $e->errorInfo], 500);
            }
        } else {
            try {
                AddressBook::create($data);
                $result = ['success' => 'Add address successfully'];
            } catch (QueryException $e) {
                return response()->json(['error' => $e->errorInfo], 500);
            }
        }

        // return json result
        if ($request->input('callback')) {
            return response()->json($result)->withCallback($request->input('callback'));
        } else {
            return response()->json($result);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $address = AddressBook::find($id);
            $address->delete();
        } catch (QueryException $e) {
            return response()->json(['error' => $e->errorInfo], 500);
        }
        $data = ['success' => 'Delete address successfully'];

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
