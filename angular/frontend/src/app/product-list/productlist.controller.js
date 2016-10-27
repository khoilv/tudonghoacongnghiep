(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductListController', ProductListController);


    ProductListController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function ProductListController($scope, commonService) {
        // sorting
        var sort = {sort_field: 'id', sort_order: 'desc'};
        $scope.sortBy = 'newest';

        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        var queryParams = {};
        loadProductList();

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
            queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            angular.extend(queryParams, sort);
            commonService.loadData('products/list', queryParams, function (response) {
                $scope.products = response.data.data;
                $scope.totalItems = response.data.total;
            });
        }

        function fillSortConditions(sortField, sortOrder) {
            sort.sort_field = sortField;
            sort.sort_order = sortOrder;
        }
    }

})();