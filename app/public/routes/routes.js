angular.module('Sailing911').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { 'use strict';
    $routeProvider
        .when('/', {
            templateUrl: 'app/public/home/home.html',
            controller: 'homeController'
        })
        .when('/browse', {
            templateUrl: 'app/public/browse/browse.html',
            controller: 'browseController'
        })
        .when('/category/:categoryId', {
            templateUrl: 'app/public/category/category.html',
            controller: 'categoryController'
        })
        .when('/company/:companyId', {
            templateUrl: 'app/public/company/company.html',
            controller: 'companyController'
        })
        .when('/regions/:regionId', {
            templateUrl: 'app/public/region/region.html',
            controller: 'regionController'
        })
        .when('/story', {
            templateUrl: 'app/public/story/story.html'
            //controller: 'storyController'
        })
        .when('/state/:stateAbbrev', {
            templateUrl: 'app/public/state/state.html'
        })
        .when('/results', {
            templateUrl: 'app/public/results/results.html'
        })
        /*.when('/map', {
            templateUrl: 'app/public/map/map.html',
            controller: 'mapController'
        })*/
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);