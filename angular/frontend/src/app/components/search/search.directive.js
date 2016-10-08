(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appSearch', appSearch);

    /** @ngInject */
    function appSearch() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/search/search.html',
            scope: {
                creationDate: '='
            },
            controller: SearchController,
            controllerAs: 'vm',
            bindToController: false
        };

        return directive;

        /** @ngInject */
        function SearchController() {}
    }

})();