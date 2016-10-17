(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('FaqController', FaqController);


    FaqController.$inject = ['$scope', '$stateParams', 'commonService'];

    /** @ngInject */
    function FaqController($scope, $stateParams, commonService) {
        var activeFaq = $stateParams.faq_id;
        var url = 'faq/' + activeFaq;

        commonService.loadData(url, null, function (response) {
            $scope.faqs = response.data;
        });

        $scope.isActiveFaq = function (faq_id) {
            if (faq_id == activeFaq) {
                return {display: 'block'};
            } else {
                return {display: 'none'};
            }
        };

        $scope.init = function () {
            $('.faq-list').on('click', 'li > a', function () {
                $(this).next().toggle(200);
            });
        }
    }
})();