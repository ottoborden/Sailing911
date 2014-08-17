angular.module('sidebar')
    .controller('sidebarController', ['$scope', '$http', 'RestService', function($scope, $http, RestService) { 'use strict';
        var query = {'q': 'SELECT * FROM tblCategories'};
        RestService.fetch(query).then(function(res) {
            $scope.categories = res.data;
        });
}]);