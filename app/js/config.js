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

            $httpProvider.interceptors.push(['$injector', function($injector) {
                return {
                    responseError: function(rejection) {

                        // I inject these services via implicitly calling the $injector service
                        // if I don't do it like this I get a circular dependency error
                        // I wish that some day I fully understand my doings
                        var authService = $injector.get('authService');
                        var $state = $injector.get('$state');
                        var store = $injector.get('store');

                        if (rejection.status === 401) {
                            $state.go('home');
                            store.remove('auth_token');
                            authService.login();
                        }
                    }
                };
            }]);
        }
    ]
);
