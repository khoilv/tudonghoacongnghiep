(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('RegisterModalInstanceController', RegisterModalInstanceController)
        .controller('LoginModalInstanceController', LoginModalInstanceController);

    RegisterModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService', 'customerService'];
    LoginModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'customerService'];

    function RegisterModalInstanceController($scope, $uibModalInstance, commonService, customerService) {
        var $ctrl = this;
        $ctrl.customer = {};
        $ctrl.errors = {};

        commonService.loadData('customer/signup', null, function (response) {
            $ctrl.cities_provinces = response.data.cities_provinces;
            $ctrl.captcha_src = response.data.captcha_src;
            $ctrl.csrf_token = response.data.csrf_token;
        }, function (response) {
            console.log(response);
        });

        $ctrl.generateCaptchaToken = function () {
            generateCaptchaToken();
        };

        $ctrl.signup = function () {
            var data = angular.extend($ctrl.customer, {'_token': $ctrl.csrf_token});
            customerService.signup(data, function (response) {
                if (response.status === 200) {
                    $uibModalInstance.close(null);
                }
            }, function (response) {
                if (response.status === 422) {
                    generateCaptchaToken();
                    var errors = {};
                    angular.forEach(response.data, function (value, key) {
                        errors[key] = value[0];
                    });
                    $ctrl.errors = errors;
                } else {
                    console.log(response);
                }
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function generateCaptchaToken() {
            commonService.loadData('customer/generate-captcha-token', null, function (response) {
                $ctrl.captcha_src = response.data.captcha_src;
                $ctrl.csrf_token = response.data.csrf_token;
            });
        }
    }

    function LoginModalInstanceController($scope, $uibModalInstance, loginService) {
        $scope.loginData = {};

        $scope.login = function () {
            console.log($scope.loginData);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();