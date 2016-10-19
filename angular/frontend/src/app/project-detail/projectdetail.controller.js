(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function ProjectDetailController($scope, $stateParams, commonService) {
        $scope.myInterval = 5000;
        $scope.active = 0;
        $scope.noWrapSlides = false;
        $scope.slides = [];

        /*
        commonService.loadData('project/list', null, function (response) {
           $scope.projects = response.data;
            console.log(response);
        });
        */

        init();

        function init() {
            var i, slide = [];

            slide.push({
                image: '../../assets/images/frontend/project_img01.jpg',
                note: 'Muốn bắn trúng mục tiêu phải ngắm bắn'
            });
            slide.push({
                image: '../../assets/images/frontend/project_img02.jpg',
                note: 'Khi bắn đầu đạn chuyển động trong nòng súng ra ngoài'
            });
            slide.push({
                image: '../../assets/images/frontend/project_img03.jpg',
                note: 'Người bắn phải xác định góc bắn và hướng bắn'
            });

            for (i = 0; i < 2; i++) {
                $scope.slides.push({
                    id: i,
                    items: slide
                });
            }
        }
    }

})();