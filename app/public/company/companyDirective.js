angular.module('company')
    .directive('companyDirective', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/public/company/company.html'
        }
}]);