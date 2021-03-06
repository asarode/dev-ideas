angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken) {
	var authFactory = {};

	// handle login
	authFactory.login = function(username, password) {
		return $http.post('/api/authenticate', {
			username: username,
			password: password
		})
		.success(function(data) {
			AuthToken.setToken(data.token);
			return data;
		});
	};

	// handle logout
	authFactory.logout = function() {
		AuthToken.setToken();
	};

	// check if user is logged in
	authFactory.isLoggedIn = function() {
		if (AuthToken.getToken()) return true;
		else return false;
	};

	// get the user info
	authFactory.getUser = function() {
		if (AuthToken.getToken()) return $http.get('/api/me', { cache: false });
		else return $q.reject({ message: 'User has no token' });
	};

	return authFactory;
})

.factory('AuthToken', function($window) {
	var authTokenFactory = {};

	// get the token
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	// set the token or clear the token
	authTokenFactory.setToken = function(token) {
		if (token) $window.localStorage.setItem('token', token);
		else $window.localStorage.removeItem('token');
	};


	return authTokenFactory;
})

.factory('AuthInterceptor', function($q, AuthToken) {
	var interceptorFactory = {};

	//attach token to every request
	interceptorFactory.request = function(config) {
		var token = AuthToken.getToken();

		if (token) config.headers['x-access-token'] = token;

		return config;
	};

	// redirect if a token doesn't authnticate
	interceptorFactory.responseError = function(response) {
		if (response.status == 403) {
			AuthToken.setToken();
			$location.path('/login');
		}

		return $q.reject(response);
	};

	return interceptorFactory;
});