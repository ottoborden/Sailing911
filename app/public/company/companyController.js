angular.module('company')
    .controller('companyController', ['$scope', '$http', '$routeParams', 'RestService',
        function($scope, $http, $routeParams, RestService) { 'use strict';
            $scope.init = false;
            $scope.companyId = $routeParams.companyId;
            var query = {'q': 'SELECT * FROM tblCompanies WHERE id = ' + $scope.companyId};
            RestService.fetch(query).then(function(res) {
                $scope.company = res.data[0];
                console.log($scope.company);
                if(!$scope.company.company_url) {
                    $scope.company.noUrl = true;
                }
                else if(_.contains($scope.company.company_url, 'http://') === false) {
                    $scope.company.company_url = ('http://' + $scope.company.company_url).toLowerCase();
                    $scope.company.noUrl = false;
                }
                else {
                    $scope.company.noUrl = false;
                }

                $scope.init = true;
            });
}]);