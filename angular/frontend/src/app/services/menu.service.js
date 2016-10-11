
(function() {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('menu', ['$http', 'API_URL', function($http) {
            return function($jsonp, onSuccess, onError) {
                if ($jsonp) {

                } else {
                    $http.get(API_URL + 'menu').success(function (response) {
                        return response.data;
                    });
                }
            };
        }]);

})();