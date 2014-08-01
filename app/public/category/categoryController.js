angular.module('category')
    .controller('categoryController', ['$scope', '$http', 'lodashService', '$routeParams',
        function($scope, $http, lodashService, $routeParams) { 'use strict';
            $scope.categoryId = $routeParams.categoryId;
            var query = 'SELECT tC.id, tC.company_name FROM tblCompanies tC INNER JOIN tblCategoriesCompanies ON ' +
                        'tblCategoriesCompanies.company_id = tC.id WHERE tblCategoriesCompanies.category_id = ' +
                        $scope.categoryId;
            $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
                $scope.categoryCompanies = data;
            })
            .error(function(err) {
                console.log('Error fetching categories from categoryController @ GET.php');
                console.log(err);
            });
            query = 'SELECT * FROM tblCategories WHERE id = ' + $scope.categoryId;
            $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
                $scope.categoryName = data[0].category;
            })
            .error(function(err) {
                console.log('Error getting category name in categoryController');
            });
}]);