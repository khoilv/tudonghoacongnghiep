(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('faq', {
                url: '/faq/:faq_id',
                templateUrl: 'app/faq/faq.html',
                controller: 'FaqController',
                controllerAs: 'faq'
            })
            .state('my-account', {
                url: '/my-account',
                templateUrl: 'app/my-account/my-account.html',
                controller: 'MyAccountController',
                controllerAs: 'myAcc'
            });

        $urlRouterProvider.otherwise('/');
    }

})();