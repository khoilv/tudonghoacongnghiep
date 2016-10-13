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

// API Routes

// get menu list
Route::get('/api/menu', 'ProductCategoryController@getMenuList');

// get faq list
Route::get('/api/faq', 'FaqController@getFaqList');

// get online support list
Route::get('/api/online_support', 'OnlineSupportController@getOnlineSupportList');

// get cities/provinces list
Route::get('/api/cities_provinces', 'CustomerController@getCitiesProvincesList');

// captcha test
Route::any('/api/captcha-test', 'CustomerController@captchaTest');
Route::get('/api/generate-captcha', 'CustomerController@generateCaptcha');
Route::post('/api/send-captcha', 'CustomerController@sendCaptcha');

Route::get('/admin', function () {
   return view('backend/index');
});

