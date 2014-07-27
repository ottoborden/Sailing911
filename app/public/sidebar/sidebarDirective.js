angular.module('sidebar')
    .directive('sidebarDirective', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/sidebar/sidebar.html'
        }
}]);