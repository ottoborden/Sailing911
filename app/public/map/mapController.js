angular.module('map')
    .controller('mapController', ['$scope', '$http', function($scope, $http) {
        $http.get('app/public/map/map.svg').success(function(data) {
            $scope.svgData = data;
        })
        .error(function(err) {
            console.log('Error getting map.svg in mapController');
        });
}]);