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
        $jsonRes = response()->json($data);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }
}
