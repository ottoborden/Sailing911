angular.module('Sailing911')
    .controller('previewcontroller', ['$scope', 'RestService', function($scope, RestService) {
        var query = {'q': 'SELECT * FROM tblCategories'};
        RestService.fetch(query).then(function(res) {
            $scope.categories = res.data;
            console.log($scope.categories);
        });

        var query = {'q': 'SELECT * FROM tblCompanies'};
        RestService.fetch(query).then(function(res) {
            $scope.companies = res.data;
            console.log($scope.companies);
        });

        var query = {'q': 'SELECT * FROM tblRegions'};
        RestService.fetch(query).then(function(res) {
            $scope.regions = res.data;
            console.log($scope.regions);
        });
    }]);