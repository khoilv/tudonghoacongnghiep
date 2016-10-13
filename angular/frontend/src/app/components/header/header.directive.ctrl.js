(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'commonService'];

    function ModalInstanceController($scope, $uibModalInstance, commonService) {
        var $ctrl = this;

        commonService.loadData('cities_provinces', null, true, function (data) {
            $ctrl.cities_provinces = data;
        });

        commonService.loadData('generate-captcha', null, true, function (data) {
            $ctrl.captchaData = data;
        });

        $ctrl.generateCaptcha = function () {
            commonService.loadData('generate-captcha', null, true, function (data) {
                $ctrl.captchaData = data;
            });
        };

        $ctrl.ok = function () {
            $uibModalInstance.close(null);
        };

        $ctrl.register = function () {
            console.log($ctrl.email);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();