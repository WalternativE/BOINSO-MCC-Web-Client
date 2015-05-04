/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').factory('satelliteResource', [
    '$resource',
    'CONFIG',
        function ($resource, CONFIG) {
            return $resource(CONFIG.BACKEND_URL + 'api/satellites/:id');
        }
    ]
);