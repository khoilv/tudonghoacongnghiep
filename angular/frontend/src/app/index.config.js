(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config);

    config.$inject = [
        '$httpProvider',
        'jwtOptionsProvider',
        '$logProvider',
        '$compileProvider',
        '$sceDelegateProvider',
        'localStorageServiceProvider',
        'toastr'
    ];

    /** @ngInject */
    function config($httpProvider, jwtOptionsProvider, $logProvider, $compileProvider, $sceDelegateProvider, localStorageServiceProvider, toastr) {

        // Please note we're annotating the function so that the $injector works when the file is minified
        jwtOptionsProvider.config({
            tokenGetter: ['jwtHelper', 'customerService', function(jwtHelper, customerService) {
                var token = customerService.getAccessToken();
                if (token && jwtHelper.isTokenExpired(token)) {
                    return customerService.getRefreshToken(token);
                } else {
                    return token;
                }
            }],
            whiteListedDomains: ['api.tudonghoacongnghiep.com', 'localhost'],
            unauthenticatedRedirectPath: '/'
        });

        $httpProvider.interceptors.push('jwtInterceptor');

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