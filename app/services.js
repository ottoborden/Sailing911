angular.module('Sailing911')
    .service('s911Services', ['$rootScope', 'RestService', 'lodashService', function($rootScope, RestService, lodashService) {
        $rootScope.$on('categoryChange', function(evt, data) {
            //console.log('categoryChange emitted');
            if(data.id != s911Services.currCategoryId) {
                //console.log('categoryChanged broadcasted');
                s911Services.currCategoryId = data.id;
                $rootScope.$broadcast('categoryChanged', {
                    newCat: s911Services.currCategoryId
                });
                //console.log('s911Services.currCategoryId = ' + s911Services.currCategoryId);
            }
        });

        $rootScope.$on('stateChange', function(evt, data) {
            //console.log('stateChange emitted');
            if(data.abbrev != s911Services.currStateAbbrev) {
                //console.log('stateChanged broadcasted');
                s911Services.currStateAbbrev = data ? data.abbrev : null;
                s911Services.currStateName = data ? data.state : null;
                $rootScope.$broadcast('stateChanged', {
                    newStateAbbrev: s911Services.currStateAbbrev,
                    newStateName: s911Services.currStateName
                });
                //console.log('s911Services.currStateAbbrev = ' + s911Services.currStateAbbrev);
            }
        });

        s911Services = function(){};

        s911Services.getCategoryName = function(catId) {
            var query = {'q': 'SELECT category FROM tblCategories WHERE id = \'' + catId + '\''};
            return RestService.fetch(query);
        };

        s911Services.currStateName = null;
        s911Services.currStateAbbrev = null;
        s911Services.currCategoryId = null;

        return s911Services;
    }]);