(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductListController', ProductListController);


    ProductListController.$inject = ['$scope', '$stateParams', 'commonService', 'utilService'];

    /** @ngInject */
    function ProductListController($scope, $stateParams, commonService, utilService) {
        var keyword = angular.isUndefined($stateParams.keyword)? null : $stateParams.keyword;
        var categoryUrl = angular.isUndefined($stateParams.category_url)? null : $stateParams.category_url;
        var subCategoryUrl = angular.isUndefined($stateParams.sub_category_url) ? null : $stateParams.sub_category_url;
        var queryParams = {search_query: keyword, category_url: categoryUrl, sub_category_url: subCategoryUrl};

        // sorting
        var sorting = {sort_field: 'id', sort_order: 'desc'};
        $scope.sortBy = 'newest';

        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        $scope.init = function () {
            utilService.saveProductCategory(categoryUrl);
            utilService.saveProductSubCategory(subCategoryUrl);
            if ($scope.isCategorySelection()) {
                loadProductCategory();
            }
            loadProductList();
        };

        $scope.pageChanged = function () {
            loadProductList();
        };

        $scope.sort = function () {
            if ($scope.sortBy == 'newest') {
                fillSortConditions('id', 'desc');
            } else if ($scope.sortBy == 'hottest') {
                fillSortConditions('num_products_purchased', 'desc');
            } else if ($scope.sortBy == 'price_asc') {
                fillSortConditions('product_price_discount', 'asc');
            } else if ($scope.sortBy == 'price_desc') {
                fillSortConditions('product_price_discount', 'desc');
            }
            $scope.currentPage = 1;
            loadProductList();
        };

        $scope.isCategorySelection = function () {
            return (categoryUrl || subCategoryUrl);
        };

        function loadProductCategory() {
            var url = 'product-category/' + (subCategoryUrl ? subCategoryUrl : categoryUrl);
            commonService.loadData(url, queryParams, function (response) {
                $scope.category = response.data;
            });
        }

        function loadProductList() {
            var paging = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            queryParams = angular.extend(queryParams, paging, sorting);
            commonService.loadData('products/search', queryParams, function (response) {
                $scope.products = response.data.data;
                $scope.totalItems = response.data.total;
            });
        }

        function fillSortConditions(sortField, sortOrder) {
            sorting.sort_field = sortField;
            sorting.sort_order = sortOrder;
        }
    }

})();