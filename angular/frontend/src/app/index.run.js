(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $log, authManager) {

        // Getting Authentication State on Page Refresh
        authManager.checkAuthOnRefresh();

        $rootScope.$on('tokenHasExpired', function() {
            alert('Your session has expired!');
        });

        $log.debug('runBlock end');
    }

})();