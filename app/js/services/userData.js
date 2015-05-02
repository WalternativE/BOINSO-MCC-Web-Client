'use strict';

boinsoMCCApp.factory('userData', [
    '$http',
    'CONFIG',
    '$resource',
    'store',
        function ($http, CONFIG, $resource, store) {

            var getUser = function () {
                var token = undefined;

                try {
                    token = store.get('auth_token').access_token;
                } catch(err) {
                    token = 'nope';
                }

                console.log(token);

                return $http({
                    method: "GET",
                    url: CONFIG.BACKEND_URL + 'api/user-profiles/',
                    headers: {'Authorization': 'Bearer ' + token}
                }).
                then(function (result) {
                    return result;
                }, function (result) {
                    return result;
                });
            };

            return {
                getUser: getUser
            };
        }
    ]
);