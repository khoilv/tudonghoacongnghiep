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

        SearchController.$inject = ['$scope', '$state', 'utilService'];

        /** @ngInject */
        function SearchController($scope, $state, utilService) {

            $scope.keyword = utilService.getKeyword();

            $scope.search = function () {
                if ($scope.keyword) {
                    utilService.saveKeyword($scope.keyword);
                    $state.go('product-search', {keyword: $scope.keyword});
                }
            }
        }

        return directive;
    }

})();