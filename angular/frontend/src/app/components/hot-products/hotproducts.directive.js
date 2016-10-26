(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comHotProducts', comHotProducts);

    /** @ngInject */
    function comHotProducts() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/hot-products/hot-products.html',
            scope: {
                creationDate: '='
            },
            controller: HotProductsController,
            controllerAs: 'vm',
            bindToController: false
        };

        HotProductsController.$inject = ['$scope', 'commonService'];

        /** @ngInject */
        function HotProductsController($scope, commonService) {
            $scope.myInterval = 5000;
            $scope.active = 0;
            $scope.noWrapSlides = false;
            $scope.slides = [];

            commonService.loadData('products/hot', null, function (response) {
                var slide, slideItems = [], slideItemCount = 0, slideCount = 0;
                angular.forEach(response.data, function (product, key) {
                    slideItems.push(product);
                    if (++slideItemCount % 4 == 0) {
                        ++slideCount;
                        slide = {id: slideCount - 1, items: slideItems};
                        $scope.slides.push(slide);
                        slideItems = [];
                    }
                });
            });

        }

        return directive;
    }

})();