
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

        function addItemToCart(productId, quantity, price) {
            var cart = getCart();
            var existed = false;
            angular.forEach(cart, function (item, index) {
               if (item.product_id == productId) {
                   existed = true;
                   cart[index].quantity += quantity;
               }
            });
            if (!existed) {
                var item = {product_id: productId, quantity: quantity, price: price};
                cart.push(item);
            }
            saveCart(cart);
        }

        function updateCartItem(productId, quantity, price) {
            var cart = getCart();
            angular.forEach(cart, function (item, index) {
                if (item.product_id == productId) {
                    item.quantity = quantity;
                    item.price = price;
                    cart[index] = item;
                }
            });
            saveCart(cart);
        }

        function countCartItems() {
            var cart = getCart();
            var quantity = 0;
            angular.forEach(cart, function (item) {
               quantity += item.quantity;
            });
            return quantity;
        }

        function getCartProducts() {
            var cart = getCart();
            var arrayProductId = [];
            angular.forEach(cart, function (item) {
               arrayProductId.push(item.product_id);
            });
            return arrayProductId;
        }

        function isCartEmpty() {
            var cart = getCart();
            return (cart.length == 0);
        }

        function getCartProductQuantity(productId) {
            var cart = getCart();
            var quantity = 1;
            angular.forEach(cart, function (item) {
               if (item.product_id == productId) {
                   quantity = item.quantity;
               }
            });
            return quantity;
        }

        function calculateCartTotalPrice() {
            var cart = getCart();
            var totalPrice = 0;
            angular.forEach(cart, function (item) {
                totalPrice += item.quantity * item.price;
            });
            return totalPrice;
        }

        return {
            getCart: getCart,
            addItemToCart: addItemToCart,
            updateCartItem: updateCartItem,
            countCartItems: countCartItems,
            getCartProducts: getCartProducts,
            isCartEmpty: isCartEmpty,
            getCartProductQuantity: getCartProductQuantity,
            calculateCartTotalPrice: calculateCartTotalPrice
        }
    }

})();