(function () {
	var app = angular.module('bouchon');

	// ---------------------------------------- Controllers -------------------------------------
	//
	app.controller('appCtrl', ['$scope', 'authSvc', function ($scope, authSvc) {
		$scope.isLoggedIn = authSvc.isLoggedIn;
	}]);

	app.controller('registerCtrl', ['$scope', '$location', 'userSvc', function ($scope, $location, userSvc) {
		$scope.register = function (user) {
			userSvc.create(user)
				   .success(function (data) {
					    $location.path('/display-message/A confirmation link has been sent by link');
				   })
				   .error(function (data) {
					    $location.path('/display-message/An error occured');
				   });
		};
	}]);

	app.controller('displayMessageCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		$scope.msg = $routeParams.msg;
	}]);

	app.controller('postRequestCtrl', ['$scope', 'Request', function ($scope, Request) {
		$scope.newRequest = new Request();

		$scope.postNewRequest = function () {
			$scope.newRequest.$save(function () {
				alert('Ok')
			}, function () {
				alert('Error')
			});
		};
	}]);

	app.controller('postTripCtrl', ['$scope', 'Trip', function ($scope, Trip) {
	    $scope.newTrip = new Trip();

	    $scope.postNewTrip = function () {
	        $scope.newTrip.$save(function () {
	            alert('Ok')
	        }, function () {
	            alert('Error')
	        });
	    };
	}]);
})();
