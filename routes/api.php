<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


// --------------- API FRONTEND Routes -------------------
// get menu list
Route::get('menu', 'ProductCategoryController@getMenuList');

// get faq list
Route::get('faq', 'FaqController@getFaqList');
Route::get('faq/{id}', 'FaqController@getFaqList');

// get online support list
Route::get('online_support', 'OnlineSupportController@getOnlineSupportList');

// customer api
Route::post('customer/auth', 'CustomerController@authenticate');
Route::post('customer/login', 'CustomerController@login');
Route::get('customer/register', 'CustomerController@initRegisterCustomer');
Route::post('customer/register', 'CustomerController@registerCustomer');
Route::get('customer/generate-captcha', 'CustomerController@generateCaptcha');

Route::group(['middleware' => ['jwt.auth', 'jwt.refresh']], function () {
    //Route::get('faq', 'FaqController@getFaqList');
});

// project
Route::get('project/list', 'ProjectController@getProjectList');
