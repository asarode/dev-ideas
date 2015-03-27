angular.module('postService', [])

.factory('Posts', function($http, $q) {
	var Posts = {};

	Posts.all = function() {
		return $http.get('/posts');
	};

	return Posts;
});