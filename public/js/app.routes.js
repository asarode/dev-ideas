angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html'
		});

	$locationProvider.html5Mode(true);
});