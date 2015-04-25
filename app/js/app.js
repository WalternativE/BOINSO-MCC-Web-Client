'use strict';

var boinsoMCCApp = angular.module('boinsoMCCApp', [
    'ngResource',
    'angular-storage',
    'ui.bootstrap',
    'ui.router'
]);

boinsoMCCApp.constant("CONFIG", {
    "BACKEND_URL": "http://localhost:8000/"
});
