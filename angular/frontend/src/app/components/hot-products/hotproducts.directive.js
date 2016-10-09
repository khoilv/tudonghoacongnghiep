(function() {
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

        HotProductsController.$inject = ['$scope'];

        /** @ngInject */
        function HotProductsController($scope) {
            $scope.myInterval = 5000;
            $scope.active = 0;
            $scope.noWrapSlides = false;
            $scope.slides = [];

            init();

            function init() {
                var slide = [];
                var i;
                for(i = 0; i < 4; i++) {
                    slide.push({
                        discount_rate: '20%',
                        product_image: '../../../assets/images/frontend/img_05.jpg',
                        product_name: 'Bộ chuyển đổi USB 2.0 to RS232',
                        product_old_price: '200.000',
                        product_new_price: '100.000'
                    });
                }
                for (i = 0; i < 2; i++) {
                    $scope.slides.push({
                        id: i,
                        products: slide
                    });
                }
            }
        }

        return directive;
    }

})();