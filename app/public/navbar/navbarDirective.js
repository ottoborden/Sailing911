angular.module('navbar')
    .directive('navbarDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/navbar/navbar.html'
        }
});