(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$sanitize', 'localStorageService', 'commonService'];

    function customerService($sanitize, localStorageService, commonService) {

        var sanitizeCredentials = function (credentials) {
            return {
                email: $sanitize(credentials.email),
                password: $sanitize(credentials.password)
            }
        };

        function login(credentials, onSuccess, onError) {
            commonService.postData('customer/auth', sanitizeCredentials(credentials), function (response) {
                localStorageService.set('id_token', response.data.token, 'sessionStorage');
                localStorageService.set('username', response.data.username, 'sessionStorage');
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
            localStorageService.remove('id_token', 'sessionStorage');
            localStorageService.remove('username', 'sessionStorage');
            onSuccess();
        }

        function isAuthenticated() {
            return localStorageService.get('id_token', 'sessionStorage') ? true : false;
        }

        function getAccessToken() {
            return localStorageService.get('id_token', 'sessionStorage');
        }

        function getAuthData() {
            return {
                username: localStorageService.get('username', 'sessionStorage'),
                token: localStorageService.get('id_token', 'sessionStorage')
            }
        }
        
        function forgotPassword(email, onSuccess, onError) {

        }

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getAccessToken: getAccessToken,
            getAuthData: getAuthData,
            forgotPassword: forgotPassword
        }
    }

})();