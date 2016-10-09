(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appNews', appNews);

    /** @ngInject */
    function appNews() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/news/news.html',
            scope: {
                creationDate: '='
            },
            controller: NewsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NewsController() {}
    }

})();