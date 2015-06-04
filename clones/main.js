var clonerAng = angular.module('clonerAng', [])
	.controller('mainController', function($scope, $http) {

		$scope.visible = false;

		$scope.getClone = function() {
			$scope.name = $scope.domainUrl;
			var url = $scope.domainUrl;

			if (url.length > 3) {
				$http.get('/clone?url=' + url)
					.success(function(data) {
						$scope.clone = data;
						$scope.visible = true;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			} else $scope.visible = false;
		};

	});