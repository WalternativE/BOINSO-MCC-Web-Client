'use strict';

angular.module('boinsoMCCApp').controller('LoginController', [
    '$scope', 'authService', '$state', 'store',
    function($scope, authService, $state, store) {

        $scope.loggedIn = authService.getLoggedInStatus;

        $scope.login = function() {
            authService.login();
        }

        $scope.register = function() {
            authService.register();
        }

        $scope.logout = function() {
            store.remove('auth_token');
            authService.setLoggedInStatus(false);
            $state.go('home');
        };
    }]
);
