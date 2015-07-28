(function () {
	var app = angular.module('bouchon');

	//login box component
	app.directive('loginForm', function () {
		return {
			restrict: 'EA',
			templateUrl: 'App/Views/login-form.html',
			controller: ['$scope', '$location', '$http', '$timeout', 'authSvc', 'API_TOKEN_URL', 'API_URL',
				function ($scope, $location, $http, $timeout, authSvc, API_TOKEN_URL, API_URL) {
					$scope.input = {};

					$scope.login = function () {
						if (!$scope.input.username)
							$scope.showMsg('error', 'Login required', 5000);
						else if (!$scope.input.password)
							$scope.showMsg('error', 'Password required', 5000);
						else
						{
						    var req = {
						        method: 'POST',
						        url: API_TOKEN_URL,
						        headers: {
						            'Content-Type': 'application/x-www-form-urlencoded'
						        },
						        data: $.param({
						            grant_type: 'password',
						            scope: 'api',
						            userName: $scope.input.username,
						            password: $scope.input.password,
						            client_id: 'bouchon.website',
						            client_secret: '1a2a4b72-dda2-4dc8-94df-77f5ef7a84b2'
						        })
						    };

						    $http(req).success(function (data) {
						        $location.path('/');
						    }).error(function (data) {
						        $scope.showMsg('error', data.error_description, 5000);
						    });
						}
					};

					$scope.logout = function () {
						authSvc.deleteAuthToken();
						$location.path('/');
					};

					$scope.goToRegister = function () {
						$location.path('/register');
					};

					$scope.isLoggedIn = function () {
						return authSvc.isLoggedIn();
					};

					$scope.getAuthToken = authSvc.getAuthToken;

					$scope.loggedInUsername = authSvc.loggedInUserName;

					$scope.isAdmin = authSvc.isAdmin;

					$scope.resetPwd = function () {
						if (!$scope.input.username) {
							$scope.showMsg('error', "Login required", 5000);
						} else {
							$http.get(API_URL + 'account/resetPassword/' + $scope.input.username)
								 .success(function (data) {
									 $scope.showMsg('info', "An email has been sent", 5000);
								 })
								 .error(function (data) {
									 $scope.showMsg('error', "Unknown user", 5000);
								 });
						}
					};

					//need not be in $scope, but helps with 'this' scope issues
					$scope.showMsg = function (type, msg, delay) {
						$scope.msgType = type;
						$scope.msg = msg;
						$timeout(function () {
							scope = $scope;
							delete scope.msgType;
							delete scope.msg;
						}, delay);
					};
				}]
		}
	});
})();