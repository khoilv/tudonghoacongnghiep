
(function() {
    'use strict';
    angular.
    module('badgeMakerApp').
    factory('notify', ['$window', function(win) {
       var msgs = [];
       console.log('Notify From Service');
       return function(msg) {
          console.log(msg);
       };
     }]);

})();