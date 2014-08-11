angular.module('browse')
    .controller('browseController', ['$scope', '$http', 'BrowseQueries', function($scope, $http, BrowseQueries) {
        $scope.showResults = false;
        $scope.results = [];
        var query = 'SELECT * FROM tblCategories';
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.categories = data;
        })
        .error(function(err) {
            console.log('Error fetching categories from browseController @ GET.php');
            console.log(err);
        });
        query = 'SELECT * FROM tblRegions';
        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
            $scope.regions = data;
        })
        .error(function(err) {
            console.log('Error fetching regions from browseController @ GET.php');
            console.log(err);
        });

        $scope.getResults = function() {
            $scope.showResults = false;
            $scope.results.length = 0;
            $scope.currRegion = $scope.currRegion;
            $scope.currCategory = $scope.currCategory;

            var queries = [
                    'SELECT id "ID" ' +
                    'FROM tblCompanies tC ' +
                    'WHERE tC.region = \'' + $scope.currRegion + '\'',
                    'SELECT company_id "ID" ' +
                    'FROM tblCategoriesCompanies tCC ' +
                    'WHERE tCC.category_id = \'' + $scope.currCategory + '\''
            ];

            BrowseQueries.getBrowseQueries(queries).then(function (returnValues){
                var comps = _.intersection(_.pluck(returnValues[0].data, 'ID'), _.pluck(returnValues[1].data, 'ID'));

                if(comps.length > 0) {
                    var numResults = 0;
                    _.forEach(comps, function(item) {
                        query = 'SELECT * FROM tblCompanies WHERE id = \'' + item +'\'';
                        $http.get('app/private/REST/GET.php?q=' + query).success(function(data) {
                            $scope.results.push(data[0]);
                            numResults++;
                            if(numResults === comps.length) {
                                $scope.showResults = true;
                                console.log($scope.results);
                            }
                        })
                            .error(function(err) {
                                console.log('Error fetching results from browserController @ GET.php');
                                console.log(err);
                            });
                    });
                } else {

                }
            });
        }
    }]);