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

        return {
            loadData: loadData,
            postData: postData
        }
    }

})();