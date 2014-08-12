angular.module('navbar')
    .controller('navbarController', ['$scope', '$http', 'RestService', function($scope, $http, RestService) { 'use strict';
        var query = {'q': 'SELECT * FROM tblCategories'};
        RestService.fetch(query).then(function(res) {
            if(res.data) {
                $scope.categories = res.data;
            } else {
                console.log('Failed to get categories in navbarController');
            }
        });
        query = {'q': 'SELECT * FROM tblRegions'};
        RestService.fetch(query).then(function(res) {
            if(res.data) {
                $scope.regions = res.data;
            } else {
                console.log('Failed to get regions in navbarController');
            }
        });
}]);