angular.module('company')
    .controller('companyController', ['$scope', '$http', '$routeParams', 'lodashService',
        function($scope, $http, $routeParams, lodashService) { 'use strict';
            $scope.init = false;
            $scope.companyId = $routeParams.companyId;
            var query = 'SELECT * FROM tblCompanies WHERE id = ' + $scope.companyId;
            $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
                $scope.company = data[0];
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
            })
            .error(function(err) {
                console.log('Error fetching company from companyController @ GET.php');
                console.log(err);
            });
}]);