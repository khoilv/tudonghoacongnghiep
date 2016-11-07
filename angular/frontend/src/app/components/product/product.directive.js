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
                product: '='
            },
            controller: ProductController,
            controllerAs: 'vm',
            bindToController: false
        };

        /** @ngInject */
        function ProductController() {}

        return directive;
    }

})();