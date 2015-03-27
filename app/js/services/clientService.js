'use strict';

boinsoMCCApp.factory('clientService',
    ['$http', function($http) {

        var getClient = function(username, password) {
            return $http({
                method:"GET",
                url:'http://localhost:8000/api/login/',
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
