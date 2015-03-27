'use strict';

var boinsoMCCApp = angular.module('boinsoMCCApp', [
        'ngResource',
        'ngRoute'
    ]);

boinsoMCCApp.config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/home',
            {
                templateUrl: 'templates/Home.html',
                controller: 'HomeController'
            });
        $routeProvider.otherwise({redirectTo: '/home'});
        $locationProvider.html5Mode(true);

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
);
