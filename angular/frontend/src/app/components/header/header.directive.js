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

            $scope.openLoginModal = function () {
                var modalInstance;

                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'loginModal.html',
                    size: 'lg',
                    controller: 'LoginModalInstanceController',
                    controllerAs: '$ctrl',
                    resolve: {}
                });

                modalInstance.result.then(function () {
                    $log.info('Login modal closed');
                }, function () {
                    $log.info('Login modal dismissed at: ' + new Date());
                });
            };

            $scope.openRegisterModal = function () {
                var modalInstance;

                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'registerModal.html',
                    size: 'lg',
                    controller: 'RegisterModalInstanceController',
                    controllerAs: '$ctrl',
                    resolve: {
                        /*
                        items: function () {
                            return $ctrl.items;
                        }*/
                    }
                });

                modalInstance.result.then(function () {
                    $log.info('Register modal closed');
                }, function () {
                    $log.info('Register modal dismissed at: ' + new Date());
                });
            };
        }

        return directive;
    }

})();