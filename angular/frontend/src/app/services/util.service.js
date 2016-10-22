(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('utilService', utilService);

    utilService.$inject = ['commonService'];

    function utilService(commonService) {

        function generateCaptcha(onSuccess) {
            commonService.loadData('generate-captcha', null, function (data) {
                onSuccess(data);
            });
        }

        function getCitiesProvinces(onSuccess) {
            commonService.loadData('cities-provinces', null, function (data) {
                onSuccess(data);
            });
        }

        return {
            generateCaptcha: generateCaptcha,
            getCitiesProvinces: getCitiesProvinces
        }
    }

})();