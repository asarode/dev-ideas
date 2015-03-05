angular.module('postService', [])

.factory('Post', function($http) {
	var postFactory = {};

	// get all posts
	postFactory.all = function() {
		return $http.get('/api/posts');
	};

	return postFactory;
});