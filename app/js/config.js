'use strict';

angular.module('boinsoMCCApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

            //for unmatched url
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "templates/Home.html",
                    controller: "HomeController"
                })
                .state('profile', {
                    url: "/profile",
                    templateUrl: "templates/Profile.html"
                });

            $locationProvider.html5Mode(true);

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.interceptors.push(function() {
                return {
                    responseError: function(rejection) {
                        if (rejection.status === 401) {
                            console.log('bubuuuuuuu!');
                        }
                    }
                };
            });
        }
    ]
);
