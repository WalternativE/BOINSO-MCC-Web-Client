/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').controller('HomeController', [
    '$scope',
    'mccConfig',
    'authService',
    'satelliteResource',
        function($scope, mccConfig, authService, satelliteResource) {
            $scope.mccName = mccConfig.MCC_NAME;

            $scope.register = authService.register;
            $scope.loggedIn = authService.getLoggedInStatus;
            
            $scope.satellites = satelliteResource.query();
            $scope.satellites.$promise.then(function(res) {
                console.log(res);
            });
        }
    ]
);
