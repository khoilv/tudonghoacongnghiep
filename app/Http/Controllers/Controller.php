<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function outputJson(Request $request, array $data)
    {
        $jsonRes = response()->json($data);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }
}
