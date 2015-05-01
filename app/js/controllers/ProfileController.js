'use strict';

boinsoMCCApp.controller('ProfileController', [
    '$scope',
	'userData',
	'userProfile',
	'userResource',
        function($scope, userData, userProfile, userResource) {
			$scope.test = "This is a test";
			
			$scope.userData = userData.getUser();
			$scope.userData.then(function (res) {
				var user_profile = res.data[0];
				var user_profile_url_ar = user_profile.url.split('/');
				var user_url_ar = user_profile.user.split('/');
				
				// -2 because the last position is an empty string
				// I want the second to last position
				var user_id = user_url_ar[user_url_ar.length - 2];				
				var user_profile_id = user_profile_url_ar[user_profile_url_ar.length -2];
				// TODO get rid of log statement				
				console.log("user_id: " + user_id + " user_profile_id: " + user_profile_id);
				
				$scope.profile = userProfile.get({id: user_profile_id});
				$scope.profile.$promise.then(function(res) {
						console.log(res);
					}
				);
				
				$scope.user = userResource.get({id: user_id});
				$scope.user.$promise.then(function (res) {
						console.log(res);
					}
				);
			});
        }
    ]
);
