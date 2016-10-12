(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance'];

    function ModalInstanceController($scope, $uibModalInstance) {
        var $ctrl = this;

        $ctrl.ok = function () {
            $uibModalInstance.close(null);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();