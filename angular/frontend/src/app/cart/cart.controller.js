(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('CartController', CartController);


    CartController.$inject = ['$scope', 'commonService', 'cartService'];

    /** @ngInject */
    function CartController($scope, commonService, cartService) {

        // paging
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 12;
        $scope.totalItems = 0;

        // cart
        $scope.quantityOptions = quantityOptions();
        $scope.cartTotalPrice = 0;

        initCart();

        $scope.pageChanged = function () {
            initCart();
        };

        $scope.updateCart = function (product) {
            cartService.updateCartItem(product.id, product.quantity, product.actual_price);
            $scope.cartTotalPrice = cartService.calculateCartTotalPrice();
        };

        function initCart() {
            if (!cartService.isCartEmpty()) {
                var queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
                var arrayProductId = cartService.getCartProducts();
                angular.extend(queryParams, {array_product_id: JSON.stringify(arrayProductId)});
                commonService.loadData('products/cart', queryParams, function (response) {
                    var products = response.data.data;
                    var quantity = 1, cartTotalPrice = 0;
                    $scope.totalItems = response.data.total;
                    angular.forEach(products, function (product, index) {
                        quantity = cartService.getCartProductQuantity(product.id);
                        products[index]['quantity'] = quantity;
                        cartTotalPrice += quantity * product.actual_price;
                    });
                    $scope.products = products;
                    console.log(products);
                    $scope.cartTotalPrice = cartTotalPrice;
                });
            }
        }

        function quantityOptions() {
            var i, quantityOpts = [];
            for (i = 1; i <= 30; i++) {
                quantityOpts.push(i);
            }
            return quantityOpts;
        }
    }

})();