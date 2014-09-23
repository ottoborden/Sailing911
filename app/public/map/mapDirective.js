angular.module('map').directive('mapDirective', ['s911Services', 'RestService', function (s911Services, RestService) {
    function link(scope, element, attrs) {
        jQuery(document).ready(function() {
            jQuery('#vmap').vectorMap({
                map: 'usa_en',
                backgroundColor: null,
                color: '#ffffff',
                hoverOpacity: 0.7,
                selectedColor: '#666666',
                enableZoom: true,
                showTooltip: true,
                scaleColors: ['#C8EEFF', '#006491'],
                normalizeFunction: 'polynomial',
                onRegionClick: function(element, abbrev, state) {
                    scope.$emit('stateChange', {
                        abbrev: abbrev,
                        state: state
                    });
                    window.location.href = RestService.activeUrl + '/results/' + encodeURIComponent(abbrev);
                }
            });
        });
    }

    return  {
        restrict: 'AE',
        link: link,
        templateUrl: 'app/public/map/map.html'
    }
}]);