(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProjectListController($scope, $stateParams, commonService) {
        commonService.loadData('project/list', null, function (response) {
           $scope.projects = response.data;
            console.log(response);
        });
    }

})();