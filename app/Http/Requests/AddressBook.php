<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressBook extends FormRequest
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
            'first_name' => 'required|string',
            'address_1' => 'required|string',
            'tel' => 'required|numeric|min:10',
            'city_province_id' => 'required|integer',
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
            'first_name.required' => 'Tên được yêu cầu nhập',
            'first_name.string' => 'Tên nhập không hợp lệ',
            'tel.required' => 'Số điện thoại được yêu cầu nhập',
            'tel.numeric' => 'Số điện thoại không hợp lệ',
            'tel.min' => 'Số điện thoại phải ít nhất 10 số',
            'address_1.required' => 'Địa chỉ 1 được yêu cầu nhập',
            'city_province_id.required' => 'Tỉnh/Thành phố được yêu cầu nhập',
            'city_province_id.integer' => 'Tỉnh/Thành phố không hợp lệ'
        ];
    }
}
