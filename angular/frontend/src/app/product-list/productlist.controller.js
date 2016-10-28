(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductListController', ProductListController);


    ProductListController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProductListController($scope, $stateParams, commonService) {
        var categoryUrl = angular.isUndefined($stateParams.category_url)? null : $stateParams.category_url;
        var queryParams = {category_url: categoryUrl};

        // sorting
        var sorting = {sort_field: 'id', sort_order: 'desc'};
        $scope.sortBy = 'newest';

        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        $scope.init = function () {
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

        function loadProductList() {
            var paging = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            queryParams = angular.extend(queryParams, paging, sorting);
            console.log(queryParams);
            commonService.loadData('products/list', queryParams, function (response) {
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