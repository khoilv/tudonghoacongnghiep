(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductDetailController', ProductDetailController);


    ProductDetailController.$inject = ['$scope', '$state', '$stateParams', 'commonService', 'customerService', 'cartService'];

    /** @ngInject */
    function ProductDetailController($scope, $state, $stateParams, commonService, customerService, cartService) {
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
            $scope.product = response.data;

            setProductImage(response.data.product_images);
            checkFavoriteList(response.data.id);

            // show relevant products
            showRelevantProducts(response.data.relevant_products);
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

        $scope.addItemToCart = function (productId, price) {
            cartService.addItemToCart(productId, 1, price);
            $state.go('cart');
        };

        function setProductImage(productImages) {
            angular.forEach(productImages, function (productImage) {
                if (productImage.main == 1) {
                    $scope.productImage = productImage.image;
                }
            });
        }

        function checkFavoriteList(productId) {
            if ($scope.showFavoriteList) {
                var url = 'customers/' + customerService.getCustomerId() + '/check-favorite-list';
                commonService.loadData(url, {product_id: productId}, function (response) {
                    $scope.addedToFavoriteList = response.data.exists;
                });
            }
        }

        function showRelevantProducts(relevantProducts) {
            var slide, slideItems = [], slideItemCount = 0, slideCount = 0;
            angular.forEach(relevantProducts, function (product, key) {
                slideItems.push(product);
                if (++slideItemCount % 3 == 0) {
                    ++slideCount;
                    slide = {id: slideCount - 1, items: slideItems};
                    $scope.slides.push(slide);
                    slideItems = [];
                }
            });
            if (slideItems.length > 0) {
                var i, missingItemCount = 3 - slideItems.length;
                for (i = 0; i < missingItemCount; i++) {
                    slideItems.push($scope.slides[slideCount - 1].items[i]);
                }
                slide = {id: slideCount, items: slideItems};
                $scope.slides.push(slide);
            }
        }
    }

})();