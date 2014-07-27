angular.module('region')
    .controller('regionController', ['$scope', '$http', function($scope, $http) {
        $scope.regionId = $routeParams.regionId;
        var query = 'SELECT tC.id, tC.company_name FROM tblCompanies tC INNER JOIN tblCategoriesCompanies ON ' +
            'tblCategoriesCompanies.company_id = tC.id WHERE tblCategoriesCompanies.category_id = ' +
            $scope.regionId;
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.regionCompanies = data;
        })
        .error(function(err) {
            console.log('Error fetching categories from categoryController @ GET.php');
            console.log(err);
        });
}]);