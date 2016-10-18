(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comTopics', comTopics);

    /** @ngInject */
    function comTopics() {
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

        TopicsController.$inject = ['$scope', '$location'];

        /** @ngInject */
        function TopicsController($scope, $location) {

            $scope.goToProjects = function () {
                $location.path('/project-list')
            };

            $scope.goToTrainingAndTechnology = function () {

            };

            $scope.goToTechnicalServices = function () {

            };
        }

        return directive;
    }

})();