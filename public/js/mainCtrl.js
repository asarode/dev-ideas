angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, Post) {
	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});
	});

	vm.doLogin = function() {

		vm.error = '';
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data) {
			if (data.success) {
				$location.path('/');
			}
			else vm.error = data.message;
		});
	};

	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		$location.path('/login');
	};

	Post.all().then(function(response) {
		vm.posts = response.data;
		console.log(vm.posts);
	})
	


});