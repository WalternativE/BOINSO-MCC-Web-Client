'use strict';

boinsoMCCApp.factory('clientService',
    ['$http', 'CONFIG', function($http, CONFIG) {

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

        return {
            getClient: getClient
        }
    }]
);
