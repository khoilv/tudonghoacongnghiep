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

        function saveProductSubCategory(subCategoryUrl) {
            localStorageService.set('selected_sub_category', subCategoryUrl, 'sessionStorage');
        }

        function getProductCategory() {
            var categoryUrl = localStorageService.get('selected_category', 'sessionStorage');
            localStorageService.remove('selected_category', 'sessionStorage');
            return categoryUrl;
        }

        function getProductSubCategory() {
            var subCategoryUrl = localStorageService.get('selected_sub_category', 'sessionStorage');
            localStorageService.remove('selected_sub_category', 'sessionStorage');
            return subCategoryUrl;
        }

        return {
            generateCaptcha: generateCaptcha,
            getCitiesProvinces: getCitiesProvinces,
            saveProductCategory: saveProductCategory,
            saveProductSubCategory: saveProductSubCategory,
            getProductCategory: getProductCategory,
            getProductSubCategory: getProductSubCategory
        }
    }

})();