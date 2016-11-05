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

        // get/set product category
        function saveProductCategory(categoryUrl) {
            _set('selected_category', categoryUrl);
        }

        function getProductCategory() {
            var categoryUrl = _get('selected_category');
            _remove('selected_category');
            return categoryUrl;
        }

        // get/set product sub category
        function saveProductSubCategory(subCategoryUrl) {
            _set('selected_sub_category', subCategoryUrl);
        }

        function getProductSubCategory() {
            var subCategoryUrl = _get('selected_sub_category');
            _remove('selected_sub_category');
            return subCategoryUrl;
        }

        // get/set search keyword
        function saveKeyword(keyword) {
            _set('keyword', keyword);
        }

        function getKeyword() {
            var keyword = _get('keyword');
            _remove('keyword');
            return keyword;
        }

        function _get(key) {
            return localStorageService.get(key, 'sessionStorage');
        }

        function _set(key, value) {
            localStorageService.set(key, value, 'sessionStorage');
        }

        function _remove(key) {
            localStorageService.remove(key, 'sessionStorage');
        }

        return {
            generateCaptcha: generateCaptcha,
            getCitiesProvinces: getCitiesProvinces,
            saveProductCategory: saveProductCategory,
            saveProductSubCategory: saveProductSubCategory,
            saveKeyword: saveKeyword,
            getProductCategory: getProductCategory,
            getProductSubCategory: getProductSubCategory,
            getKeyword: getKeyword
        }
    }

})();