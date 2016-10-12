(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comHeader', comHeader);

    /** @ngInject */
    function comHeader() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/header/header.html',
            scope: {
                creationDate: '='
            },
            controller: HeaderController,
            controllerAs: 'vm',
            bindToController: false
        };

        HeaderController.$inject = ['$scope', '$location', '$uibModal', '$log'];

        /** @ngInject */
        function HeaderController($scope, $location, $uibModal, $log) {

            $scope.open = function () {
                var modalInstance;
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'registerModal.html',
                    size: 'lg',
                    controller: 'ModalInstanceController',
                    controllerAs: '$ctrl',
                    resolve: {
                        /*
                        items: function () {
                            return $ctrl.items;
                        }*/
                    }
                });
                modalInstance.result.then(function () {
                    $log.info('Modal closed');
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }

        return directive;
    }

})();