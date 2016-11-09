(function() {
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

        $scope.totalAmount = 0;

        initCart();

        $scope.pageChanged = function () {
            initCart();
        };

        function initCart() {
            if (!cartService.isCartEmpty()) {
                var queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
                var arrayProductId = cartService.getCartProducts();
                var quantity = 1;
                angular.extend(queryParams, {array_product_id: JSON.stringify(arrayProductId)});
                commonService.loadData('products/cart', queryParams, function (response) {
                    $scope.products = response.data.data;
                    $scope.totalItems = response.data.total;
                    angular.forEach($scope.products, function (product, index) {
                        quantity = cartService.getCartProductQuantity(product.id);
                        $scope.products[index]['quantity'] = quantity;
                        $scope.totalAmount += quantity * product.product_price_discount;
                    });
                    console.log($scope.products);
                });
            }
        }
    }

})();