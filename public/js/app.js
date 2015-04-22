var DevIdeasApp = angular.module('DevIdeasApp', ['postService', 'authService', 'ngResource', 'ui.router']);

DevIdeasApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	
	$locationProvider.html5Mode(true);

	// ================================================
	// Check if user is connected
	// ================================================
	// var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
	// 	// Initialize a new promise
	// 	var deferred = $q.defer();

	// 	// Make a request to check if user is logged in
	// 	$http.get('/loggedin').success(function(user) {
	// 		if (user !== 0) {
	// 			deferred.resolve();
	// 		}
	// 		else {
	// 			$rootScope.message = 'Sorry, you need to log in!';
	// 			deferred.reject();
	// 			$location.url('/login');
	// 		}
	// 	});

	// 	return deferred.promise;
	// }
	// ================================================


	// ================================================
	// Add interceptor to check for authentication
	// ================================================
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			response: function(response) {
				return response;
			},
			responseError: function(err) {
				if (err.status == 401) {
					$location.url('/login');
				}
				return $q.reject(err);
			}
		};
	});
	// ================================================

	// ================================================
	// Define all routes
	// ================================================
	// $urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
		})
	// ================================================

});

DevIdeasApp.controller('mainController', function($http, $scope, $location, $window, Posts, Auth) {
	var vm = this;
	Posts.all()
		.success(function(data) {
			vm.posts = data;
		});

	var checkLoggedIn = function() {
		$http.get('/loggedin')
			.success(function(data) {
				return data;
				console.log(data);
			});
	}

	vm.loggedIn = checkLoggedIn();

	// vm.loggedIn = Auth.isLoggedIn();

	// $scope.safeApply = function(fn){
	// 	var phase = this.$root.$$phase;
	// 	if(phase == '$apply' || phase == '$digest'){
	// 		if (fn && (typeof(fn) === 'function')) {
	// 			fn();
	// 		}
	// 	}
	// 	else{
	// 		this.$apply(fn);
	// 	}
	// }

	vm.login = function() {
		// $location.path('https://www.tumblr.com/blog/justvishthings');
		// $location.replace();
		// $location.path('/auth/github');
		$http.get('/auth/github')
			.success(function() {
				vm.loggedIn = checkLoggedIn();
			})
		// $window.location.reload();
		
	}

	vm.logout = function() {
		$http.get('/logout')
			.success(function() {
				vm.loggedIn = checkLoggedIn();
			});
		
	}
});

DevIdeasApp.controller('loginController', function($scope, $rootScope, $http, $location) {

});











