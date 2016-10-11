(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('commonService', ['$http', 'API_URL', function ($http, API_URL) {

            var loadData = function (url, queryParams, jsonp, onSuccess) {
                var submitUrl = API_URL + url;
                if (queryParams == null) queryParams = {};
                if (jsonp) {
                    angular.extend(queryParams, {callback: 'JSON_CALLBACK'});
                    return $http({
                        method: 'JSONP',
                        url: submitUrl,
                        params: queryParams,
                        paramSerializer: '$httpParamSerializerJQLike'
                    }).then(
                        function (response) {
                            if (typeof(onSuccess) === 'function') onSuccess(response.data);
                        },
                        function (response) {
                            console.log(response);
                        }
                    );
                } else {
                    return $http({
                        url: submitUrl,
                        method: 'GET',
                        params: queryParams,
                        paramSerializer: '$httpParamSerializerJQLike'
                    }).then(
                        function (response) {
                            if (typeof(onSuccess) === 'function') onSuccess(response.data);
                        },
                        function (response) {
                            console.log(response);
                        }
                    );
                }
            };

            return {
                loadData: loadData
            }
        }]);

})();