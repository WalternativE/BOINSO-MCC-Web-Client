/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').controller('HomeController', [
    '$scope',
    'mccConfig',
    'authService',
        function($scope, mccConfig, authService) {
            $scope.mccName = mccConfig.MCC_NAME;

            $scope.register = authService.register;
            $scope.loggedIn = authService.getLoggedInStatus;
        }
    ]
);
