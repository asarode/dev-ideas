angular.module('devideasApp', ['app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService', 'postService'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
})