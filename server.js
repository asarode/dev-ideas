// =============================================================
// MODULES 
// =============================================================
var express 	= require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public')) // Might need this, not sure..


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



// =============================================================
// START APP
// =============================================================
var server = app.listen(8080, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});
