(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductDetailController', ProductDetailController);


    ProductDetailController.$inject = ['$scope', '$stateParams', 'commonService', 'customerService'];

    /** @ngInject */
    function ProductDetailController($scope, $stateParams, commonService, customerService) {
        var productUrl = $stateParams.product_url;
        $scope.productImage = null;

        // relevant product slide settings
        $scope.myInterval = 5000;
        $scope.active = 0;
        $scope.noWrapSlides = false;
        $scope.slides = [];

        // add to favorite list (wish list)
        $scope.showFavoriteList = customerService.isAuthenticated();
        $scope.addedToFavoriteList = false;

        commonService.loadData('products/detail', {product_url: productUrl}, function (response) {
            console.log(response.data);
            $scope.product = response.data;

            setProductImage(response.data.product_images);
            checkFavoriteList(response.data.id);

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

        $scope.addFavoriteList = function (productId) {
            $scope.addedToFavoriteList = !$scope.addedToFavoriteList;
            var url = 'customers/' + customerService.getCustomerId() + '/add-favorite-list';
            var queryParams = {
                product_id: productId,
                action: $scope.addedToFavoriteList ? 'add' : 'remove'
            };
            commonService.putData(url, queryParams, null, function (response) {
                console.log(response);
            });
        };

        function setProductImage(productImages) {
            angular.forEach(productImages, function (productImage) {
               if (productImage.main == 1) {
                   $scope.productImage = productImage.image;
               }
            });
        }

        function checkFavoriteList(productId) {
            var url = 'customers/' + customerService.getCustomerId() + '/check-favorite-list';
            commonService.loadData(url, {product_id: productId}, function (response) {
                $scope.addedToFavoriteList = response.data.exists;
            });
        }
    }

})();