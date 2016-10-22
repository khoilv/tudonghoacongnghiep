(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddressBookController', AddressBookController)
        .controller('AddressModalInstanceController', AddressModalInstanceController);

    AddressBookController.$inject = ['$scope', '$uibModal', '$log', 'commonService', 'customerService'];
    AddressModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService', 'input'];

    /** @ngInject */
    function AddressBookController($scope, $uibModal, $log, commonService, customerService) {

        var queryParams = {customer_id: customerService.getCustomerId()};
        commonService.loadData('customer/address-list', queryParams, function (response) {
            $scope.addresses = response.data;
        });


        // add new address modal
        $scope.openAddressModal = function (customerId, addressId) {
            var modalInstance;

            if (customerId === null) {
                customerId = customerService.getCustomerId();
            }

            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'addressModal.html',
                size: 'lg',
                controller: 'AddressModalInstanceController',
                controllerAs: '$ctrl',
                resolve: {
                    input: function () {
                        return {customerId: customerId, addressId: addressId};
                    }
                }
            });

            modalInstance.result.then(function () {
                $log.info('Address modal closed');
            }, function () {
                $log.info('Address modal dismissed at: ' + new Date());
            });
        };
    }

    function AddressModalInstanceController($scope, $uibModalInstance, commonService, input) {
        if (input.addressId === null) {
            $scope.formTitle = 'Thêm mới địa chỉ';
            $scope.address = {
                first_name: null,
                last_name: null,
                company: null,
                tel: null,
                address_1: null,
                address_2: null,
                city_province_id: 0,
                customer_id: input.customerId
            };
        } else {
            $scope.formTitle = 'Chỉnh sửa địa chỉ';
            commonService.loadData('customer/address', {address_id: input.addressId}, function (response) {
                $scope.address = response.data;
            });
        }

        commonService.loadData('cities-provinces', null, function (response) {
            $scope.cities_provinces = response.data;
            console.log(response.data);
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();