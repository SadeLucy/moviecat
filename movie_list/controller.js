'use strict';
(function(angular) {

    angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:category/:page', {
            templateUrl: 'movie_list/view.html',
            controller: 'movieListController'
        });
    }])

    .controller('movieListController', [
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function($scope, $route, $routeParams, HttpService,AppConfig) {
            // 每一页的条数
            var count = AppConfig.pageSize;
            // 当前第几页
            // console.log($routeParams);
            var page = parseInt($routeParams.page);
            //
            var start = (page - 1) * count;
            $scope.loading = true;
            $scope.subjects = [];
            $scope.title = 'Loading';
            $scope.totalCount = 0;
            $scope.totalPages = 0;
            $scope.currentPage = page;

            HttpService.jsonp(
            	AppConfig.listApiAddress + $routeParams.category,
            	{ start: start, count: count ,q:$routeParams.q},
                function(data) {
                    $scope.subjects = data.subjects;
                    $scope.title = data.title;
                    $scope.totalCount = data.total;
                    $scope.totalPages = Math.ceil($scope.totalCount / count);
                    $scope.loading = false;
                    $scope.$apply();
                });
            $scope.go = function(page) {
                if (page >= 1 && page <= $scope.totalPages) {
                    $route.updateParams({ page: page });
                }
            }

        }
    ]);

})(angular);



/*
	模拟从后台获取数据

 	$http.get("./datas/in_theaters.json").then(function(result) {
    			if (result.status == 200) {
    				$scope.subjects = result.data.subjects;

    			}else {
    				$scope.message = "获取数据错误，错误信息："+result.statusText;
    			}
    	  },function(error) {
    	      $scope.message = "获取数据错误，错误信息："+error.statusText;
    	    });*/
