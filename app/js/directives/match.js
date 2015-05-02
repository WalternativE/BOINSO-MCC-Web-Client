/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').directive('match', [
    function() {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ctrl) {
                var validate = function(repeated) {
                    var orig = $attrs.match;

                    if(!repeated || !orig) {
                        ctrl.$setValidity('match', true);
                        return repeated;
                    }

                    ctrl.$setValidity('match', orig === repeated);
                    return repeated;
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                $attrs.$observe('match', function(orig) {
                    return validate(ctrl.$repeated);
                });
            }
        };
    }
]);
