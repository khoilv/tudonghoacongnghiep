(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('RegisterModalInstanceController', RegisterModalInstanceController)
        .controller('LoginModalInstanceController', LoginModalInstanceController);

    RegisterModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService', 'customerService'];
    LoginModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'customerService'];

    function RegisterModalInstanceController($scope, $uibModalInstance, commonService) {
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
            if (angular.isUndefined(data.company) || angular.isNull(data.company)) data['company'] = '';
            commonService.postData('customer/register', data, function (response) {
                if (response.data.status === true) {
                    $uibModalInstance.close(null);
                } else {
                    console.log(response);
                }
            }, function (response) {
                if (response.status === 422) {
                    generateCaptcha();
                    var errors = {};
                    angular.forEach(response.data, function (value, key) {
                        console.log(key + ': ' + value[0]);
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

        function generateCaptcha() {
            commonService.loadData('customer/generate-captcha', null, function (response) {
                $ctrl.captcha_src = response.data.captcha_src;
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