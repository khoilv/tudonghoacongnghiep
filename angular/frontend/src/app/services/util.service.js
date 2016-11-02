(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('utilService', utilService);

    utilService.$inject = ['localStorageService', 'commonService'];

    function utilService(localStorageService, commonService) {

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

        function saveProductCategory(categoryUrl) {
            localStorageService.set('selected_category', categoryUrl, 'sessionStorage');
        }

        function getProductCategory() {
            return localStorageService.get('selected_category', 'sessionStorage');
        }

        return {
            generateCaptcha: generateCaptcha,
            getCitiesProvinces: getCitiesProvinces,
            saveProductCategory: saveProductCategory,
            getProductCategory: getProductCategory
        }
    }

})();