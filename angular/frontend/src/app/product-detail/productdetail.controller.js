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

        // relevant product slide settings
        $scope.myInterval = 5000;
        $scope.active = 0;
        $scope.noWrapSlides = false;
        $scope.slides = [];

        commonService.loadData('products/detail', {product_url: productUrl}, function (response) {
            console.log(response.data);
            $scope.product = response.data;
            setProductImage(response.data.product_images);

            // show relevant products
            var slide, slideItems = [], slideItemCount = 0, slideCount = 0;
            angular.forEach(response.data.relevant_products, function (product, key) {
                slideItems.push(product);
                if (++slideItemCount % 3 == 0) {
                    ++slideCount;
                    slide = {id: slideCount - 1, items: slideItems};
                    $scope.slides.push(slide);
                    slideItems = [];
                }
            });
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