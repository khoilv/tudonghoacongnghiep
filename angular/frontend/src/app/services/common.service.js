(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('commonService', commonService);

    commonService.$inject = ['$http', 'API_URL'];

    function commonService($http, API_URL) {

        function loadData(url, queryParams, jsonp, onSuccess) {
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
                        onSuccess(response.data);
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
                        onSuccess(response.data);
                    },
                    function (response) {
                        console.log(response);
                    }
                );
            }
        }

        function postData(url, queryParams, onSuccess, onError) {
            var submitUrl = API_URL + url;
            return $http({
                url: submitUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: queryParams,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(
                function (response) {
                    onSuccess(response.data);
                },
                function (response) {
                    onError(response);
                }
            );
        }

        return {
            loadData: loadData,
            postData: postData
        }
    }

})();