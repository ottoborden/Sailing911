angular.module('category')
    .directive('categoryDirective', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/category/category.html'
        }
}]);