// =============================================================
// MODULES 
// =============================================================
var express 	 = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var bcrypt 		 = require('bcrypt-nodejs');
var jwt 		 = require('jsonwebtoken');


var superSecret = 'devideasforlifegoodsir';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
var router = require('./app/routes')(app, express);
app.use('/api', router);

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
