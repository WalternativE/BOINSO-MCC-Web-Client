'use strict';

var boinsoMCCApp = angular.module('boinsoMCCApp', [
        'ngResource',
        'ngRoute',
        'angular-storage',
        'ui.bootstrap'
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

boinsoMCCApp.constant("CONFIG", {
    "BACKEND_URL": "http://localhost:8000/"
});
