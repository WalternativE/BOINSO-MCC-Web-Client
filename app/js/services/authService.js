'use strict';

boinsoMCCApp.factory('authService', [
    '$http',
    'CONFIG',
    'store',
    '$modal',
    '$state',
    '$q',
        function($http, CONFIG, store, $modal, $state, $q) {

            var loggedIn = undefined;

            var initLoggedInStatus = function() {
                if (!store.get('auth_token')) {
                    loggedIn = false;
                } else {
                    loggedIn = true;
                }
            };

            var setLoggedInStatus = function(status) {
                loggedIn = status;
            };

            var getLoggedInStatus = function() {
                if (loggedIn == undefined) {
                    initLoggedInStatus();
                }
                return loggedIn;
            };

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

                    var clientPromise = getClient(res.userName, res.password);
                    clientPromise.then(function(result) {

                        if (result != undefined && result.status == 200) {
                            var client = result.data[0];
                            var token = getAuthToken(client.client_id, client.client_secret, res.userName, res.password);
                            token.then(function(res) {
                                store.set('auth_token', res.data);
                                setLoggedInStatus(true);
                            });
                        }
                    });
                });
            };

            var register = function() {

                var modalInstance = $modal.open({
                    templateUrl: 'templates/modals/registrationModal.html',
                    controller: 'LoginModalController'
                });

            };

            return {
                login: login,
                register: register,
                getLoggedInStatus: getLoggedInStatus,
                setLoggedInStatus: setLoggedInStatus
            };
        }
    ]
);
