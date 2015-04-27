'use strict';

boinsoMCCApp.controller('HomeController', [
    '$scope',
    'mccConfig',
    'authService',
        function($scope, mccConfig, authService) {
            $scope.mccName = mccConfig.MCC_NAME;

            $scope.register = authService.register;
        }
    ]
);
