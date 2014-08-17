angular.module('results')
    .directive('resultsDirective', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/public/results/results.html'
        }
    }]);