angular.module('footer')
    .directive('footerDirective', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/public/footer/footer.html'
        }
    }]);