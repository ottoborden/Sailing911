angular.module('navbar')
    .controller('navbarController', ['$scope', '$http', function($scope, $http) { 'use strict';
        var query = {'q': 'SELECT * FROM tblCategories'};
        $http.post('app/private/REST/POST.php', query).success(function(data) {
            $scope.categories = data;
            console.log(data);
        })
        .error(function(err) {
            console.log('Error fetching categories from navbarController @ GET.php');
            console.log(err);
        });
        query = 'SELECT * FROM tblRegions';
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.regions = data;
        })
        .error(function(err) {
            console.log('Error fetching regions from navbarController @ GET.php');
            console.log(err);
        });
}]);