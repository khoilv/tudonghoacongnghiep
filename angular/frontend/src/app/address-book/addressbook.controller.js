(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddressBookController', AddressBookController);


    AddressBookController.$inject = ['$scope', 'commonService', 'customerService'];

    /** @ngInject */
    function AddressBookController($scope, commonService, customerService) {
        var queryParams = {customer_id: customerService.getCustomerId()};
        commonService.loadData('customer/address-book', queryParams, function (response) {
            $scope.addresses = response.data;
        });

    }
})();