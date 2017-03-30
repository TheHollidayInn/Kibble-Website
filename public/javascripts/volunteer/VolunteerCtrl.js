angular.module('Volunteer')
	.controller('VolunteerCtrl', ['$scope', 'VolunteerService',
		function ($scope, VolunteerService) {
			$scope.opportunites = [];
			$scope.eventTypes = [
				{
					id: 1,
					name: 'type1',
				},
				{
					id: 2,
					name: 'type2',
				},
			];
			$scope.filters = {};

			function getPostCode(place) {
				for (var i = 0; i < place.address_components.length; i++) {
		      for (var j = 0; j < place.address_components[i].types.length; j++) {
		        if (place.address_components[i].types[j] == "postal_code") {
		          return place.address_components[i].long_name;
		        }
		      }
		    }
			}

			$scope.getEvents = function () {
				if ($scope.filters.autocomplete) {
					$scope.filters.zipCode = getPostCode($scope.filters.autocomplete);
				}

				if ($scope.filters.type) $scope.filters.type = $scope.filters.type.name;

				VolunteerService.get($scope.filters)
					.then(function (response) {
						$scope.opportunites = $scope.opportunites.concat(response.data);
					});
			}
			$scope.getEvents();

			$scope.scroll = function () {
				if (!$scope.opportunites[$scope.opportunites.length - 1]) return;
				$scope.filters.createdAtBefore = $scope.opportunites[$scope.opportunites.length - 1].createdAt;
				$scope.getEvents();
			}

			$scope.dateOptions = {
				// dateDisabled: disabled,
				formatYear: 'yy',
				maxDate: new Date(2020, 5, 22),
				minDate: new Date(),
				startingDay: 1
			};

			$scope.open1 = function() {
				$scope.popup1.opened = true;
			};

			$scope.open2 = function() {
				$scope.popup2.opened = true;
			};

			$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[0];

			$scope.popup1 = {
				opened: false
			};

			$scope.popup2 = {
				opened: false
			};
		}]);
