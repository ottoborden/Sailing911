angular.module('region')
    .directive('regionDirective', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/region/region.html'
        }
}]);