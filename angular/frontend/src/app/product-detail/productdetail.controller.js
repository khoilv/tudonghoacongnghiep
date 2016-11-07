(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductDetailController', ProductDetailController);


    ProductDetailController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProductDetailController($scope, $stateParams, commonService) {
        var productUrl = $stateParams.product_url;
        $scope.productImage = null;

        commonService.loadData('products/detail', {product_url: productUrl}, function (response) {
            console.log(response.data);
            $scope.product = response.data;
            setProductImage(response.data.product_images);
        });

        $scope.changeProductImage = function (productImage) {
            $scope.productImage = productImage.image;
        };

        function setProductImage(productImages) {
            angular.forEach(productImages, function (productImage) {
               if (productImage.main == 1) {
                   $scope.productImage = productImage.image;
               }
            });
        }
    }

})();