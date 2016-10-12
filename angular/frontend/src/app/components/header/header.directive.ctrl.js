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

        $ctrl.ok = function () {
            $uibModalInstance.close(null);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();