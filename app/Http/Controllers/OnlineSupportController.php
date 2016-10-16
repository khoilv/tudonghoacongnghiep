<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OnlineSupport;

class OnlineSupportController extends Controller
{
    public function getOnlineSupportList(Request $request)
    {
        $data = OnlineSupport::where('active', 1)->get()->toArray();

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
