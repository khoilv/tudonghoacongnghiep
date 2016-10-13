(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService'];

    function ModalInstanceController($scope, $uibModalInstance, commonService) {
        var $ctrl = this;
        $ctrl.customer = {};

        commonService.loadData('init-registration', null, true, function (data) {
            $ctrl.cities_provinces = data.cities_provinces;
            $ctrl.captcha_src = data.captcha_src;
            $ctrl.csrf_token = data.csrf_token;
        });

        $ctrl.generateCaptcha = function () {
            commonService.loadData('generate-captcha', null, true, function (data) {
                $ctrl.captcha_src = data.captcha_src;
            });
        };

        $ctrl.ok = function () {
            $uibModalInstance.close(null);
        };

        $ctrl.register = function () {
            console.log($ctrl.customer);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();