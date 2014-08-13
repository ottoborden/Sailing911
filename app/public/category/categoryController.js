angular.module('category')
    .controller('categoryController', ['$scope', '$http', 'RestService', '$routeParams',
        function($scope, $http, RestService, $routeParams) { 'use strict';
            $scope.categoryId = $routeParams.categoryId;
            var query = {'q': 'SELECT tC.id, tC.company_name FROM tblCompanies tC INNER JOIN tblCategoriesCompanies ON ' +
                        'tblCategoriesCompanies.company_id = tC.id WHERE tblCategoriesCompanies.category_id = ' +
                        $scope.categoryId};
            RestService.fetch(query).then(function(res) {
                $scope.categoryCompanies = res.data;
            });
            query = {'q': 'SELECT * FROM tblCategories WHERE id = ' + $scope.categoryId};
            RestService.fetch(query).then(function(res) {
                $scope.categoryName = res.data[0].category;
            });
}]);