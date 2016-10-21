(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddressBookController', AddressBookController)
        .controller('NewAddressModalInstanceController', NewAddressModalInstanceController);

    AddressBookController.$inject = ['$scope', '$uibModal', 'commonService', 'customerService'];
    NewAddressModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService'];

    /** @ngInject */
    function AddressBookController($scope, $uibModal, commonService, customerService) {

        var queryParams = {customer_id: customerService.getCustomerId()};
        commonService.loadData('customer/address-book', queryParams, function (response) {
            $scope.addresses = response.data;
        });


        // add new address modal
        $scope.openNewAddressModal = function () {
            var modalInstance;

            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'newAddressModal.html',
                size: 'lg',
                controller: 'NewAddressModalInstanceController',
                controllerAs: '$ctrl',
                resolve: {}
            });

            modalInstance.result.then(function () {
                $log.info('New address modal closed');
            }, function () {
                $log.info('New address modal dismissed at: ' + new Date());
            });
        };
    }

    function NewAddressModalInstanceController($scope, $uibModalInstance, commonService) {

    }

})();