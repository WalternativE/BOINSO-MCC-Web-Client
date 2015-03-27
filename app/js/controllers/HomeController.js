'use strict';

boinsoMCCApp.controller('HomeController',
    ['$scope', 'mccConfig', function($scope, mccConfig) {
        $scope.mccName = mccConfig.MCC_NAME;
    }]
);
