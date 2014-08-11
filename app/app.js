angular.module('Sailing911', [
    'ngRoute',
    'lodash',
    'navbar',
    'sidebar',
    'home',
    'category',
    'region',
    'company',
    'map',
    'browse'
]);

angular.module('lodash', []).factory('lodashService', [function() {
    var _;
    return _;
}]);

angular.module('d3', []).factory('d3Service', [function() {
    var d3;
    return d3;
}]);

angular.module('Sailing911').service('BrowseQueries', ['$http', '$q', function($http, $q) {
    return {
        getBrowseQueries: function(queries) {
            return $q.all([
                $http.get('app/private/REST/GET.php?q=' + queries[0]),
                $http.get('app/private/REST/GET.php?q=' + queries[1])
            ])
        }
    }
}]);