(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', 'localStorageService', 'commonService', 'API_URL'];

    function customerService($http, localStorageService, commonService, API_URL) {

        function login(credentials, onSuccess, onError) {
            commonService.postData('customer/auth', credentials, function (response) {
                localStorageService.set('token', response.data.token);
                localStorageService.set('username', response.data.username);
                onSuccess(response);
            }, function (response) {
                if (response.status === 422 || response.status == 401) {
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
            localStorageService.remove('token');
            localStorageService.remove('username');
            onSuccess();
        }

        function isAuthenticated() {
            return localStorageService.get('token') ? true : false;
        }

        function getAuthData() {
            return {
                username: localStorageService.get('username'),
                token: localStorageService.get('token')
            }
        }

        function forgotPassword(email, onSuccess, onError) {

        }

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getAuthData: getAuthData,
            forgotPassword: forgotPassword
        }
    }

})();