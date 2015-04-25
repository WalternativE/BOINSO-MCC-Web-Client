'use strict';

angular.module('boinsoMCCApp').controller('LoginModalController', [
    '$scope', '$modalInstance', function($scope, $modalInstance) {
        $scope.ok = function(userData) {
            $modalInstance.close(userData);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]
);
