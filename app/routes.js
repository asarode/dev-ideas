// var User = require('./models/users');
// var Post = require('./models/posts');
// var Comment = require('./models/comments'); 

// var jwt = require('jsonwebtoken');
// var superSecret = 'devideasforlifegoodsir';

// module.exports = function(app, express) {


// 	var router = express.Router();

// 	// test route accessed at GET http://localhost:8080/api
// 	router.get('/', function(req, res) {
// 		res.json({ message: "yo, it's the Dev Ideas api" })
// 	});

// 	router.post('/authenticate', function(req, res) {
// 		User.findOne({ username: req.body.username }, function(err, user) {
// 			if (!user) {
// 				res.json({ success: false, message: 'Authentication failed. User not found.'});
// 			} else if (user) {
// 				var validPassword = user.comparePassword(req.body.password);
// 				if (!validPassword) {
// 					res.json({ success: false, message: 'Authenticatioin failed. Wrong password.' });
// 				} else {
// 					var token = jwt.sign(user, superSecret, {
// 						expiresInMinutes: 1440
// 					});

// 					res.json({
// 						success: true,
// 						message: 'Enjoy your token!',
// 						token: token
// 					});
// 				}
// 			}

// 		});
// 	});

// 	router.post('/users', function(req, res) {
// 		// create a new user with the parameters

// 		var user = new User();

// 		user.username = req.body.username;
// 		user.email = req.body.email;  
// 		user.password = req.body.password;
// 		user.createdAt = Date.now();
// 		user.upvotes = [];
// 		user.hacklist = [];    

// 		user.save(function(err) {
// 			if (err) res.send(err);
// 			else res.json(user);
// 		});
// 	});

// 	router.get('/posts', function(req, res) {
// 		// return all post objects
// 		Post.find().sort('-postedAt').exec(function(err, data) {
// 			if (err) res.send(err);

// 			res.json(data);
// 		});
// 	});

// 	router.get('/post/:postId/comments', function(req, res) {
// 			// return comments for a given postId
// 	});


// 	// middleware for all requests
// 	router.use(function(req, res, next) {
// 		var token = req.body.token || req.params.token || req.headers['x-access-token'];

// 		if (token) {
// 			jwt.verify(token, superSecret, function(err, decoded) {
// 				if (err) {
// 					res.status(403).send({ 
// 	        			success: false, 
// 	        			message: 'Failed to authenticate token.' 
// 	    			});
// 				} else {
// 					req.decoded = decoded;
// 					next();
// 				}
// 			});
// 		} else {
// 			res.status(403).send({ 
//    	 			success: false, 
//    	 			message: 'No token provided.' 
//    	 		});
// 		}

// 	});

// 	// =============================================================
// 	// AUTHENTICATED ROUTES
// 	// =============================================================

// 	router.get('/me', function(req, res) {
// 		res.send(req.decoded);
// 	});

// 	router.get('/users', function(req, res) {
// 		// return all user objects
// 		User.find(function(err, data) {
// 			if (err) res.send(err);

// 			res.json(data);
// 		});
// 	});

// 	router.get('/users/:userId', function(req, res) {
// 		User.findById(req.params.userId, function(err, user) {
// 			if (err) res.send(err);

// 			res.json(user);
// 		});
// 	});

// 	router.put('/users/:userId', function(req, res) {
// 		User.findById(req.params.userId, function(err, user) {
// 			if (err) res.send(err);

// 			if (req.body.username) user.username = req.body.username;
// 			if (req.body.email) user.email = req.body.email;
// 			if (req.body.password) user.password = req.body.password;

// 			user.save(function(err) {
// 				if (err) res.send(err);

// 				res.json({ message: 'User updated!' });
// 			});
// 		});
// 	});

// 	router.delete('/users/:userId', function(req, res) {
// 		User.remove({ _id: req.params.userId }, function(err, user) {
// 			if (err) res.send(err);

// 			res.json({ message: 'Successfully deleted!' });
// 		});
// 	});

// 	router.post('/posts', function(req, res) {
// 		var post = new Post();

// 		post.createdAt = Date.now();
// 		post.postedAt = Date.now();
// 		post.author = req.body.author;
// 		post.userId = req.body.userId;
// 		post.title = req.body.title;
// 		post.body = req.body.body;
// 		post.commentCount = 0;
// 		post.commenters = [];
// 		post.lastCommentedAt = Date.now();
// 		post.upvoteCount = 0;
// 		post.upvoters = [];
// 		post.isActive = false;
// 		post.isPending = true;
// 		post.isRejected = false;
// 		post.isDeleted = false;

// 		post.save(function(err) {
// 			if (err) res.send(err);
// 			else res.json({ message: 'Post created!' });
// 		});
// 	});

// 	router.post('/posts/:postId/comment', function(req, res) {
// 		var comment = new Comment();

// 		comment.createdAt = Date.now();
// 		comment.author = req.body.author;
// 		comment.userId = req.body.userId;
// 		comment.body = req.body.body;
// 		comment.isActive = true;
// 		comment.isDeleted = false;

// 		comment.save(function(err) {
// 			if (err) res.send(err);
// 			else res.json({ message: 'Comment created!' });
// 		});
// 	});

// 	router.put('/posts/:postId/upvote/', function(req, res) {
// 		Post.findById(req.params.postId, function(err, post) {
// 			if (err) res.send(err);

// 			if (post.upvoters.indexOf(req.body.username) == -1) {
// 				post.upvoters.push(req.body.username);
// 				post.upvoteCount++;
// 				post.save(function(err) {
// 					if (err) res.send(err);
// 					else res.json({ message: 'upvote added!', post: post });
// 				});
// 			} else {
// 				var index = post.upvoters.indexOf(req.body.username);
// 				post.upvoters.splice(index, 1);
// 				post.upvoteCount--;
// 				post.save(function(err) {
// 					if (err) res.send(err);
// 					else res.json({ message: 'upvote removed!', post: post });
// 				});
// 			}
// 		})
// 	});

// 	return router;
// }