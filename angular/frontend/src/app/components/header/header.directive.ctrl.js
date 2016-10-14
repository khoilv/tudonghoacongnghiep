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

        commonService.loadData('customer/signup', null, function (data) {
            $ctrl.cities_provinces = data.cities_provinces;
            $ctrl.captcha_src = data.captcha_src;
            $ctrl.csrf_token = data.csrf_token;
        });

        $ctrl.generateCaptcha = function () {
            generateCaptcha();
        };

        $ctrl.signup = function () {
            var data = angular.extend($ctrl.customer, {'_token': $ctrl.csrf_token});

            customerService.signup(data, function (response) {
                if (response.status === 200) {
                    $uibModalInstance.close(null);
                }
            }, function (response) {
                if (response.status === 422) {
                    generateCaptcha();
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

        function generateCaptcha() {
            commonService.loadData('customer/generate-captcha', null, function (data) {
                $ctrl.captcha_src = data.captcha_src;
            });
        }
    }

    function LoginModalInstanceController($scope, $uibModalInstance, loginService) {
        $scope.account = {};

        $scope.login = function () {
            console.log($scope.account);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();