angular.module('region')
    .controller('regionController', ['$scope', '$http', '$routeParams', 'RestService', function($scope, $http, $routeParams, RestService) { 'use strict';
        $scope.regionId = $routeParams.regionId;
        var query = {'q': 'SELECT * FROM tblRegions WHERE id=' + $routeParams.regionId};
        RestService.fetch(query).then(function(res) {
            $scope.region = res.data[0];
            query = {'q': 'SELECT * FROM tblCompanies WHERE region=\'' + $scope.region.region + '\''};
            RestService.fetch(query).then(function(res) {
                $scope.companies = res.data;
            });
        });
}]);