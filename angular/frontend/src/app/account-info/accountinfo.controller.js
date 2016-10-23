(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AccountInfoController', AccountInfoController);


    AccountInfoController.$inject = ['$scope', 'commonService'];

    /** @ngInject */
    function AccountInfoController($scope, commonService) {
        $scope.account = {
            city_province_id: ''
        };

        commonService.loadData('cities-provinces', null, function (response) {
            var cities_provinces = [];
            cities_provinces.push({id: '', name: '---Chọn Tỉnh/Thành phố---'});
            angular.forEach(response.data, function (city_province) {
                cities_provinces.push(city_province);
            });
            $scope.cities_provinces = cities_provinces;
        });
    }

})();