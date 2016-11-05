(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductDetailController', ProductDetailController);


    ProductDetailController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProductDetailController($scope, $stateParams, commonService) {
        var productUrl = $stateParams.product_url;

        commonService.loadData('products/detail', {product_url: productUrl}, function (response) {
            console.log(response.data);
            $scope.product = response.data;
        });
    }

})();