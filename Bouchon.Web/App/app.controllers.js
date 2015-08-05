﻿(function () {
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
					    $location.path('/display-message/Un lien de confirmation a ete envoye par email');
				   })
				   .error(function (data) {
					    $location.path('/display-message/Une erreur s\'est produite');
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
})();
