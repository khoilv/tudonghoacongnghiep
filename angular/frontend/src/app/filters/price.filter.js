(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .filter('price', ['$log', function ($log) {

            return function (price) {
                if (isNaN(price) || price == '') { return 0; }
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            };
    }]);

})();