'use strict';

angular.module('boinsoMCCApp').controller('LoginController', [
    '$scope', 'clientService', 'authService', 'store', '$modal',
    function($scope, clientService, authService, store, $modal) {
        $scope.loggedIn = false;

        $scope.userName = 'bobben';
        $scope.userPwd = 'bobben';



        $scope.open = function() {
            var modalInstance = $modal.open({
                templateUrl: 'templates/modals/loginModal.html',
                controller: 'ModalInstanceController'
            });

            modalInstance.result.then(function(res) {
                console.log(res);

                var clientPromise = clientService.getClient(res.userName, res.password);
                clientPromise.then(function(result) {
                    console.log(result);

                    if (result.status == 200) {
                        var client = result.data[0];
                        var token = authService.getAuthToken(client.client_id, client.client_secret, res.userName, res.password);
                        token.then(function(res) {
                            console.log(res);
                            store.set('auth_token', res.data);
                        });
                    }
                });
            });
        };
    }]
);

angular.module('boinsoMCCApp').controller('ModalInstanceController', [
    '$scope', '$modalInstance', function($scope, $modalInstance) {

        $scope.ok = function(userData) {
            $modalInstance.close(userData);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }]
);
