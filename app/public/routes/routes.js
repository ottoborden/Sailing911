angular.module('Sailing911').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { 'use strict';
    $routeProvider
        .when('/', {
            templateUrl: 'app/public/home/home.html',
            controller: 'homeController'
        })
        .when('/company/:companyId', {
            templateUrl: 'app/public/company/company.html',
            controller: 'companyController'
        })
        .when('/story', {
            templateUrl: 'app/public/story/story.html'
            //controller: 'storyController'
        })
        .when('/results/:categoryId', {
            templateUrl: 'app/public/results/results.html',
            controller: 'resultsController'
        })
        .when('/results/:stateAbbrev', {
            templateUrl: 'app/public/results/results.html',
            controller: 'resultsController'
        })
        .when('/results/:searchTerm', {
            templateUrl: 'app/public/results/results.html',
            controller: 'resultsController'
        })
        .when('/results/', {
            templateUrl: 'app/public/results/results.html',
            controller: 'resultsController'
        })
        .when('/contact', {
            templateUrl: 'app/public/contact/contact.html',
            controller: 'ContactController'
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);