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
					infoTag: '',
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
// app.get('/', function(req, res) {
// 	res.redirect('/home');
// });
// app.get('/*', function(req, res) {
// 	if (req.user) {
// 		res.cookie('user', JSON.stringify({
// 			'username' : user._id
// 		}));
// 	}
// 	res.render('index');
// });
app.get('/loggedin', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : false);
});
app.get('/auth/github', passport.authenticate('github'),
	function(req, res) {
		
	});
app.get('/auth/github/callback', passport.authenticate('github', { 
	failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
	});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
app.get('/posts', function(req, res) {
	// return all post objects
	Post.find().sort('-postedAt').exec(function(err, data) {
		if (err) res.send(err);

		res.json(data);
	});
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
