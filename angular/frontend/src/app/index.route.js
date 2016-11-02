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
            .state('favorite-list', {
                url: '/danh-sach-ua-thich',
                templateUrl: 'app/favorite-list/favorite-list.html',
                controller: 'FavoriteListController',
                controllerAs: 'favorite'
            })
            .state('project-list', {
                url: '/du-an',
                templateUrl: 'app/project-list/project-list.html',
                controller: 'ProjectListController',
                controllerAs: 'projectList'
            })
            .state('project-detail', {
                url: '/chi-tiet-du-an/:product_url',
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
            })
            .state('account-info', {
                url: '/thong-tin-tai-khoan',
                templateUrl: 'app/account-info/account-info.html',
                controller: 'AccountInfoController',
                controllerAs: 'accountInfo'
            })
            .state('product-list-all', {
                url: '/san-pham',
                templateUrl: 'app/product-list/product-list.html',
                controller: 'ProductListController',
                controllerAs: 'productList'
            })
            .state('product-list-category', {
                url: '/san-pham/:category_url',
                templateUrl: 'app/product-list/product-list.html',
                controller: 'ProductListController',
                controllerAs: 'productList'
            })
            .state('product-list-sub-category', {
                url: '/san-pham/:category_url/:sub_category_url',
                templateUrl: 'app/product-list/product-list.html',
                controller: 'ProductListController',
                controllerAs: 'productList'
            })
            .state('promotion', {
                url: '/san-pham-khuyen-mai',
                templateUrl: 'app/promotion/promotion.html',
                controller: 'PromotionController',
                controllerAs: 'promotion'
            });

        $urlRouterProvider.otherwise('/');
    }

})();