angular.module('Sailing911', [
    'ngRoute',
    'lodash',
    'navbar',
    'sidebar',
    'home',
    'company',
    'map',
    'results',
    'contact'
]);

angular.module('lodash', []).factory('lodashService', [function() {
    var _;
    return _;
}]);

angular.module('d3', []).factory('d3Service', [function() {
    var d3;
    return d3;
}]);