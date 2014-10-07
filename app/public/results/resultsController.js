angular.module('results')
    .controller('resultsController', ['$scope', '$route', '$location', 's911Services', 'RestService', 'lodashService',
        function($scope, $route, $location, s911Services, RestService, lodashService) {
            $scope.companies = [];
            $scope.both = false;
            $scope.showing = null;
            $scope.currCategory = '';
            $scope.currStateName = s911Services.currStateName;
            var q = '';
            $scope.searchTerm = 'Search for';

            $scope.$on('categoryChanged', function(evt, data) {
                //console.log('categoryChanged caught');
            });
            $scope.$on('stateChanged', function(evt, data) {
                //console.log('stateChanged caught');
            });

            if(s911Services.currCategoryId && s911Services.currStateAbbrev) {
                $scope.both = true;
                $scope.showing = false;
                getCategoryName();
                q = {'q': 'SELECT tC.id, tC.company_name, tC.city, tC.state ' +
                    'FROM tblCompanies tC ' +
                    'JOIN tblCategoriesCompanies tCC ON tCC.company_id = tC.id ' +
                    'WHERE tCC.category_id = \'' + s911Services.currCategoryId + '\' AND state = \'' + s911Services.currStateAbbrev + '\''};
                RestService.fetch(q).then(function(res) {
                    _.forEach(res.data, function(item) {
                        $scope.companies.push(item);
                    });
                });
            } else if(s911Services.currCategoryId && !s911Services.currStateAbbrev) {
                $scope.showing = 'category';
                getCategoryName();
                q = {'q': 'SELECT tC.id, tC.company_name, tC.city, tC.state ' +
                    'FROM tblCompanies tC ' +
                    'JOIN tblCategoriesCompanies tCC ON tCC.company_id = tC.id ' +
                    'WHERE tCC.category_id = \'' + s911Services.currCategoryId + '\''};
                RestService.fetch(q).then(function(res) {
                    _.forEach(res.data, function(item) {
                        $scope.companies.push(item);
                    });
                });
                q = {'q': 'SELECT category FROM tblCategories WHERE id = \'' + s911Services.currCategoryId + '\'' };
                RestService.fetch(q).then(function(res) {
                    $scope.currCategory = res.data[0].category;
                });
            } else if(s911Services.currStateAbbrev && !s911Services.currCategoryId ) {
                $scope.showing = 'state';
                getCategoryName();
                q = {'q': 'SELECT id, company_name, city, state FROM tblCompanies WHERE state = \'' + s911Services.currStateAbbrev + '\''};
                RestService.fetch(q).then(function(res) {
                    _.forEach(res.data, function(item) {
                        $scope.companies.push(item);
                    });
                });
            } else {
                // Nothing selected || search
                if(s911Services.search) {
                    q = {'q': "SELECT id, company_name, city, state, description " +
                        "FROM tblCompanies " +
                        "WHERE description LIKE '%" + s911Services.searchTerm + "%' OR company_name LIKE '%" + $scope.searchTerm + "%' " +
                        "GROUP BY description " +
                        "ORDER BY CASE WHEN description LIKE '$" + $scope.searchTerm + "%' THEN 0 " +
                        "WHEN description LIKE '% %" + $scope.searchTerm + "% %' THEN 1 " +
                        "WHEN description LIKE '%" + $scope.searchTerm + "' THEN 2 " +
                        "ELSE 3 " +
                        "END, description"};
                    console.log(q);
                    RestService.fetch(q).then(function(res) {
                        _.forEach(res.data, function(item) {
                            $scope.companies.push(item);
                        });
                        console.log($scope.companies);
                    });
                } else {

                }
            }

            function getCategoryName() {
                var q = {q: 'SELECT category FROM tblCategories WHERE id = \'' + s911Services.currCategoryId + '\''};
                RestService.fetch(q).then(function(res) {
                    if(res.data[0]) {
                        $scope.currCategory = res.data[0].category;
                    } else {
                        $scope.currCategory = res.data[0];
                    }
                });
            };

            $scope.doSearch = function() {
                $scope.$emit('categoryChange', {id: null});
                $scope.$emit('stateChange', {
                    abbrev: null,
                    state: null
                });
                $scope.$emit('search', $scope.searchTerm);
                $location.path('/results/' + $scope.searchTerm);
            }
    }]);