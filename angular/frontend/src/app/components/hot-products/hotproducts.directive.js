(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comHotProducts', comHotProducts);

    /** @ngInject */
    function comHotProducts() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/hot-products/hot-products.html',
            scope: {
                creationDate: '='
            },
            controller: HotProductsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function HotProductsController() {}
    }

})();