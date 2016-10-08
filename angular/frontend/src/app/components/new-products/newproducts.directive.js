(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appNewProducts', appNewProducts);

    /** @ngInject */
    function appNewProducts() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/new-products/new-products.html',
            scope: {
                creationDate: '='
            },
            controller: NewProductsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NewProductsController() {}
    }

})();