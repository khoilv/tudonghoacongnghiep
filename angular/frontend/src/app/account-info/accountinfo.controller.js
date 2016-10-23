(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AccountInfoController', AccountInfoController);


    AccountInfoController.$inject = ['$scope', '$location', 'commonService'];

    /** @ngInject */
    function AccountInfoController($scope, $location, commonService) {
        $scope.datePicker = {
            opened: false,
            dateFormat: 'dd/MM/yyyy',
            altInputFormats: ['dd/MM/yyyy'],
            datePickerOptions: {
                language: 'vi',
                formatYear: 'yyyy',
                maxDate: new Date(),
                minDate: new Date(1940, 12, 22),
                startingDay: 1
            }
        };
        $scope.account = {
            birth_date: null,
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

        $scope.openDatePicker = function () {
            $scope.datePicker.opened = true;
        };

        $scope.cancel = function () {
            $location.path('/tai-khoan-cua-toi');
        }
    }

})();