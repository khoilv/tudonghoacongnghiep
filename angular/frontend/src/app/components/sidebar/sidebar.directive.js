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

            commonService.loadData('menu', null, true, function (data) {
                $scope.menus = data;
                console.log(data);
            });

            $scope.init = function () {
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