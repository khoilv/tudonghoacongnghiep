<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterCustomer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:3|confirmed',
            'password_confirmation' => 'required|min:3',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'tel' => 'required|numeric',
            'address' => 'required|string',
            'city_province_id' => 'required|integer',
            'captcha' => 'required|captcha'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Email được yêu cầu nhập',
            'email.email' => 'Email nhập không chính xác',
            'email.unique' => 'Email nhập đã tồn tại rồi',
            'password.required' => 'Mật khẩu được yêu cầu nhập',
            'password.min' => 'Mật khẩu phải ít nhất 3 kí tự',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp',
            'last_name.required' => 'Họ đệm được yêu cầu nhập',
            'last_name.string' => 'Họ nhập không hợp lệ',
            'first_name.required' => 'Tên được yêu cầu nhập',
            'first_name.string' => 'Tên nhập không hợp lệ',
            'tel.required' => 'Điện thoại được yêu cầu nhập',
            'tel.numeric' => 'Điện thoại không hợp lệ',
            'city_province_id.required' => 'Tỉnh/Thành phố được yêu cầu nhập',
            'city_province_id.integer' => 'Tỉnh/Thành phố không hợp lệ',
            'captcha.required' => 'Mã xác nhận chưa được nhập',
            'captcha.captcha' => 'Mã xác nhận nhập chưa chính xác'
        ];
    }
}
