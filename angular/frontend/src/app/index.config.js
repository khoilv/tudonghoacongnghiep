(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config);

    /** @ngInject */
    function config($logProvider, $compileProvider, localStorageServiceProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/);

        // Set local storage config
        localStorageServiceProvider
            .setPrefix('tudonghoacongnghiep')
            .setStorageType('sessionStorage');

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    }

})();