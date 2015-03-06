angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})

		.when('/users/create', {
			templateUrl: 'views/create.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

	$locationProvider.html5Mode(true);
});