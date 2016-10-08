(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appHeader', appHeader);

    /** @ngInject */
    function appHeader() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/header/header.html',
            scope: {
                creationDate: '='
            },
            controller: HeaderController,
            controllerAs: 'vm',
            bindToController: false
        };

        HeaderController.$inject = ['$scope', '$location'];

        /** @ngInject */
        function HeaderController($scope, $location) {

        }

        return directive;
    }

})();