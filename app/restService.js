angular.module('Sailing911')
    .service('RestService', ['$http', '$q', function($http, $q) {
        var RestService = function(){};

        RestService.activeUrl = 'http://localhost/Sailing911/index.html#';
        //RestService.activeUrl = 'http://test.sailing911.com/test/index.html#';

        RestService.postUrl = 'app/private/REST/POST.php';

        RestService.fetch = function(query) {
            return $http.post(RestService.postUrl, query);
        };

        RestService.getMapData = function(path) {
            return $http.get(path);
        }

        RestService.getBrowseQueries = function(queries) {
            var qs = [];
            _.forEach(queries, function(item) {
                qs.push($http.post(RestService.postUrl, item));
            });
            return $q.all(qs);
        };

        return RestService;
    }]);