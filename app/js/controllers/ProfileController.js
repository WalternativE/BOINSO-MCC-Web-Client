/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('boinsoMCCApp').controller('ProfileController', [
    '$scope',
    'userData',
    '$injector',
        function($scope, userData, $injector) {
            $scope.origProfile = undefined;
            $scope.userData = userData.getUser();
            $scope.userData.then(function (res) {

                var user_profile = res.data[0];
                var user_profile_url_ar = user_profile.url.split('/');
                var user_url_ar = user_profile.user.split('/');

                // -2 because the last position is an empty string
                // I want the second to last position
                $scope.user_id = user_url_ar[user_url_ar.length - 2];
                $scope.user_profile_id = user_profile_url_ar[user_profile_url_ar.length -2];
                // TODO get rid of log statement
                console.log("user_id: " + $scope.user_id + " user_profile_id: " + $scope.user_profile_id);

                var userProfile = $injector.get('userProfile');
                var userResource = $injector.get('userResource');
                
                $scope.profile = userProfile.getResource().get({id: $scope.user_profile_id});
                $scope.profile.$promise.then(function(res) {
                        console.log(res);
                        $scope.origProfile = angular.copy(res);
                    }
                );

                $scope.user = userResource.getResource().get({id: $scope.user_id});
                $scope.user.$promise.then(function (res) {
                        console.log(res);
                    }
                );
            });

            $scope.isInEditMode = false;
            var toggleEditMode = function() {
                $scope.isInEditMode = !$scope.isInEditMode;	
            };

            $scope.startEdit = function() {
                toggleEditMode();
            };

            $scope.updateProfile = function() {
                $scope.origProfile = angular.copy($scope.profile);
                var userProfile = $injector.get('userProfile');
                userProfile.getResource().update({id: $scope.user_profile_id}, $scope.profile);
                toggleEditMode();
            };
            
            $scope.cancelEdit = function() {
                $scope.profile = $scope.origProfile;
                toggleEditMode();
            };

        }
    ]
);
