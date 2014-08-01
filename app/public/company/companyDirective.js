angular.module('company')
    .directive('companyDirective', [function() { 'use strict';
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'app/public/company/company.html'
        }
}]);