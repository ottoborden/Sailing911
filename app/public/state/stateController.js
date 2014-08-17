angular.module('state')
    .controller('stateController', ['$scope', '$routeParams', 's911Services', 'RestService', function($scope, $routeParams, s911Services, RestService) {
        var query = {'q': 'SELECT * FROM tblCompanies WHERE state = \'' + $routeParams.stateAbbrev + '\''};
        RestService.fetch(query).then(function(res) {
            $scope.companies = res.data;
            if(s911Services.currStateName) {
                $scope.stateName = s911Services.currStateName;
            }
        });
    }]);