(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AccountInfoController', AccountInfoController);


    AccountInfoController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function AccountInfoController($scope, $stateParams, commonService) {

    }
})();