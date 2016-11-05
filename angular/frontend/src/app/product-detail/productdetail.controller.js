(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProductDetailController', ProductDetailController);


    ProductDetailController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProductDetailController($scope, $stateParams, commonService) {

    }

})();