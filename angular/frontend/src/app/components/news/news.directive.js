(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comNews', comNews);

    /** @ngInject */
    function comNews() {
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