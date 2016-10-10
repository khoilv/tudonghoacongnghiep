(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comNewsSlide', comNewsSlide);

    /** @ngInject */
    function comNewsSlide() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/news-slide/news-slide.html',
            scope: {
                creationDate: '='
            },
            controller: NewsSlideController,
            controllerAs: 'vm',
            bindToController: true
        };

        NewsSlideController.$inject = ['$scope'];

        /** @ngInject */
        function NewsSlideController($scope) {
            $scope.myInterval = 'none';
            $scope.active = 0;
            $scope.noWrapSlides = false;
            $scope.slides = [];

            init();

            function init() {
                var i, slide = [];
                for (i = 0; i < 4; i++) {
                    slide.push({
                        news_image: '../../../assets/images/frontend/img_01.png',
                        news_title: 'SUPERNANO - Siêu khuyến mãi nhân dịp khai trương Website',
                        news_description: 'Nhân dịp khai trương website bán hàng trực tuyến http://sna no.vn/ Công ty Cổ Phần Công Nghệ Nano Ứng Dụng xin giới thiệu đến Quý khách hàng'
                    });
                }
                for (i = 0; i < 2; i++) {
                    $scope.slides.push({
                        id: i,
                        items: slide
                    });
                }
            }
        }

        return directive;
    }

})();