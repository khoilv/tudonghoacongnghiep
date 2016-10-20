(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['$scope', '$log', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProjectListController($scope, $log, $stateParams, commonService) {
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 6;
        $scope.totalItems = 0;

        var queryParams = {page: 1, items_per_page: $scope.itemsPerPage};
        commonService.loadData('project/list', queryParams, function (response) {
           $scope.projects = response.data.data;
            $scope.totalItems = response.data.total;
        });

        $scope.pageChanged = function() {
            queryParams = {page: $scope.currentPage, items_per_page: $scope.itemsPerPage};
            commonService.loadData('project/list', queryParams, function (response) {
                $scope.projects = response.data.data;
                $scope.totalItems = response.data.total;
            });
        };
    }

})();