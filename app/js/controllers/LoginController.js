'use strict';

boinsoMCCApp.controller('LoginController', [
    '$scope', 'clientService', 'authService', function($scope, clientService, authService) {
        $scope.loggedIn = false;
        var clientPromise = clientService.getClient('bobben', 'bobben');
        clientPromise.then(function(result) {
            console.log(result);

            if (result.status == 200) {
                var client = result.data[0];
                var token = authService.getAuthToken(client.client_id, client.client_secret, 'bobben', 'bobben');
                token.then(function(res) {
                    console.log(res);
                });
            }
        });
    }]
);
