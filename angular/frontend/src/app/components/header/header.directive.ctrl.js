(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('RegisterModalInstanceController', RegisterModalInstanceController)
        .controller('LoginModalInstanceController', LoginModalInstanceController)
        .controller('ForgotPasswordModalInstanceController', ForgotPasswordModalInstanceController);

    RegisterModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService', 'customerService'];
    LoginModalInstanceController.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'localStorageService', 'customerService'];
    ForgotPasswordModalInstanceController.$inject = ['$scope', '$uibModalInstance'];

    // --- RegisterModalInstanceController
    function RegisterModalInstanceController($scope, $uibModalInstance, commonService, customerService) {
        var $ctrl = this;
        $ctrl.customer = {};
        $ctrl.errors = {};

        commonService.loadData('customer/register', null, function (response) {
            $ctrl.cities_provinces = response.data.cities_provinces;
            $ctrl.captcha_src = response.data.captcha_src;
            $ctrl.csrf_token = response.data.csrf_token;
        }, function (response) {
            console.log(response);
        });

        $ctrl.generateCaptchaToken = function () {
            generateCaptcha();
        };

        $ctrl.register = function () {
            var data = angular.extend($ctrl.customer, {'_token': $ctrl.csrf_token});
            if (angular.isUndefined(data.company)) data['company'] = '';

            customerService.register(data, function (response) {
                $uibModalInstance.close(null);
            }, function (response) {
                generateCaptcha();
                var errors = {};
                if (response.status == 422) {
                    angular.forEach(response.data, function (value, key) {
                        errors[key] = value[0];
                    });
                }
                $ctrl.errors = errors;
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function generateCaptcha() {
            commonService.loadData('generate-captcha', null, function (response) {
                $ctrl.captcha_src = response.data.captcha_src;
            });
        }
    }

    // --- LoginModalInstanceController
    function LoginModalInstanceController($scope, $uibModal, $uibModalInstance, localStorageService, customerService) {
        $scope.remember = false;
        $scope.loginData = {email: null, password: null};
        $scope.errors = {};

        // check login data
        var loginData = localStorageService.get('loginData', 'localStorage');
        if (loginData) {
            $scope.loginData = JSON.parse(loginData);
            $scope.remember = true;
        }

        $scope.login = function () {
            customerService.login($scope.loginData, function (response) {
                if ($scope.remember) {
                    localStorageService.set('loginData', JSON.stringify($scope.loginData), 'localStorage');
                } else {
                    localStorageService.remove('loginData', 'localStorage');
                }
                $uibModalInstance.close(response.data.username);
            }, function (response) {
                var errors = {};
                if (response.status == 422) {
                    angular.forEach(response.data, function (value, key) {
                        errors[key] = value[0];
                    });
                } else if (response.status == 401) {
                    errors['password'] = 'Email hoặc mật khẩu đăng nhập không hợp lệ';
                }
                $scope.errors = errors;
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // forgot password modal
        $scope.openForgotPasswordModal = function () {
            var modalInstance;

            // close Login Modal first
            $uibModalInstance.dismiss('cancel');

            // open Forgot Password Modal then
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'forgotPasswordModal.html',
                size: 'lg',
                controller: 'ForgotPasswordModalInstanceController',
                controllerAs: '$ctrl'
            });

            modalInstance.result.then(function () {
                $log.info('Forgot password modal closed');
            }, function () {
                $log.info('Forgot password modal dismissed at: ' + new Date());
            });
        };
    }

    // --- ForgotPasswordModalInstanceController
    function ForgotPasswordModalInstanceController($scope, $uibModalInstance) {

    }

})();