(function () {
	var app = angular.module('bouchon');

	// ---------------------------------------- Controllers -------------------------------------
	//
	app.controller('appCtrl', ['$scope', 'authSvc', function ($scope, authSvc) {
		$scope.isLoggedIn = authSvc.isLoggedIn;
	}]);

	app.controller('registerCtrl', ['$scope', '$location', 'userSvc', function ($scope, $location, userSvc) {
		$scope.register = function (username, password, confirmPassword, email) {
			userSvc.create(username, password, confirmPassword, email)
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
})();
