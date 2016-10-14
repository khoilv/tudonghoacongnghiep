(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', 'localStorageService', 'API_URL', 'commonService'];

    function customerService($http, localStorageService, API_URL, commonService) {

        function login(email, password) {

        }

        function signup(data, onSuccess, onError) {
            commonService.postData('customer/signup', data, function (response) {
                onSuccess(response);
            }, function (response) {
                onError(response);
            });
        }

        function logout() {

        }

        function isAuthenticated() {

        }

        return {
            login: login,
            signup: signup,
            logout: logout,
            isAuthenticated: isAuthenticated
        }
    }

})();