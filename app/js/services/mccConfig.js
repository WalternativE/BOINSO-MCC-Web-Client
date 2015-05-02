/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').factory('mccConfig', function() {
    var mccConfigInstance = {
        'MCC_NAME': "Test MCC",
    };

    return mccConfigInstance;
});
