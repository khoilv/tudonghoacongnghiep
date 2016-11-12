(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddToCartModalInstanceController', AddToCartModalInstanceController);

    AddToCartModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'product'];

    // --- RegisterModalInstanceController
    function AddToCartModalInstanceController($scope, $uibModalInstance, product) {

        // cart
        $scope.quantity = 1;
        $scope.quantityOptions = quantityOptions();
        $scope.subTotal = 0;
        $scope.totalAmount = 0;

        $scope.product = product;
        console.log($scope.product);

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