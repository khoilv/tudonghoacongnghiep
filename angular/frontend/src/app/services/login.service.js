(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('loginService', ['$http', 'API_URL', function ($http, API_URL) {
            var login = function (email, password) {

            };
            return {
                login: login
            }
        }]);

})();