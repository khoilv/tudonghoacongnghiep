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

        HeaderController.$inject = ['$scope', '$location', '$timeout', '$interval', '$window', '$uibModal', '$log', 'customerService', 'cartService'];

        /** @ngInject */
        function HeaderController($scope, $location, $timeout, $interval, $window, $uibModal, $log, customerService, cartService) {

            $scope.currentUser = null;
            $scope.cartItemCount = cartService.countCartItems();

            $timeout(function () {
                angular.element('.menu_m').addClass('original').clone().insertAfter('.menu_m').addClass('cloned').css('position', 'fixed')
                    .css('top', '0').css('margin-top', '0').css('z-index', '500').removeClass('original').hide();
                $interval(stickIt, 10);
            }, 0);

            $scope.init = function () {
                if (customerService.isAuthenticated()) {
                    $scope.currentUser = customerService.getUserName();
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
                    controllerAs: '$ctrl'
                });

                modalInstance.result.then(function () {
                    $log.info('Register modal closed');
                }, function () {
                    $log.info('Register modal dismissed at: ' + new Date());
                });
            };

            // my-account
            $scope.myAccount = function () {
                checkCustomerLoggedIn('/tai-khoan-cua-toi');
            };

            // order-history
            $scope.orderHistory = function () {
                checkCustomerLoggedIn('/lich-su-don-hang');
            };

            // favorite-product-list
            $scope.favoriteList = function () {
                checkCustomerLoggedIn('/danh-sach-ua-thich');
            };

            function openLoginModal(redirectToPath) {
                var modalInstance;

                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'loginModal.html',
                    size: 'lg',
                    controller: 'LoginModalInstanceController',
                    controllerAs: '$ctrl'
                });

                modalInstance.result.then(function (currentUser) {
                    $scope.currentUser = currentUser;
                    if (angular.isDefined(redirectToPath)) {
                        $location.path(redirectToPath);
                    }
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
                var orgElement = angular.element('.original');
                var orgElementPos = orgElement.offset();
                var orgElementPosTop = angular.isUndefined(orgElementPos) ? 0 : orgElementPos.top;
                var orgElementPosLeft = angular.isUndefined(orgElementPos) ? 0 : orgElementPos.left;
                var orgElementWidth = orgElement.css('width');

                if (angular.element($window).scrollTop() >= (orgElementPosTop)) {
                    // scrolled past the original position; now only show the cloned, sticky element.
                    // Cloned element should always have same left position and width as original element.
                    angular.element('.cloned').css('left', orgElementPosLeft + 'px').css('top', '0').css('width', orgElementWidth).show();
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