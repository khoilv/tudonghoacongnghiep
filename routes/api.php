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
Route::get('product-categories', 'ProductCategoryController@getProductCategories');

// get faq list
Route::get('faq', 'FaqController@getFaqList');
Route::get('faq/{id}', 'FaqController@getFaqList');

// get online support list
Route::get('online_support', 'OnlineSupportController@getOnlineSupportList');

// customer api
Route::post('customer/auth', 'CustomerController@authenticate');
Route::get('customer/token', 'CustomerController@authenticate');
Route::post('customer/login', 'CustomerController@login');
Route::get('customer/register', 'CustomerController@initRegisterCustomer');
Route::post('customer/register', 'CustomerController@registerCustomer');

Route::group(['middleware' => ['jwt.auth' /*, 'jwt.refresh'*/]], function () {

    // address book
    Route::get('customer/address-list', 'AddressBookController@getAddressList');
    Route::get('customer/address', 'AddressBookController@getAddress');
    Route::post('customer/address', 'AddressBookController@store');
    Route::delete('customer/address/{id}', 'AddressBookController@destroy');

    // update customer
    Route::get('customers/{id}/edit', 'CustomerController@edit')->name('customers.edit');
    Route::put('customers/{id}', 'CustomerController@update')->name('customers.update');
    Route::patch('customers/{id}', 'CustomerController@changePassword')->name('customers.changePassword');
});

// project
Route::get('project/list', 'ProjectController@getProjectList');
Route::get('project/{productUrl}', 'ProjectController@getProjectByURL');

// products
Route::get('products', 'ProductController@index');

// utils
Route::get('generate-captcha', 'UtilsController@generateCaptcha');
Route::get('cities-provinces', 'UtilsController@getCitiesProvinces');
