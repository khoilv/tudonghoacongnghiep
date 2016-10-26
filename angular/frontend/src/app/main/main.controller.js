(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);


    MainController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function MainController($scope, commonService) {

        commonService.loadData('products', null, function (response) {
            $scope.products = response.data;
            console.log(response);
        });

    }

})();