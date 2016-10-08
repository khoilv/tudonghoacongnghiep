(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appBanner', appBanner);

    /** @ngInject */
    function appBanner() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/banner/banner.html',
            scope: {
                creationDate: '='
            },
            controller: BannerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function BannerController() {}
    }

})();