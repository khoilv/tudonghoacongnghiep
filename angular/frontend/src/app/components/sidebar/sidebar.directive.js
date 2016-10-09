(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comSidebar', comSidebar);

    /** @ngInject */
    function comSidebar() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/sidebar/sidebar.html',
            scope: {
                creationDate: '='
            },
            controller: SidebarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function SidebarController() {}
    }

})();