/*
 * @Author: Administrator
 * @Date:   2016-02-17 19:33:21
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-02-19 22:48:27
 */

'use strict';;
(function(angular) {
    var http = angular.module('moviecat.services.http', []);
    http.service('HttpService', ['$window', '$document', function($window, $document) {
        this.jsonp = function(url, data, callback) {

            // 定义字符串，拼接url
            var queryString = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data) {
                queryString += key + '=' + data[key] + '&';
            }
            var fnSuffix = Math.random().toString().replace('.', '');
            var cbFnName = "my_json_cb_" + fnSuffix;
            queryString += 'callback=' + cbFnName;
            //利用script标签实现跨域问题，
            //创建script标签，并添加到页面中
            var scriptElement = $document[0].createElement("script");
            scriptElement.src = url + queryString;
            // 定义函数后缀为随机数字
            // 将cbFnName这个函数名暴露在window中，函数体自定义为callback
            $window[cbFnName] = function(data) {
                callback(data);
                $document[0].body.removeChild(scriptElement);
            };
            $document[0].body.appendChild(scriptElement);

        };
    }]);

})(angular);
