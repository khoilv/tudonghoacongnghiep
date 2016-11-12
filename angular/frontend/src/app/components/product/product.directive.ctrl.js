(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddToCartModalInstanceController', AddToCartModalInstanceController);

    AddToCartModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'cartService', 'product'];

    // --- RegisterModalInstanceController
    function AddToCartModalInstanceController($scope, $uibModalInstance, cartService, product) {

        // cart
        $scope.quantity = 1;
        $scope.quantityOptions = quantityOptions();
        $scope.subTotal = 0;
        $scope.totalAmount = 0;
        $scope.cartTotalItems = cartService.countCartItems();
        $scope.cartTotalPrice = cartService.calculateCartTotalPrice();

        $scope.product = product;
        console.log($scope.product);

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