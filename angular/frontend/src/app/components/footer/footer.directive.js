(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comFooter', comFooter);

    /** @ngInject */
    function comFooter() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/footer/footer.html',
            scope: {
                creationDate: '='
            },
            controller: FooterController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function FooterController() {}
    }

})();