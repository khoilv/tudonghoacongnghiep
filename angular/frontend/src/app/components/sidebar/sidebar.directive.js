(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comSidebar', comSidebar);

    /** @ngInject */
    function comSidebar() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/sidebar/sidebar.html',
            scope: {
                creationDate: '='
            },
            controller: SidebarController,
            controllerAs: 'vm',
            bindToController: false
        };

        SidebarController.$inject = ['$scope', '$location', 'commonService'];

        /** @ngInject */
        function SidebarController($scope, $location, commonService) {

            commonService.loadData('menu', null, function (data) {
                $scope.menus = data;
            });

            commonService.loadData('faq', null, function (data) {
                $scope.faqs = data;
            });

            commonService.loadData('online_support', null, function (data) {
                $scope.supports = data;
            });

            $scope.init = function () {
                // product category menu
                $('ul.product-list-content').on('click', 'li > a', function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active').next('ul').hide(400);
                    } else {
                        var a = $(this).parent().parent().find('a.active');
                        $(a).removeClass('active').next('ul').hide(400);
                        $(this).addClass('active').next('ul').show(400);
                    }
                });
            };

        }

        return directive;
    }

})();