/*
 * @Author: Administrator
 * @Date:   2016-02-18 16:20:49
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-02-19 22:41:45
 */

'use strict';;
(function(angular) {
    angular.module('moviecat.directives.auto_focus', [])
        .directive('autoFocus', ['$location', function($location) {
            // var path = $location.path();
            // return {
            // 	// E = Element, A = Attribute, C = Class, M = Comment
            // 	restrict:'A',
            // 	link: function($scope, iElm,iAttrs,controller) {
            // 	    var aLink = iElm.children().attr('href');
            // 	    var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
            // 	    if (path.startsWith(type)) {
            // 	    	// 访问是当前链接
            // 	    	iElm.addClass('active');
            // 	    }
            // 		iElm.on('click',function() {
            // 		    iElm.parent().children().removeClass('active');
            // 		    iElm.addClass('active');
            // 		  });
            // 	  }
            // };

            return {
                // E = Element, A = Attribute, C = Class, M = Comment
                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {
                    $scope.$location = $location;
                    $scope.$watch("$location.path()", function(now) {
                        var aLink = iElm.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
                        if (now.startsWith(type)) {
                            // 访问是当前链接
                            iElm.parent().children().removeClass('active');
                            iElm.addClass('active');
                        }
                        // iElm.on('click', function() {
                        //         iElm.parent().children().removeClass('active');
                        //         iElm.addClass('active');
                        //     };
                    });
                }

            }
        }]);
})(angular);
