(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config);

    config.$inject = ['$logProvider', '$compileProvider', '$sceDelegateProvider', 'localStorageServiceProvider', 'toastr'];

    /** @ngInject */
    function config($logProvider, $compileProvider, $sceDelegateProvider, localStorageServiceProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/);

        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://localhost:8000/**'
        ]);

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