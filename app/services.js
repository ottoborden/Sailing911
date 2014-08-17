angular.module('Sailing911')
    .service('s911Services', ['RestService', function(RestService) {
        s911Services = function(){};

        s911Services.getCategoryName = function(catId) {
            var query = {'q': 'SELECT category FROM tblCategories WHERE id = \'' + catId + '\''};
            return RestService.fetch(query);
        };

        s911Services.currStateName = '';
        s911Services.surrStateAbbrev = '';
        s911Services.currCategoryId = '';
        //s911Services.currCategory = s911Services.getCategoryName(catId);

        return s911Services;
    }]);