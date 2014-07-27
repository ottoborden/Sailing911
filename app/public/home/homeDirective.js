angular.module('home')
    .directive('homeDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/home/home.html'
        }
    });