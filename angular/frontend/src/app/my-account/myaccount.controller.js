(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MyAccountController', MyAccountController);


    MyAccountController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function MyAccountController($scope, $stateParams, commonService) {

    }
})();