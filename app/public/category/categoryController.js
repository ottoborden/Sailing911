angular.module('category')
    .controller('categoryController', ['$scope', '$http', 's911Services', 'RestService', '$routeParams',
        function($scope, $http, s911Services, RestService, $routeParams) { 'use strict';
            $scope.categoryId = $routeParams.categoryId;
            var query = {'q': 'SELECT tC.id, tC.company_name FROM tblCompanies tC INNER JOIN tblCategoriesCompanies ON ' +
                        'tblCategoriesCompanies.company_id = tC.id WHERE tblCategoriesCompanies.category_id = ' +
                        $scope.categoryId};
            RestService.fetch(query).then(function(res) {
                s911Services.currCategoryId = $scope.categoryId;
                s911Services.currCategory = s911Services.getCategoryName($scope.categoryId).then(function(res) {
                    s911Services.currCategory = res.data[0].category;
                    $scope.categoryName = res.data[0].category;
                });
                $scope.companies = res.data;
            });
}]);