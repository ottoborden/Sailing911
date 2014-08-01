angular.module('category')
    .directive('categoryDirective', [function() { 'use strict';
        return {
            restrict: 'E',
            templateUrl: 'app/public/category/category.html'
        }
}]);