(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comSearch', comSearch);

    /** @ngInject */
    function comSearch() {
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

        SearchController.$inject = ['$scope', '$state'];

        /** @ngInject */
        function SearchController($scope, $state) {
            $scope.keyword = null;

            $scope.search = function () {
                $state.go('product-search', {keyword: $scope.keyword});
            }
        }

        return directive;
    }

})();