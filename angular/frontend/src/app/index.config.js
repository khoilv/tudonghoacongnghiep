(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config);

    /** @ngInject */
    function config($logProvider, $compileProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    }

})();