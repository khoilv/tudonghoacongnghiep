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
            })
            .state('order-history', {
                url: '/order-history',
                templateUrl: 'app/order-history/order-history.html',
                controller: 'OrderHistoryController',
                controllerAs: 'orderHistory'
            })
            .state('favorite-product-list', {
                url: '/favorite-product-list',
                templateUrl: 'app/favorite-product-list/favorite-product-list.html',
                controller: 'FavoriteProductListController',
                controllerAs: 'favorite'
            })
            .state('project-list', {
                url: '/project-list',
                templateUrl: 'app/project-list/project-list.html',
                controller: 'ProjectListController',
                controllerAs: 'projectList'
            });

        $urlRouterProvider.otherwise('/');
    }

})();