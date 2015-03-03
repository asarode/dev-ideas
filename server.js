// =============================================================
// MODULES 
// =============================================================
var express 	= require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public')) // Might need this, not sure..


// =============================================================
// API
// =============================================================
var router = express.Router();

// middleware for all requests
router.use(function(req, res, next) {
	console.log('Request: ' + req);
	console.log('Response: ' + res);
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
