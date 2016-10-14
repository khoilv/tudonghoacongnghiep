(function () {
    'use strict';
    angular
        .module('angularSeedApp')
        .factory('commonService', commonService);

    commonService.$inject = ['$http', 'API_URL', 'JSONP'];

    function commonService($http, API_URL, JSONP) {

        function loadData(url, queryParams, onSuccess) {
            var submitUrl = API_URL + url;
            if (queryParams == null) queryParams = {};
            if (JSONP) {
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
                    if (typeof(onSuccess) === 'function') onSuccess(response.data);
                },
                function (response) {
                    if (typeof(onError) === 'function') onError(response);
                }
            );
        }

        return {
            loadData: loadData,
            postData: postData
        }
    }

})();