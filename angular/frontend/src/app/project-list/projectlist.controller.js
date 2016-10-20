(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function ProjectListController($scope, commonService) {
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.itemsPerPage = 6;
        $scope.totalItems = 0;

        var queryParams = {page: 1, per_page: $scope.itemsPerPage};
        commonService.loadData('project/list', queryParams, function (response) {
            $scope.projects = response.data.data;
            $scope.totalItems = response.data.total;
        });

        $scope.pageChanged = function () {
            queryParams = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
            commonService.loadData('project/list', queryParams, function (response) {
                $scope.projects = response.data.data;
                $scope.totalItems = response.data.total;
            });
        };
    }

})();