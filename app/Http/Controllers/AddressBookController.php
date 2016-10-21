<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\AddressBook;

class AddressBookController extends Controller
{
    public function getAddressBook(Request $request)
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
}