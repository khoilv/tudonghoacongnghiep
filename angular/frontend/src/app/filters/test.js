
(function() {
    'use strict';
    angular.
    module('angularSeedApp').
    filter('notify', ['$window', function(win) {
       console.log('Notify From filter');
       return function(value) {
          return 123;
       };
     }]);

})();