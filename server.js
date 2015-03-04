// =============================================================
// MODULES 
// =============================================================
var express 	= require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var bcrypt 		= require('bcrypt-nodejs');
var jwt 		= require('jsonwebtoken');
var superSecret = 'devideasforlifegoodsir';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public')) // Might need this, not sure..


// =============================================================
// API
// =============================================================
var User = require('./app/models/users');

var router = express.Router();

router.post('/authenticate', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({ success: false, message: 'Authenticatioin failed. Wrong password.' });
			} else {
				var token = jwt.sign(user, superSecret, {
					expiresInMinutes: 1440
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}

	});
});

// middleware for all requests
router.use(function(req, res, next) {
	console.log('Request: ' + req);
	console.log('Response: ' + res);

	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, superSecret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
			}
		});
	} else {
		return res.json({ success: false, message: 'No token provided.' });
	}

	next();
});

// test route accessed at GET http://localhost:8080/api
router.get('/', function(req, res) {
	res.json({ message: "yo, it's the Dev Ideas api" })
});


// =============================================================
// ROUTES
// =============================================================
app.use('/api', router);
require('./app/routes')(router);

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
