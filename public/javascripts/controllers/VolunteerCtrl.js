angular.module('PetApp')
	.controller('VolunteerCtrl', ['$scope', 
		function ($scope) {
			$scope.opportunites = [
				{
					name: 'Test 1',
				},
				{
					name: 'Test 2',
				},
				{
					name: 'Test 3',
				},
			];
		}]);