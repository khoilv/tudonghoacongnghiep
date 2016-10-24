(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('AccountInfoController', AccountInfoController);


    AccountInfoController.$inject = ['$scope', '$location', '$http', 'uibDateParser', 'commonService', 'customerService', 'API_URL'];

    /** @ngInject */
    function AccountInfoController($scope, $location, $http, uibDateParser, commonService, customerService, API_URL) {
        $scope.datePicker = {
            opened: false,
            dateFormat: 'dd/MM/yyyy',
            altInputFormats: ['dd/MM/yyyy', 'yyyy-MM-dd'],
            datePickerOptions: {
                language: 'vi',
                formatYear: 'yyyy',
                maxDate: new Date(),
                minDate: new Date(1940, 12, 22),
                startingDay: 1
            }
        };
        $scope.sexOptions = [
            {id: 0, name: 'Nữ'},
            {id: 1, name: 'Nam'}
        ];
        $scope.account = {
            birth_date: null,
            city_province_id: ''
        };

        initCitiesProvinces();
        initAccountInfo();

        $scope.openDatePicker = function () {
            $scope.datePicker.opened = true;
        };

        $scope.cancel = function () {
            $location.path('/tai-khoan-cua-toi');
        };

        function initCitiesProvinces() {
            commonService.loadData('cities-provinces', null, function (response) {
                var cities_provinces = [];
                cities_provinces.push({id: '', name: '---Chọn Tỉnh/Thành phố---'});
                angular.forEach(response.data, function (city_province) {
                    cities_provinces.push(city_province);
                });
                $scope.cities_provinces = cities_provinces;
            });
        }

        function initAccountInfo() {
            var url = 'customers/' + customerService.getCustomerId() + '/edit';
            commonService.loadData(url, null, function (response) {
                $scope.account = response.data;
                $scope.account.birth_date = uibDateParser.parse($scope.account.birth_date, 'yyyy-mm-dd', new Date());
            });

        }
    }

})();