(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, authManager) {

        // Getting Authentication State on Page Refresh
        authManager.checkAuthOnRefresh();

        $log.debug('runBlock end');
    }

})();