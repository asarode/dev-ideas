// =============================================================
// MODULES 
// =============================================================
var express 	   = require('express');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var bcrypt 		   = require('bcrypt-nodejs');
var jwt 		   = require('jsonwebtoken');
var passport 	   = require('passport');
var githubStrategy = require('passport-github').Strategy;
var oauth 		   = require('./config/oauth');
var cookieParser   = require('cookie-parser');
var session 	   = require('express-session');


var superSecret = 'devideasforlifegoodsir';

var app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(session({ 
		secret: superSecret,
		resave: false,
		saveUninitialized: false 
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(__dirname + '/public'))

	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
		next();
	});

// =============================================================
// MODELS
// =============================================================
var User = require('./app/models/users');
var Post = require('./app/models/posts');
var Comment = require('./app/models/comments');

// =============================================================
// ROUTES
// =============================================================
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		console.log(user);
		if (!err) done(null, user);
		else done(err, null);
	});
});

passport.use(new githubStrategy({
		clientID: oauth.github.clientID,
		clientSecret: oauth.github.clientSecret,
		callbackURL: oauth.github.callbackURL 
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ oauthID: profile.id }, function(err, user) {
			if (err) { console.log(err); }
			if (!err && user != null) {
				done (null, user);
			} else {
				// create a new user if needed
				var user = new User({
					oauthID: profile.id,
					name: profile.displayName,
					username: profile.username,
					avatarURL: profile._json.avatar_url,
					profileURL: profile.profileUrl,
					createdAt: Date.now(),
					upvotes: [],
					hacklist: [],
				});

				user.save(function(err) {
					if (err) console.log(err);
					else done(null, user);
				});
			}
		});
	}
));

var ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}


// test route accessed at GET http://localhost:5000/api
app.get('/', function(req, res) {
	res.json({ message: "yo, it's the Dev Ideas api" })
});
app.get('/account', ensureAuthenticated, function(req, res) {
	User.findById(req.session.passport.user, function(err, user) {
		if (err) console.log(err);
		else res.json({ user: user });
	});
});
app.get('/auth/github', passport.authenticate('github'), 
	function(res, res) {

	});
app.get('/auth/github/callback', passport.authenticate('github', { 
	failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/account')
	});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
// var router = require('./app/routes')(app, express);
// app.use('/api', router);


// =============================================================
// DATABASE
// =============================================================
var database = require('./config/database');
mongoose.connect(database.url, function(err, db) {
	if (err) console.log(err);
	else console.log("Connected to database!");
});
console.log(database.url);

// =============================================================
// START APP
// =============================================================
app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function() {

	var port = app.get('port');

	console.log('Example app listening at on port %s', port);

});
