angular.module('home')
    .controller('homeController',
    ['$scope', 'RestService', function($scope, RestService) { 'use strict';
        $scope.wpUrl = RestService.wpUrl;
}]);