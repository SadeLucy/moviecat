'use strict';
(function(angular) {

    angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'movieDetailController'
        });
    }])

    .controller('movieDetailController', [
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function($scope, $route, $routeParams, HttpService, AppConfig) {
            $scope.movie = {};
            $scope.loading = true;
            var id = $routeParams.id;
            var apiAddress = AppConfig.detailApiAddress + id;

            HttpService.jsonp(apiAddress, {}, function(data) {
                $scope.movie = data;
                $scope.loading = false;
                $scope.$apply();
            });
        }

    ]);
})(angular);
