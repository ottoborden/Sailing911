angular.module('sidebar')
    .controller('sidebarController', ['$scope', '$http', 'RestService', function($scope, $http, RestService) { 'use strict';
        $scope.currId = null;
        var query = {'q': 'SELECT * FROM tblCategories'};
        RestService.fetch(query).then(function(res) {
            $scope.categories = res.data;
        });

        $scope.setCategoryId = function(cat) {
            s911Services.setCurrCategoryId(cat.id);
        };
}]);