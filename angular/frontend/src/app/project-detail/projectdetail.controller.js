(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['$scope', '$stateParams', '$sanitize', 'commonService'];

    /** @ngInject */
    function ProjectDetailController($scope, $stateParams, $sanitize, commonService) {
        $scope.myInterval = 5000;
        $scope.active = 0;
        $scope.noWrapSlides = false;
        $scope.slides = [];

        var url = 'project/' + $sanitize($stateParams.slug);
        commonService.loadData(url, {slug: $stateParams.slug}, function (response) {
            $scope.project = response.data;
            initSlide(response.data.project_images);
        });



        function initSlide(projectImages) {
            var slide, items = [], itemCount = 0, slideCount = 0;

            angular.forEach(projectImages, function (item, key) {
                if (item.main == 0) {
                    items.push(item);
                    if (++itemCount % 3 == 0) {
                        ++slideCount;
                        slide = {id: slideCount - 1, items: items};
                        $scope.slides.push(slide);
                        items = [];
                    }
                }
            });

            if (slideCount == 1 && slide) {
                $scope.slides.push({
                    id: 1,
                    items: slide.items
                });
            }
        }
    }

})();