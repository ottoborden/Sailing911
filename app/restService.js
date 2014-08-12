angular.module('Sailing911')
    .service('RestService', ['$http', '$q', function($http, $q) {
        var RestService = function(){};
        RestService.postUrl = 'app/private/REST/POST.php';

        RestService.fetch = function(query) {
            return $http.post(RestService.postUrl, query);
        };

        RestService.getBrowseQueries = function(queries) {
            return $q.all([
                $http.post(RestService.postUrl, queries[0]),
                $http.post(RestService.postUrl, queries[1])
            ]);
        };

        return RestService;
    }]);