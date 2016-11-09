
(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .factory('cartService', cartService);

    cartService.$inject = ['$http', '$sanitize', 'localStorageService', 'commonService', 'API_URL'];

    function cartService($http, $sanitize, localStorageService, commonService, API_URL) {

        function getCart() {
            var cart = localStorageService.get('cart', 'sessionStorage');
            if (cart) {
                cart = JSON.parse(cart);
            } else {
                cart = [];
            }
            return cart;
        }

        function saveCart(cart) {
            localStorageService.set('cart', JSON.stringify(cart), 'sessionStorage');
        }

        function addItemToCart(productId, quantity) {
            var cart = getCart();
            var item = {product_id: productId, quantity: quantity};
            cart.push(item);
            saveCart(cart);
        }

        function countCartItems() {
            var cart = getCart();
            return cart.length;
        }

        return {
            getCart: getCart,
            addItemToCart: addItemToCart,
            countCartItems: countCartItems
        }
    }

})();