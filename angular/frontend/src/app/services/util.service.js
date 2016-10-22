(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('utilService', utilService);

    utilService.$inject = ['$http', 'localStorageService', 'API_URL', 'commonService'];

    function utilService($http, localStorageService, API_URL, commonService) {

        function generateCaptcha(onSuccess) {
            commonService.loadData('customer/generate-captcha', null, true, function (data) {
                onSuccess(data);
            });
        };

        return {
            generateCaptcha: generateCaptcha
        }
    }

})();