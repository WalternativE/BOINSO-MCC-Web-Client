'use strict';

boinsoMCCApp.factory('authService', [
    '$http',
    'CONFIG',
    'store',
    '$modal',
    '$state',
        function($http, CONFIG, store, $modal, $state) {

            var getAuthToken = function(client_id, client_secret, username, password) {
                return $http({
                    method:"POST",
                    url: CONFIG.BACKEND_URL + 'o/token/',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $.param({
                                client_id: client_id,
                                client_secret: client_secret,
                                username: username,
                                password: password,
                                grant_type: 'password'
                            })
                }).
                then(function(result) {
                    return result;
                });
            };

            var getClient = function(username, password) {
                return $http({
                    method:"GET",
                    url:CONFIG.BACKEND_URL + 'api/login/',
                    headers: {Authorization: 'Basic ' + btoa(username + ':' + password)}

                }).
                then(function(result) {
                    return result;
                });
            };

            var login = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'templates/modals/loginModal.html',
                    controller: 'LoginModalController'
                });

                return modalInstance.result.then(function (res) {
                    console.log(res);

                    var clientPromise = getClient(res.userName, res.password);
                    clientPromise.then(function(result) {
                        console.log(result);

                        if (result != undefined && result.status == 200) {
                            var client = result.data[0];
                            var token = getAuthToken(client.client_id, client.client_secret, res.userName, res.password);
                            token.then(function(res) {
                                console.log(res);
                                store.set('auth_token', res.data);
                            });
                        }
                    });
                });
            };

            return {
                login: login
            };
        }
    ]
);

// boinsoMCCApp.config([
//     '$httpProvider', 'authService', function($httpProvider, authService) {
//         $httpProvider.interceptors.push(function(authService) {
//             return {
//                 responseError: function(rejection) {
//                     if (rejection.status === 401) {
//                         console.log('bubuuuuuuu!');
//                     }
//                 }
//             };
//         });
//     }]
// );
