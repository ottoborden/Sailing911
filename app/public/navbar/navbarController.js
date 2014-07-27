angular.module('navbar')
    .controller('navbarController', ['$scope', '$http', function($scope, $http) { 'use strict';
        var query = 'SELECT * FROM tblCategories';
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.categories = data;
        })
        .error(function(err) {
            console.log('Error fetching data from navbarController @ GET.php');
            console.log(err);
        });
}]);