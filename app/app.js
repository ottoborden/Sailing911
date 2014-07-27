angular.module('Sailing911', [
    'ngRoute',
    'lodash',
    'navbar',
    //'sidebar',
    'home',
    'category',
    'company'
]);

angular.module('lodash', []).factory('lodashService', [function() {
    var _;
    return _;
}]);