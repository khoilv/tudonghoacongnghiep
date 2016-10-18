(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectListController', ProjectListController);


    ProjectListController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProjectListController($scope, $stateParams, commonService) {

    }

})();