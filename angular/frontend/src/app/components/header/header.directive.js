(function () {
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

            window.setTimeout(function () {
                angular.element('.menu_m').addClass('original').clone().insertAfter('.menu_m').addClass('cloned').css('position', 'fixed')
                    .css('top', '0').css('margin-top', '0').css('z-index', '500').removeClass('original').hide();
                setInterval(stickIt, 10);
            }, 2000);

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

            function stickIt() {

                var orgElementPos = angular.element('.original').offset();
                var orgElementTop = orgElementPos.top;

                if (angular.element(window).scrollTop() >= (orgElementTop)) {
                    // scrolled past the original position; now only show the cloned, sticky element.

                    // Cloned element should always have same left position and width as original element.
                    var orgElement = angular.element('.original');
                    var coordsOrgElement = orgElement.offset();
                    var leftOrgElement = coordsOrgElement.left;
                    var widthOrgElement = orgElement.css('width');

                    angular.element('.cloned').css('left', leftOrgElement + 'px').css('top', 0).css('width', widthOrgElement).show();
                    angular.element('.original').css('visibility', 'hidden');
                } else {
                    // not scrolled past the menu_m; only show the original menu_m.
                    angular.element('.cloned').hide();
                    angular.element('.original').css('visibility', 'visible');
                }
            }
        }

        return directive;
    }

})();