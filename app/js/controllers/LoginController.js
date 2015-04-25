'use strict';

angular.module('boinsoMCCApp').controller('LoginController', [
    '$scope', 'authService', '$state', 'store',
    function($scope, authService, $state, store) {

        $scope.alerts = [];

        $scope.alerts = function(index) {
            $scope.alerts.splice(index, 1);
        };

        if (!store.get('auth_token')) {
            $scope.loggedIn = false;
        } else {
            $scope.loggedIn = true;
        }

        $scope.login = function() {
            authService.login();
            $scope.loggedIn = true;
        }

        $scope.logout = function() {
            store.remove('auth_token');
            $scope.loggedIn = false;
            $state.go('home');
        };
    }]
);
