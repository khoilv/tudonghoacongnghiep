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

            $scope.init = function () {
                if (customerService.isAuthenticated()) {
                    $scope.currentUser = customerService.getAuthData();
                }
            };

            // logout
            $scope.logout = function () {
                customerService.logout(function () {
                    $scope.currentUser = null;
                    $location.path('/');
                });
            };

            // login modal
            $scope.openLoginModal = function () {
                openLoginModal();
            };

            // register modal
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

            // my-account
            $scope.myAccount = function () {
                checkCustomerLoggedIn('/my-account');
            };

            // order-history
            $scope.orderHistory = function () {
                checkCustomerLoggedIn('/order-history');
            };

            function openLoginModal(redirectToPath) {
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
                    $scope.currentUser = currentUser;
                    if (angular.isDefined(redirectToPath)) $location.path(redirectToPath);
                }, function () {
                    $log.info('Login modal dismissed at: ' + new Date());
                });
            }

            function checkCustomerLoggedIn(redirectToPath) {
                if (customerService.isAuthenticated()) {
                    $location.path(redirectToPath);
                } else {
                    openLoginModal(redirectToPath);
                }
            }
        }

        return directive;
    }

})();