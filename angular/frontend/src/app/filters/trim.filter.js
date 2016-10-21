(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .filter('trim', function () {
            return function (value) {
                if (!angular.isString(value)) {
                    return value;
                }

                return (!value) ? '' : value.replace(/^\s+|\s+$/g, '');
            };
        });

})();