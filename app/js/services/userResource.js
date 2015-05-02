/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').factory('userResource', [
    '$resource',
    'CONFIG',
    'store',
        function ($resource, CONFIG, store) {
            var getToken = function() {
                var token = undefined;
                
                try {
                    token = store.get('auth_token').access_token;
                } catch(err) {
                    token = 'nope';
                }
                
                return token;
            };

            var getResource = function() {
                return $resource(CONFIG.BACKEND_URL + 'api/users/:id/', null,
                    {
                        'update': {
                            method: 'PUT',
                            headers: {'Authorization': 'Bearer ' + getToken()}
                        },
                        'get': {
                            method: 'GET',
                            headers: {'Authorization': 'Bearer ' + getToken()}
                        }
                    }
                );
            };

            return {
                getResource: getResource 
            };
        }
    ]
)