angular.module('postService', [])
.factory('Posts', function($http, $q) {
	var Posts = {};

	Posts.all = function() {
		return $http.get('/posts');
	};

	return Posts;
});

angular.module('authService', [])
.factory('Auth', function($http, $location) {
	var Auth = {};

	Auth.login = function() {
		// window.location.href('http://yahoo.com');
		// $scope.apply(function() {
		// 	$location.path('/auth/github');
		// });
		// console.log("attempted login?");
	};

	Auth.logout = function() {
		$http.get('/logout');
	}

	Auth.isLoggedIn = function() {
		$http.get('/loggedin')
			.success(function(data) {
				if (data !== 0) {
					return data;
				}
				else {
					return false;
				}
			});
	}

	return Auth;
});