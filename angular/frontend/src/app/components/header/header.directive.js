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

        HeaderController.$inject = ['$scope', '$location', '$uibModal', '$log', 'customerService'];

        /** @ngInject */
        function HeaderController($scope, $location, $uibModal, $log, customerService) {
            $scope.currentUser = null;

            $scope.logout = function () {
                customerService.logout(function () {
                    $scope.currentUser = null;
                });
            };

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

                modalInstance.result.then(function (currentUser) {
                    if (customerService.isAuthenticated()) {
                        console.log(currentUser);
                        $scope.currentUser = currentUser;
                    }
                }, function () {
                    $log.info('Login modal dismissed at: ' + new Date());
                });
            };

            $scope.openSignupModal = function () {
                var modalInstance;

                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'registerModal.html',
                    size: 'lg',
                    controller: 'RegisterModalInstanceController',
                    controllerAs: '$ctrl',
                    resolve: {
                        /*
                        currentUser: function () {
                            return $ctrl.currentUser;
                        }
                        */
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