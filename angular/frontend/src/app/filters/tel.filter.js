(function () {
    'use strict';

    angular
        .module('angularSeedApp')
        .filter('tel', ['$log', function ($log) {

            return function (tel) {
                if (!tel) { return ''; }

                var value = tel.toString().trim().replace(/^\+/, '');

                if (value.match(/[^0-9]/)) {
                    return tel;
                }

                var n1, n2, n3, number;

                switch (value.length) {
                    case 10:
                        n1 = value.slice(0, 4);
                        n2 = value.slice(4, 7);
                        n3 = value.slice(7, 10);
                        break;
                    case 11:
                        n1 = value.slice(0, 5);
                        n2 = value.slice(5, 8);
                        n3 = value.slice(8, 11);
                        break;
                    default:
                        return tel;
                }

                number = n1 + '.' + n2 + '.' + n3;

                return number;
            };
    }]);

})();