angular.module('Sailing911')
    .service('RestService', ['$http', '$q', function($http, $q) {
        var RestService = function(){};

        RestService.activeUrl = 'http://localhost/Sailing911/index.html#';
        //RestService.activeUrl = 'http://test.sailing911.com/test/index.html#';

        RestService.postUrl = 'app/private/REST/POST.php';

        RestService.fetch = function(query) {
            return $http.post(RestService.postUrl, query);
        };

        RestService.getCompaniesByCategoryId = function(categoryId) {
            return RestService.fetch({
                'q': 'SELECT tC.id, tC.company_name, tC.state, tC.city FROM tblCompanies tC INNER JOIN tblCategoriesCompanies ON ' +
                    'tblCategoriesCompanies.company_id = tC.id WHERE tblCategoriesCompanies.category_id = ' +
                    categoryId });
        };

        RestService.getCompaniesByState = function(stateAbbrev) {
            return RestService.fetch({
                'q': 'SELECT * FROM tblCompanies WHERE state = \'' + stateAbbrev + '\''
            });
        };

        RestService.getMapData = function(path) {
            return $http.get(path);
        };

        RestService.multipleQueries = function(queries) {
            var qs = [];
            _.forEach(queries, function(item) {
                qs.push($http.post(RestService.postUrl, item));
            });
            return $q.all(qs);
        };

        return RestService;
    }]);