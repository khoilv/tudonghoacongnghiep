(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddToCartModalInstanceController', AddToCartModalInstanceController);

    AddToCartModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'cartService', 'product'];

    function AddToCartModalInstanceController($scope, $uibModalInstance, cartService, product) {

        $scope.product = product;

        // cart item
        $scope.quantity = 1;
        $scope.quantityOptions = quantityOptions();
        $scope.cartTotalItems = cartService.countCartItems();
        $scope.cartTotalPrice = cartService.calculateCartTotalPrice();

        $scope.updateCart = function () {
            cartService.updateCartItem($scope.product.id, $scope.quantity, $scope.product.actual_price);
            $scope.cartTotalItems = cartService.countCartItems();
            $scope.cartTotalPrice = cartService.calculateCartTotalPrice();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function quantityOptions() {
            var i, quantityOpts = [];
            for (i = 1; i <= 30; i++) {
                quantityOpts.push(i);
            }
            return quantityOpts;
        }
    }

})();