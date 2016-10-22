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
        // initialize screen
        showAddressList();

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
                showAddressList();
            }, function () {
                $log.info('Address modal dismissed at: ' + new Date());
            });
        };

        // show address list
        function showAddressList() {
            var queryParams = {customer_id: customerService.getCustomerId()};
            commonService.loadData('customer/address-list', queryParams, function (response) {
                $scope.addresses = response.data;
            });
        }
    }

    function AddressModalInstanceController($scope, $uibModalInstance, commonService, input) {
        if (input.addressId === null) {
            $scope.formTitle = 'Thêm mới địa chỉ';
            $scope.buttonText = 'Thêm mới';
            $scope.address = {
                id: null,
                first_name: null,
                last_name: null,
                company: null,
                tel: null,
                address_1: null,
                address_2: null,
                city_province_id: '',
                customer_id: input.customerId
            };
        } else {
            $scope.formTitle = 'Chỉnh sửa địa chỉ';
            $scope.buttonText = 'Cập nhật';
            commonService.loadData('customer/address', {address_id: input.addressId}, function (response) {
                $scope.address = response.data;
            });
        }

        commonService.loadData('cities-provinces', null, function (response) {
            var cities_provinces = [];
            cities_provinces.push({ id: '', name: '---Chọn Tỉnh/Thành phố---'});
            angular.forEach(response.data, function (city_province) {
                cities_provinces.push(city_province);
            });
            $scope.cities_provinces = cities_provinces;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.store = function () {
            commonService.postData('customer/address', $scope.address, function (response) {
                $uibModalInstance.dismiss('cancel');
                console.log(response);
            }, function (response) {
                var errors = {};
                if (response.status == 422) {
                    angular.forEach(response.data, function (value, key) {
                        errors[key] = value[0];
                    });
                }
                $scope.errors = errors;
            });
        }
    }

})();