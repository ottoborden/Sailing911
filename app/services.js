angular.module('Sailing911')
    .service('s911Services', ['RestService', 'lodashService', function(RestService, lodashService) {
        s911Services = function(){};

        s911Services.getCategoryName = function(catId) {
            var query = {'q': 'SELECT category FROM tblCategories WHERE id = \'' + catId + '\''};
            return RestService.fetch(query);
        };

        s911Services.setCurrCategoryId = function(catId) {
            if(catId) {
                s911Services.currCategoryId = catId;
            } else {
                s911Services.currCategoryId = null;
            }
        };

        s911Services.updateCurrState = function(updateArr) {
            _.forEach(updateArr, function(item) {
                s911Services[item.key] = item.val;
            });
        };

        s911Services.currStateName = null;
        s911Services.currStateAbbrev = null;
        s911Services.currCategoryId = null;
        s911Services.currCategoryName = null;

        return s911Services;
    }]);