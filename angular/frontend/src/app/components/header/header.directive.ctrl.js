(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService'];

    function ModalInstanceController($scope, $uibModalInstance, commonService) {
        var $ctrl = this;
        $ctrl.customer = {};
        $ctrl.errors = {};

        commonService.loadData('customer/register', null, true, function (data) {
            $ctrl.cities_provinces = data.cities_provinces;
            $ctrl.captcha_src = data.captcha_src;
            $ctrl.csrf_token = data.csrf_token;
        });

        $ctrl.generateCaptcha = function () {
            generateCaptcha();
        };

        $ctrl.register = function () {
            var data = angular.extend($ctrl.customer, {'_token': $ctrl.csrf_token});
            commonService.postData('customer/register', data, false, function (response) {
                if (response.status === 200) {
                    $uibModalInstance.close(null);
                }
            }, function (response) {
                if (response.status === 422) {
                    generateCaptcha();
                    var errors = response.data;
                    console.log(errors);
                }
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function generateCaptcha() {
            commonService.loadData('customer/generate-captcha', null, true, function (data) {
                $ctrl.captcha_src = data.captcha_src;
            });
        }

    }

})();