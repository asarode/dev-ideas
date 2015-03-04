var User = require('./models/users');
var Post = require('./models/posts');
var Comment = require('./models/comments'); 

var jwt = require('jsonwebtoken');
var superSecret = 'devideasforlifegoodsir';

module.exports = function(router) {

	router.get('/users', function(req, res) {
		// return all user objects
		User.find(function(err, data) {
			if (err) res.send(err);

			res.json(data);
		});
		// res.json({ message: "get users" });
	});

	router.post('/user', function(req, res) {
		// create a new user with the parameters

		var user = new User();

		user.username = req.body.username;
		user.email = req.body.email;  
		user.password = req.body.password;
		user.createdAt = Date.now();
		user.upvotes = [];
		user.hacklist = [];    

		user.save(function(err) {
			if (err) res.send(err);
			else res.json(user);
		});
	});

	router.get('/posts', function(req, res) {
		// return all post objects
		Post.find(function(err, data) {
			if (err) res.send(err);

			res.json(data);
		});
		// res.json({ message: "get posts" });
	});

	router.post('/post', function(req, res) {
		var post = new Post();

		post.createdAt = Date.now();
		post.postedAt = Date.now();
		post.author = req.body.author;
		post.userId = req.body.userId;
		post.title = req.body.title;
		post.body = req.body.body;
		post.commentCount = 0;
		post.commenters = [];
		post.lastCommentedAt = Date.now();
		post.upvoteCount = 0;
		post.upvoters = [];
		post.isActive = false;
		post.isPending = true;
		post.isRejected = false;
		post.isDeleted = false;

		post.save(function(err) {
			if (err) res.send(err);
			else res.json({ message: 'Post created!' });
		});
	});

	router.get('/post/:postId/comments', function(req, res) {
		// return comments for a given postId
	});

	router.post('/post/:postId/comment', function(req, res) {
		var comment = new Comment();

		comment.createdAt = Date.now();
		comment.author = req.body.author;
		comment.userId = req.body.userId;
		comment.body = req.body.body;
		comment.isActive = true;
		comment.isDeleted = false;

		comment.save(function(err) {
			if (err) res.send(err);
			else res.json({ message: 'Comment created!' });
		});
	});
}