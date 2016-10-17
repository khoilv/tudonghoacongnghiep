<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Faq;

class FaqController extends Controller
{
    public function getFaqList(Request $request, $id = 0)
    {
        $columns = $id ? ['id', 'question', 'answer'] : ['id', 'question'];
        $data = Faq::all($columns)->toArray();

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }
}
