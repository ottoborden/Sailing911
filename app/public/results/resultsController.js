angular.module('results')
    .controller('resultsController', ['$scope', '$routeParams', 's911Services', 'RestService', 'lodashService',
        function($scope, $routeParams, s911Services, RestService, lodashServices) {
            $scope.compsAndCats = true;
            if(s911Services.currCategoryId && s911Services.currStateAbbrev) {
                $scope.compsAndCats = true;
                s911Services.getCategoryName(s911Services.currCategoryId).then(function(res) {
                    s911Services.currCategoryName = res.data[0];
                });
                var q = [{'q': 'SELECT id "ID" FROM tblCompanies WHERE state = \'' + s911Services.currStateAbbrev + '\''},
                        {'q': 'SELECT company_id "ID" FROM tblCategoriesCompanies WHERE category_id = \'' + s911Services.currCategoryId + '\''}
                ];
                RestService.multipleQueries(q).then(function(res) {
                    var p, t;
                    p = _.pluck(res[0].data, 'ID');
                    t = _.pluck(res[1].data, 'ID');
                    var comps = _.intersection(p, t);

                    $scope.companies.length = 0;
                    _.forEach(comps, function(item) {
                        q = {'q': 'SELECT id, company_name, city, state FROM tblCompanies WHERE id = \'' + item + '\''};
                        RestService.fetch(q).then(function(res) {
                            $scope.companies.push(res.data[0]);
                        });
                    });
                });
            }
    }]);