angular.module('Sailing911').config(['$routeProvider', function($routeProvider) { 'use strict';
    $routeProvider
        .when('/', {
            templateUrl: 'app/public/home/home.html',
            controller: 'homeController'
        }, true)
        .when('/category/:categoryId', {
            templateUrl: 'app/public/category/category.html',
            controller: 'categoryController'
        })
        .when('company/:companyId', {
            templateUrl: 'app/public/company/company.html',
            controller: 'companyController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);