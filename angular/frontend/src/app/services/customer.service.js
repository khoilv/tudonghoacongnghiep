(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', '$sanitize', 'localStorageService', 'commonService', 'API_URL'];

    function customerService($http, $sanitize, localStorageService, commonService, API_URL) {
        var storageType = 'sessionStorage';
        var sanitizeCredentials = function (credentials) {
            return {
                email: $sanitize(credentials.email),
                password: $sanitize(credentials.password)
            }
        };

        function login(credentials, onSuccess, onError) {
            commonService.postData('customer/auth', sanitizeCredentials(credentials), function (response) {
                localStorageService.set('id_token', response.data.token, storageType);
                localStorageService.set('username', response.data.username, storageType);
                localStorageService.set('customer_id', response.data.customerId, storageType);
                onSuccess(response);
            }, function (response) {
                if (response.status === 422 || response.status == 401) {
                    onError(response);
                } else {
                    console.log(response);
                }
            });
        }

        function getRefreshToken(token) {
            return $http({
                url: API_URL + 'customer/token',
                skipAuthorization : true,
                method: 'GET',
                headers : { Authorization : 'Bearer '+ token}
            }).then(function (response) {
                localStorageService.set('id_token', response.data.token, storageType);
                return response.data.token;
            }, function (response) {
                localStorageService.remove('id_token', storageType);
                localStorageService.remove('username', storageType);
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
            localStorageService.remove('id_token', storageType);
            localStorageService.remove('username', storageType);
            onSuccess();
        }

        function isAuthenticated() {
            return localStorageService.get('id_token', storageType) ? true : false;
        }

        function getAccessToken() {
            return localStorageService.get('id_token', storageType);
        }

        function getUserName() {
            return localStorageService.get('username', storageType);
        }

        function getCustomerId() {
            return localStorageService.get('customer_id', storageType);
        }

        function getAuthData() {
            return {
                username: localStorageService.get('username', storageType),
                token: localStorageService.get('id_token', storageType)
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
            getUserName: getUserName,
            getCustomerId: getCustomerId,
            getRefreshToken: getRefreshToken,
            getAuthData: getAuthData,
            forgotPassword: forgotPassword
        }
    }

})();