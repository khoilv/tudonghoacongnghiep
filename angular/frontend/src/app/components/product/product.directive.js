(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comProduct', comProduct);

    /** @ngInject */
    function comProduct() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/product/product.html',
            scope: {
                product: '=',
                openDialog: '='
            },
            controller: ProductController,
            controllerAs: 'vm',
            bindToController: false
        };

        ProductController.$inject = ['$scope', '$log', '$uibModal'];

        /** @ngInject */
        function ProductController($scope, $log, $uibModal) {

            // add-to-cart modal
            $scope.openAddToCartDialog = function () {
                var modalInstance;

                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'addToCartModal.html',
                    size: 'lg',
                    controller: 'AddToCartModalInstanceController',
                    controllerAs: '$ctrl',
                    resolve: {
                        product: function () {
                            return $scope.product; // pass parameter to modal dialog
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $log.info('Add to cart modal closed');
                }, function () {
                    $log.info('Add to cart modal dismissed at: ' + new Date());
                });
            };
        }

        return directive;
    }

})();