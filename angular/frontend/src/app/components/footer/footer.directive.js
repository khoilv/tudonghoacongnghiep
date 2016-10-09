(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appFooter', appFooter);

    /** @ngInject */
    function appFooter() {
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