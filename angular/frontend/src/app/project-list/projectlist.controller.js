(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['$scope', '$log', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProjectListController($scope, $log, $stateParams, commonService) {
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        commonService.loadData('project/list', null, function (response) {
           $scope.projects = response.data;
        });

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }

})();