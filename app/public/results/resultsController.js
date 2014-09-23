angular.module('results')
    .controller('resultsController', ['$scope', '$routeParams', 's911Services', 'RestService', 'lodashService',
        function($scope, $routeParams, s911Services, RestService, lodashService) {
            $scope.companies = [];
            $scope.both = false;
            $scope.showing = null;
            $scope.resultsHeader = '<em>header</em>';

            $scope.$on('categoryChanged', function(evt, data) {
                console.log('categoryChanged caught');
                updateResults(evt, data);
            });
            $scope.$on('stateChanged', function(evt, data) {
                console.log('stateChanged caught');
                updateResults(evt, data);
            });

            function updateResults(evt, data) {
                console.log('update');
                if(s911Services.currCategoryId && s911Services.currStateAbbrev) {
                    $scope.both = true;
                } else if(s911Services.currCategoryId && !s911Services.currStateAbbrev) {
                    console.log('category only');
                    var q = {'q': 'SELECT tC.id, tC.company_name, tC.city, tC.state ' +
                        'FROM tblCompanies tC ' +
                        'JOIN tblCategoriesCompanies tCC ON tCC.company_id = tC.id ' +
                        'WHERE tCC.category_id = \'' + s911Services.currCategoryId + '\''};
                    RestService.fetch(q).then(function(res) {
                        _.forEach(res.data, function(item) {
                            $scope.companies.push(item);
                        });
                    });
                } else if(!s911Services.currCategoryId && s911Services.currStateAbbrev) {
                    console.log('state only');
                    var q = {'q': 'SELECT id, company_name, city, state FROM tblCompanies WHERE state = \'' + s911Services.currStateAbbrev + '\''};
                    RestService.fetch(q).then(function(res) {
                        _.forEach(res.data, function(item) {
                            $scope.companies.push(item);
                        });
                    });
                } else {
                    // Nothing selected
                }
            };
    }]);