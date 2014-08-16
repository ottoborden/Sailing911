angular.module('map')
    .controller('mapController', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {
        RestService.getMapData('vendor/jqvmap/jqvmap/data/jquery.vmap.sampledata.js').then(function(res) {
            if(res.statusText !== 'OK') {
                console.log('Failed to get map data');
            }
            else {
                $scope.mapData = res.data;
            }
        });
}]);