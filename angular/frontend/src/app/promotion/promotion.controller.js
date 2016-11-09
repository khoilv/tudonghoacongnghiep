(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('PromotionController', PromotionController);


    PromotionController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function PromotionController($scope, commonService) {
        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        loadPromotionList();

        $scope.pageChanged = function () {
            loadPromotionList();
        };

        function loadPromotionList() {
            var queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            commonService.loadData('products/promotion', queryParams, function (response) {
                $scope.products = response.data.data;
                $scope.totalItems = response.data.total;
            });
        }
    }

})();