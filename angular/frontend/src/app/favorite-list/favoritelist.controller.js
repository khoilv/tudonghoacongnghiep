(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('FavoriteListController', FavoriteListController);


    FavoriteListController.$inject = ['$scope', 'commonService', 'customerService'];

    /** @ngInject */
    function FavoriteListController($scope, commonService, customerService) {
        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        var queryParams = null;
        loadFavoriteList();

        $scope.pageChanged = function () {
            loadFavoriteList();
        };

        function loadFavoriteList() {
            var url = 'products/' + customerService.getCustomerId() + '/get-favorite-list';
            queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            commonService.loadData(url, queryParams, function (response) {
                $scope.products = response.data.data;
                $scope.totalItems = response.data.total;
            });
        }
    }
})();