(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appTopics', appTopics);

    /** @ngInject */
    function appTopics() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/topics/topics.html',
            scope: {
                creationDate: '='
            },
            controller: TopicsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function TopicsController() {}
    }

})();