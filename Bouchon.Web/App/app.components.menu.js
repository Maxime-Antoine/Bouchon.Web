(function () {
    var app = angular.module('annufal');

    //left menu list component
    app.directive('menu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'App/Views/menu.html',
            controller: ['$scope', function ($scope) {

            }]
        }
    });
})();