<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Faq;

class FaqController extends Controller
{
    public function getFaqList(Request $request)
    {
        $faqData = Faq::all(['id', 'question'])->toArray();

        // return json result
        $jsonRes = response()->json($faqData);
        if ($request->input('callback')) {
            return $jsonRes->withCallback($request->input('callback'));
        } else {
            return $jsonRes;
        }
    }
}
