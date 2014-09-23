angular.module('sidebar')
    .controller('sidebarController', ['$scope', '$http', 's911Services', 'RestService',
        function($scope, $http, s911Services, RestService) { 'use strict';
            $scope.currId = null;
            $scope.activeCategory = null;
            var query = {'q': 'SELECT * FROM tblCategories'};
            RestService.fetch(query).then(function(res) {
                $scope.categories = res.data;
            });

            $scope.setCategoryId = function(cat) {
                $scope.$emit('categoryChange', cat);
            };

            $scope.setActiveCategory = function(catObj) {
                $scope.activeCategory = catObj;
            };
    }]);