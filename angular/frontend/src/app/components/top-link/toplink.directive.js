(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comTopLink', comTopLink);

    /** @ngInject */
    function comTopLink() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/top-link/top-link.html',
            scope: {
                creationDate: '='
            },
            controller: TopLinkController,
            controllerAs: 'vm',
            bindToController: true
        };

        TopLinkController.$inject = ['$timeout'];

        /** @ngInject */
        function TopLinkController($timeout) {

            // Go to top
            $timeout(function () {
                var showFlag = false;
                var topBtn = $('#top-link').css('bottom', '-100px');
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        if (showFlag == false) {
                            showFlag = true;
                            topBtn.stop().animate({'bottom' : '50px'}, 400);
                        }
                    } else {
                        if (showFlag) {
                            showFlag = false;
                            topBtn.stop().animate({'bottom' : '-100px'}, 300);
                        }
                    }
                });
                topBtn.click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 500);
                    return false;
                });

            }, 2000);
        }

        return directive;
    }

})();