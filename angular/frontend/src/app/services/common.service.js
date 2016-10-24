(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('commonService', commonService);

    commonService.$inject = ['$http', '$httpParamSerializerJQLike', '$location', 'API_URL'];

    function commonService($http, $httpParamSerializerJQLike, $location, API_URL) {

        function loadData(url, queryParams, onSuccess) {
            var submitUrl = API_URL + url;
            var method = 'GET';

            if (queryParams == null) queryParams = {};

            if ($location.port() == 3000) {
                angular.extend(queryParams, {callback: 'JSON_CALLBACK'});
                method = 'JSONP';
            }

            return $http({
                url: submitUrl,
                method: method,
                params: queryParams,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(
                function (response) {
                    onSuccess({
                        data: response.data,
                        status: response.status
                    });
                },
                function (response) {
                    console.log({
                        data: response.data || 'Request failed',
                        status: response.status
                    });
                }
            );
        }

        function postData(url, queryParams, onSuccess, onError) {
            var submitUrl = API_URL + url;
            return $http({
                url: submitUrl,
                method: 'POST',
                data: $httpParamSerializerJQLike(queryParams),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                function (response) {
                    onSuccess({
                        data: response.data,
                        status: response.status
                    });
                },
                function (response) {
                    onError({
                        data: response.data || 'Request failed',
                        status: response.status
                    });
                }
            );
        }

        function putData(url, queryParams, scope, onSuccess) {
            var submitUrl = API_URL + url;
            $http.put(submitUrl, queryParams)
                .success(function (data, status, headers, config) {
                    onSuccess({
                        data: data,
                        status: status
                    });
                })
                .error(function (data, status, header, config) {
                    _parseError(scope, data, status);
                });
        }

        // private function
        function _parseError(scope, data, status) {
            if (status == 422) {
                var errors = {};
                angular.forEach(data, function (value, key) {
                    errors[key] = value[0];
                });
                scope.errors = errors;
            } else {
                console.log({data: data || 'Request failed', status: status});
            }
        }

        return {
            loadData: loadData,
            postData: postData,
            putData: putData
        }
    }

})();