angular.module('results')
    .controller('resultsController', ['$scope', '$routeParams', 's911Services', 'RestService', 'lodashService',
        function($scope, $routeParams, s911Services, RestService, lodashServices) {
            $scope.companies = [];
            $scope.both = false;
            $scope.showing = null;

            $scope.$watch(s911Services.currCategoryId, function(newVal, oldVal) {
                $scope.updateResults(newVal);
            });
            $scope.$watch(s911Services.currStateAbbrev, function(newVal, oldVal) {
                $scope.updateResults(newVal);
            });

            $scope.updateResults = function(newVal) {
                console.log(newVal);
            };

            if(s911Services.currCategoryId !== null && s911Services.currStateAbbrev !== null) {
                $scope.both = true;

                $scope.currStateName = s911Services.currStateName;
                s911Services.getCategoryName(s911Services.currCategoryId).then(function(res) {
                    s911Services.updateCurrState([
                        {key: 'currCategoryName', val: res.data[0].category}
                    ]);
                    $scope.currCategoryName = res.data[0].category;
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
            } else {
                $scope.both = false;
                if(s911Services.currCategoryId) {
                    $scope.showing = 'category';
                    s911Services.getCategoryName(s911Services.currCategoryId).then(function(res) {
                        s911Services.updateCurrState([
                            {key: 'currCategoryName', val: res.data[0].category}
                        ]);
                        $scope.currCategoryName = res.data[0].category;
                    });
                    RestService.getCompaniesByCategoryId(s911Services.currCategoryId).then(function(res) {
                        $scope.companies = res.data;
                    });
                } else if(s911Services.currStateAbbrev) {
                    $scope.showing = 'state';
                    $scope.stateName = s911Services.currStateName;
                    RestService.getCompaniesByState(s911Services.currStateAbbrev).then(function(res) {
                        $scope.companies = res.data;
                    });
                } else {

                }
            }
    }]);