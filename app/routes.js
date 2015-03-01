var User = require('./models/users');
var Post = require('./models/posts');
var Comment = require('./models/comments'); 

module.exports = function(app) {

	app.get('/api/users', function(req, res) {
		// return all user objects
		res.json({ message: "get users" });
	});

	app.post('/api/user', function(req, res) {
		// create a new user with the parameters

		var user = new User();

		user.username = req.body.username;
		user.email = req.body.email;  
		user.createdAt = Date.now();
		user.upvotes = [];
		user.hacklist = [];    

		user.save(function(err) {
			if (err) res.send(err);
			else res.json({ message: 'User created!' });
		});
	});

	app.get('/api/posts', function(req, res) {
		// return all post objects
		res.json({ message: "get posts" });
	});

	app.post('/api/post', function(req, res) {
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

	app.get('/api/post/:postId/comments', function(req, res) {
		// return comments for a given postId
	});

	app.post('/api/post/:postId/comment', function(req, res) {
		var comment = new Comment();

		comment.createdAt = Date.now();
		comment.author = req.body.author;
		comment.userId = req.body.userId;
		comment.body = req.body.body;
		comment.isActive = true;
		comment.isDeleted = false;
	});
}