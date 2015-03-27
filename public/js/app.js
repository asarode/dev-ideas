angular.module('DevIdeasApp', ['postService'])

.controller('mainController', function($scope, Posts) {

	var vm = this;
	Posts.all()
		.success(function(data) {
			vm.posts = data;
		});
});