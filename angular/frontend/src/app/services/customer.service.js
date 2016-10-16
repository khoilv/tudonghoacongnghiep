(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', 'localStorageService', 'commonService', 'API_URL'];

    function customerService($http, localStorageService, commonService, API_URL) {

        function login(credentials, onSuccess, onError) {
            commonService.postData('customer/auth', credentials, function (response) {
                localStorageService.set('api_token', response.data.token);
                onSuccess(response);
            }, function (response) {
                if (response.status === 422) {
                    onError(response);
                } else {
                    console.log(response);
                }
            });
        }

        function register(data, onSuccess, onError) {
            commonService.postData('customer/register', data, function (response) {
                onSuccess(response);
            }, function (response) {
                if (response.status === 422) {
                    onError(response);
                } else {
                    console.log(response);
                }
            });
        }

        function logout(onSuccess) {
            localStorageService.remove('api_token');
            onSuccess();
        }

        function isAuthenticated() {
            return localStorageService.get('api_token') ? true : false;
        }

        function forgotPassword(email, onSuccess, onError) {

        }

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
            forgotPassword: forgotPassword
        }
    }

})();