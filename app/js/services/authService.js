/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').factory('authService', [
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

            var registerClient = function(data) {
                return $http({
                    method: "POST",
                    url: CONFIG.BACKEND_URL + 'api/sign_up/',
                    data: data
                })
                .then(function(result) {
                    return result;
                }, function(result) {
                    return result;
                });
            };

            var login = function() {

                var modalInstance = $modal.open({
                    templateUrl: 'templates/modals/loginModal.html',
                    controller: 'LoginModalController'
                });

                return modalInstance.result.then(function(res) {

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

                return modalInstance.result.then(function(res) {

                    var data = {
                        username: res.userName,
                        email: res.userEmail,
                        password: res.password
                    };

                    var registrationPromise = registerClient(data);
                    registrationPromise.then(function(res) {

                        if (res.status == 201) {
                            var token = getAuthToken(res.data.client_id, res.data.client_secret, data.username, data.password);
                            token.then(function(res) {
                                store.set('auth_token', res.data);
                                setLoggedInStatus(true);
                            });
                        } else if (res.status == 400) {
                            //maybe it's a good idea to have an alert array in this service
                            //they could be displayed site wide and could be dismissed easyly
                            //if this is possible I might get around using alerts
                            alert('Something went wrong...most likely the username is taken.');
                        }

                    });
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
