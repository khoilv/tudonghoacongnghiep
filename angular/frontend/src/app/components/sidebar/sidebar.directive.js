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
                    $(this).next('ul').toggle(400);
                });
            };

        }

        return directive;
    }

})();