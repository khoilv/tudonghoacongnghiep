(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductListController', ProductListController);


    ProductListController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function ProductListController($scope, commonService) {
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        var queryParams = {page: 1, per_page: $scope.itemsPerPage};
        commonService.loadData('products/list', queryParams, function (response) {
            $scope.products = response.data.data;
            $scope.totalItems = response.data.total;
        });

        $scope.pageChanged = function () {
            queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            commonService.loadData('products/list', queryParams, function (response) {
                $scope.products = response.data.data;
                $scope.totalItems = response.data.total;
            });
        };
    }

})();