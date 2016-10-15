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

// get menu list
Route::get('/api/menu', 'ProductCategoryController@getMenuList');

// get faq list
Route::get('/api/faq', 'FaqController@getFaqList');

// get online support list
Route::get('/api/online_support', 'OnlineSupportController@getOnlineSupportList');

// customer api
Route::post('/api/customer/login', 'CustomerController@login');
Route::get('/api/customer/register', 'CustomerController@initSignUpCustomer');
Route::post('/api/customer/register', 'CustomerController@signUpCustomer');
Route::get('/api/customer/generate-captcha', 'CustomerController@generateCaptcha');

// -----------------------------------------------------

Route::get('/admin', function () {
   return view('backend/index');
});

