<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePassword extends FormRequest
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
            'old_password' => 'required|min:3',
            'new_password' => 'required|min:3|confirmed',
            'new_password_confirmation' => 'required',
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
            'old_password.required' => 'Mật khẩu cũ được yêu cầu nhập',
            'old_password.min' => 'Mật khẩu không hợp lệ',
            'new_password.required' => 'Mật khẩu mới được yêu cầu nhập',
            'new_password.min' => 'Mật khẩu mới phải ít nhất 3 ký tự',
            'new_password.confirmed' => 'Mật khẩu xác nhận không khớp',
            'new_password_confirmation.required' => 'Mật khẩu xác nhận được yêu cầu nhập',
        ];
    }
}
