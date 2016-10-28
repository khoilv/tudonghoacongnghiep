(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comProducts', comProducts);

    /** @ngInject */
    function comProducts() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/products/products.html',
            scope: {
                products: '='
            },
            controller: ProductsController,
            controllerAs: '$ctrl',
            bindToController: true
        };

        ProductsController.$inject = [];

        /** @ngInject */
        function ProductsController() {
        }

        return directive;
    }

})();