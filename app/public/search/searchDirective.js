angular.module('search')
    .directive('searchDirective', [function() {
        return {
            restrict: 'AE',
            controller: 'resultsController',
            templateUrl: 'app/public/search/search.html'
        }
    }]);