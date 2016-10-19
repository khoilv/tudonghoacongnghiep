(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['$scope', '$stateParams', '$sanitize', '$sce', 'commonService'];

    /** @ngInject */
    function ProjectDetailController($scope, $stateParams, $sanitize, $sce, commonService) {
        $scope.myInterval = 5000;
        $scope.active = 0;
        $scope.noWrapSlides = false;
        $scope.slides = [];
        $scope.mainItems = [];
        $scope.bigImage = null;

        var listProjectStatus = {
            project_status_1: "Đã hoàn thành",
            project_status_2: "Đang thực hiện",
            project_status_3: "Chưa thực hiện"
        };

        var url = 'project/' + $sanitize($stateParams.slug);
        commonService.loadData(url, {slug: $stateParams.slug}, function (response) {
            var project = response.data;
            project.project_status = listProjectStatus['project_status_' + response.data.project_status];
            $scope.project = project;
            //$scope.project.project_content = $sce.trustAsHtml(response.data.project_content);
            initProjectImages(project.project_images);
        });

        $scope.changeMainImage = function (mainImage) {
            $scope.bigImage = mainImage;
        };

        function initProjectImages(projectImages) {
            var slide, slideItems = [], mainItems = [], slideItemCount = 0, slideCount = 0;
            angular.forEach(projectImages, function (item, key) {
                if (item.main == 0) {
                    slideItems.push(item);
                    if (++slideItemCount % 3 == 0) {
                        ++slideCount;
                        slide = {id: slideCount - 1, items: slideItems};
                        $scope.slides.push(slide);
                        slideItems = [];
                    }
                } else {
                    mainItems.push(item);
                }
            });
            if (slideCount == 1 && slide) {
                $scope.slides.push({
                    id: 1,
                    items: slide.items
                });
            }
            $scope.mainItems = mainItems;
            $scope.bigImage = mainItems[0].image;
        }
    }

})();