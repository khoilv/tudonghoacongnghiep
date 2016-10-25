(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('comPopupChat', comPopupChat);

    /** @ngInject */
    function comPopupChat() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/popup-chat/popup-chat.html',
            scope: {
                creationDate: '='
            },
            controller: PopupChatController,
            controllerAs: 'vm',
            bindToController: false
        };

        PopupChatController.$inject = ['$scope'];

        /** @ngInject */
        function PopupChatController($scope) {
        }

        return directive;
    }

})();