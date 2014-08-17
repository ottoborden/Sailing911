angular.module('sidebar')
    .directive('sidebarDirective', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/public/sidebar/sidebar.html'
        }
}]);