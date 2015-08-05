(function () {
	var app = angular.module('bouchon', ['ngRoute', 'ngResource']);

	// ---------------------------------------- Config ---------------------------------------
	//
	//app.constant('API_URL', 'https://localhost:44300/api/'); //local dev
	app.constant('API_URL', 'https//bouchon-api.azurewebsites.net/api/'); //UAT

	//JWT token issuance URL
	//app.constant('API_TOKEN_URL', 'https://localhost:44300/token'); //local dev
	app.constant('API_TOKEN_URL', 'https://bouchon-api.azurewebsites.net/token'); //UAT


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


	// ---------------------------------------- Services ----------------------------------------

	app.factory('Request', ['$resource', 'API_URL', function ($resource, API_URL) {
		return $resource(API_URL + 'request/:id', { id: '@id' }, {
			update: {
				method: 'PUT'
			}
		});
	}]);
})();