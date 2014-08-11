angular.module('region')
    .controller('regionController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) { 'use strict';
        $scope.regionId = $routeParams.regionId;
        var query = 'SELECT * FROM tblRegions';
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.regions = data;
        })
        .error(function(err) {
            console.log('Error fetching categories from regionController @ GET.php');
            console.log(err);
        });
}]);