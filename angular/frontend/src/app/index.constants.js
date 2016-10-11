/* global malarkey:false, toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .constant('API_URL', 'http://localhost:8000/api/')
        .constant('malarkey', malarkey)
        .constant('toastr', toastr)
        .constant('moment', moment);

})();