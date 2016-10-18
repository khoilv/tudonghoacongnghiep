<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('frontend/index');
});

// --------------- API FRONTEND Routes -------------------

Route::group(['prefix' => 'api'], function () {

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

});

// -----------------------------------------------------

Route::get('/admin', function () {
   return view('backend/index');
});

