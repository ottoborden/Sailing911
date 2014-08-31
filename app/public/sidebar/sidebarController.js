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
                if(cat === null) {
                    cat = {};
                    cat.id = null;
                    s911Services.updateCurrState([
                        { key: 'currCategoryId', val: cat.id }
                    ]);
                    // Reload results page with all results in state or display page telling them to select something
                    if(s911Services.currStateAbbrev != null) {
                        window.location.href = '#/state/' + s911Services.currStateAbbrev;
                    } else {
                        window.location.href = '#/';
                    }
                } else {
                    s911Services.updateCurrState([
                        { key: 'currCategoryId', val: cat.id }
                    ]);
                }
            };

            $scope.setActiveCategory = function(catObj) {
                $scope.activeCategory = catObj;
            };
    }]);