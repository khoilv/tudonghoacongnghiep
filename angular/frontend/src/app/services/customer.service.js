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
                onError(response);
            });
        }

        function register(data, onSuccess, onError) {
            commonService.postData('customer/register', data, function (response) {
                if (response.data.status === true) {
                    onSuccess(response);
                } else {
                    console.log(response);
                }
            }, function (response) {
                if (response.status === 422) {
                    onError(response);
                } else {
                    console.log(response);
                }
            });
        }

        function logout() {
            localStorageService.remove('api_token');
            $http.get(API_URL + 'customer/logout');
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