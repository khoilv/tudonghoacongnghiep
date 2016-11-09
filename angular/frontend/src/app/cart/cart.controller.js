(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('CartController', CartController);


    CartController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function CartController($scope, commonService) {

        /*
        commonService.loadData('products', null, function (response) {
            $scope.products = response.data;
        });
        */
    }

})();