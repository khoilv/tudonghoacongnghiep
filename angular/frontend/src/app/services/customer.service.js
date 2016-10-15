(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', 'localStorageService', 'commonService', 'API_URL'];

    function customerService($http, localStorageService, commonService, API_URL) {

        function login(email, password, onSuccess, onError) {
            var data = {email: email, password: password};
            commonService.postData('customer/login', data, function (response) {
                localStorageService.set('isAuthenticated', true);
                onSuccess(response);
            }, function (response) {
                onError(response);
            });
        }

        function signUp(data, onSuccess, onError) {
            commonService.postData('customer/signUp', data, function (response) {
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
            localStorageService.remove('isAuthenticated');
            $http.get(API_URL + 'customer/logout');
        }

        function isAuthenticated() {
            return localStorageService.get('isAuthenticated') ? true : false;
        }

        function forgotPassword(email, onSuccess, onError) {

        }

        return {
            login: login,
            signUp: signUp,
            logout: logout,
            isAuthenticated: isAuthenticated,
            forgotPassword: forgotPassword
        }
    }

})();