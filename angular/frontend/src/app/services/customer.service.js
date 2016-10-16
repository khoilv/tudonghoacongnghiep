(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['localStorageService', 'commonService'];

    function customerService(localStorageService, commonService) {

        function login(credentials, onSuccess, onError) {
            commonService.postData('customer/auth', credentials, function (response) {
                localStorageService.set('token', response.data.token, 'sessionStorage');
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
            localStorageService.remove('token', 'sessionStorage');
            localStorageService.remove('username', 'sessionStorage');
            onSuccess();
        }

        function isAuthenticated() {
            return localStorageService.get('token', 'sessionStorage') ? true : false;
        }

        function getAuthData() {
            return {
                username: localStorageService.get('username', 'sessionStorage'),
                token: localStorageService.get('token', 'sessionStorage')
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