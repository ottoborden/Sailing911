angular.module('Sailing911')
    .service('s911Services', ['RestService', function(RestService) {
        s911Services = function(){};

        s911Services.getCategoryName = function(catId) {
            var query = {'q': 'SELECT category FROM tblCategories WHERE id = \'' + catId + '\''};
            return RestService.fetch(query);
        };
        s911Services.setCurrCategoryId = function(catId) {
            s911Services.currCategoryId = catId;
        };

        s911Services.currStateName = null;
        s911Services.currStateAbbrev = null;
        s911Services.currCategoryId = null;

        return s911Services;
    }]);