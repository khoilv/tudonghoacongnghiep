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
                url: '/tai-khoan-cua-toi',
                templateUrl: 'app/my-account/my-account.html',
                controller: 'MyAccountController',
                controllerAs: 'myAcc'
            })
            .state('order-history', {
                url: '/lich-su-don-hang',
                templateUrl: 'app/order-history/order-history.html',
                controller: 'OrderHistoryController',
                controllerAs: 'orderHistory'
            })
            .state('favorite-product-list', {
                url: '/danh-sach-ua-thich',
                templateUrl: 'app/favorite-product-list/favorite-product-list.html',
                controller: 'FavoriteProductListController',
                controllerAs: 'favorite'
            })
            .state('project-list', {
                url: '/du-an',
                templateUrl: 'app/project-list/project-list.html',
                controller: 'ProjectListController',
                controllerAs: 'projectList'
            })
            .state('project-detail', {
                url: '/chi-tiet-du-an/:slug',
                templateUrl: 'app/project-detail/project-detail.html',
                controller: 'ProjectDetailController',
                controllerAs: 'projectDetail'
            })
            .state('technology-training', {
                url: '/dao-tao-chuyen-giao-cong-nghe',
                templateUrl: 'app/technology-training/technology-training.html',
                controller: 'TechnologyTrainingController',
                controllerAs: 'techTraining'
            })
            .state('technical-services', {
                url: '/dich-vu-ky-thuat',
                templateUrl: 'app/technical-services/technical-services.html',
                controller: 'TechnicalServicesController',
                controllerAs: 'techServices'
            })
            .state('address-book', {
                url: '/so-dia-chi',
                templateUrl: 'app/address-book/address-book.html',
                controller: 'AddressBookController',
                controllerAs: 'addressBook'
            });

        $urlRouterProvider.otherwise('/');
    }

})();