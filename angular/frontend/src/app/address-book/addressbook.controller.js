(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AddressBookController', AddressBookController)
        .controller('AddressModalInstanceController', AddressModalInstanceController)
        .controller('ConfirmModalInstanceController', ConfirmModalInstanceController);

    AddressBookController.$inject = ['$scope', '$uibModal', '$log', '$http', 'commonService', 'customerService', 'API_URL'];
    AddressModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService', 'input'];
    ConfirmModalInstanceController.$inject = ['$scope', '$uibModalInstance'];

    /** @ngInject */
    function AddressBookController($scope, $uibModal, $log, $http, commonService, customerService, API_URL) {
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
                size: 'lg', // sm, md, lg
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

        $scope.openConfirmModal = function (addressId) {
            var modalInstance;

            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'confirmModal.html',
                size: 'md', // sm, md, lg
                controller: 'ConfirmModalInstanceController',
                controllerAs: '$ctrl'
            });

            modalInstance.result.then(function () {
                var submitUrl = API_URL + 'customer/address/' + addressId;
                $http.delete(submitUrl).success(function (response) {
                    showAddressList();
                    $log.info(response);
                });
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
                first_name: '',
                last_name: '',
                company: '',
                tel: '',
                address_1: '',
                address_2: '',
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
            cities_provinces.push({id: '', name: '---Chọn Tỉnh/Thành phố---'});
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
                $uibModalInstance.close(null);
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

    function ConfirmModalInstanceController($scope, $uibModalInstance) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.delete = function () {
            $uibModalInstance.close(null);
        }
    }
})();