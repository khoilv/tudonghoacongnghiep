(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('OrderHistoryController', OrderHistoryController);


    OrderHistoryController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function OrderHistoryController($scope, $stateParams, commonService) {

    }
})();