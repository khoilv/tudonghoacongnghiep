(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('appEmailRegistration', appEmailRegistration);

    /** @ngInject */
    function appEmailRegistration() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/email-registration/email-registration.html',
            scope: {
                creationDate: '='
            },
            controller: EmailRegistrationController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function EmailRegistrationController() {}
    }

})();