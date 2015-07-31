(function () {
	var app = angular.module('bouchon', ['ngRoute']);

	// ---------------------------------------- Config ---------------------------------------
	//
	//app.constant('API_URL', 'https://localhost:44300/api/'); //local dev
	app.constant('API_URL', 'https//bouchon-api.azurewebsites.net/api/'); //UAT

	//JWT token issuance URL
	//app.constant('API_TOKEN_URL', 'https://localhost:44300/token'); //local dev
	app.constant('API_TOKEN_URL', 'http://bouchon-api.azurewebsites.net/token'); //UAT

	// ---------------------------------------- Services ----------------------------------------

	//users management service
	app.service('userSvc', ['$http', 'API_URL', function ($http, API_URL) {
		self = this;

		self.create = function (username, password, confirmPassword, email) {
			return $http.post(API_URL + 'account/create', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
				email: email
			});
		}
	}]);

	// ---------------------------------------- Directives --------------------------------------

	//custom validation directive to check if 2 fields in a form are equals
	app.directive('compareTo', function () {
		return {
			require: "ngModel",
			scope: {
				otherModelValue: "=compareTo"
			},
			link: function (scope, element, attributes, ngModel) {
				ngModel.$validators.compareTo = function (modelValue) {
					return modelValue == scope.otherModelValue;
				};

				scope.$watch("otherModelValue", function () {
					ngModel.$validate();
				});
			}
		}
	});
})();