angular.module('map').directive('mapDirective', [function () {
    function link(scope, element, attrs) {
        jQuery(document).ready(function() {
            jQuery('#vmap').vectorMap({ map: 'usa_en' });
        });
    }

    return  {
        restrict: 'AE',
        link: link,
        templateUrl: 'app/public/map/map.html'
    }
}]);