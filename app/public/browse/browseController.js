angular.module('browse')
    .controller('browseController', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {
        $scope.showResults = false;
        $scope.results = [];
        var query = {'q': 'SELECT * FROM tblCategories'};
        RestService.fetch(query).then(function(res) {
            $scope.categories = res.data;
        });
        query = {'q': 'SELECT * FROM tblRegions'};
        RestService.fetch(query).then(function(res) {
            $scope.regions = res.data;
        });

        $scope.getResults = function() {
            $scope.showResults = false;
            $scope.results.length = 0;
            $scope.currRegion = $scope.currRegion;
            $scope.currCategory = $scope.currCategory;

            var queries = [
                {'q': 'SELECT id "ID" ' +
                'FROM tblCompanies tC ' +
                'WHERE tC.region = \'' + $scope.currRegion + '\''},

                {'q': 'SELECT company_id "ID" ' +
                'FROM tblCategoriesCompanies tCC ' +
                'WHERE tCC.category_id = \'' + $scope.currCategory + '\''}
            ];

            RestService.getBrowseQueries(queries).then(function (returnValues) {
                var comps = _.intersection(_.pluck(returnValues[0].data, 'ID'), _.pluck(returnValues[1].data, 'ID'));

                if(comps.length > 0) {
                    var numResults = 0;
                    _.forEach(comps, function(item) {
                        query = {'q': 'SELECT * FROM tblCompanies WHERE id = \'' + item +'\''};
                        RestService.fetch(query).then(function(res) {
                            $scope.results.push(res.data[0]);
                            numResults++;
                            if(numResults === comps.length) {
                                $scope.showResults = true;
                            }
                        });
                    });
                } else {
                    // Found nothing?
                }
            });
        }
    }]);