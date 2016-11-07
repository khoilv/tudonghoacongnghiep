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

        SidebarController.$inject = ['$scope', 'commonService', 'utilService', 'localStorageService'];

        /** @ngInject */
        function SidebarController($scope, commonService, utilService, localStorageService) {

            var selectedCategory = utilService.getProductCategory();
            var selectedSubCategory = utilService.getProductSubCategory();

            commonService.loadData('product-categories', null, function (response) {
                $scope.product_categories = response.data;
            });

            commonService.loadData('faq', null, function (response) {
                $scope.faqs = response.data;
            });

            commonService.loadData('online_support', null, function (response) {
                $scope.supports = response.data;
            });

            // faq list marquee
            initMarquee();

            $scope.init = function () {
                // product category menu
                angular.element('ul.product-list-content').on('click', 'li > a', function () {
                    if (angular.element(this).hasClass('active')) {
                        angular.element(this).removeClass('active').next('ul').hide(400);
                    } else {
                        var a = angular.element(this).parent().parent().find('a.active');
                        angular.element(a).removeClass('active').next('ul').hide(400);
                        angular.element(this).addClass('active').next('ul').show(400);
                    }
                });
            };

            $scope.isActiveCategory = function (categoryUrl) {
                return isSelectedCategory(categoryUrl);
            };

            $scope.showSubCategories = function (categoryUrl) {
              if (isSelectedCategory(categoryUrl)) {
                  return {display: 'block'};
              } else {
                  return {display: 'none'};
              }
            };

            $scope.showActiveSubCategory = function (subCategoryUrl) {
                if (selectedSubCategory == subCategoryUrl) {
                    return {'background-color': '#d7eaec'};
                } else {
                    return {'background-color': 'inherit'};
                }
            };

            function initMarquee() {
                var timer;
                timer = localStorageService.get('marquee_timer', 'localStorage');
                if (timer) {
                    window.clearTimeout(parseInt(timer));
                }
                timer = window.setTimeout(function () {
                    angular.element('.marquee > ul').show();
                    angular.element('.marquee').marquee({
                        //speed in milliseconds of the marquee
                        duration: 5000,
                        //gap in pixels between the tickers
                        gap: 10,
                        //time in milliseconds before the marquee will start animating
                        delayBeforeStart: 0,
                        //'left' or 'right'
                        direction: 'up',
                        //true or false - should the marquee be duplicated to show an effect of continues flow
                        duplicated: true,
                        //pause the marquee when the mouse hovers on it
                        pauseOnHover: true
                    });
                }, 2000);
                localStorageService.set('marquee_timer', timer, 'localStorage');
            }

            function isSelectedCategory(categoryUrl) {
                return selectedCategory == categoryUrl;
            }
        }

        return directive;
    }

})();