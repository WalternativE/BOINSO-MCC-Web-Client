'use strict';

boinsoMCCApp.factory('authService',
    ['$http', 'CONFIG', function($http, CONFIG) {

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

        return {
            getAuthToken: getAuthToken
        }
    }]
);
