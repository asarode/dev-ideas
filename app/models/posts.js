var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({

	createdAt: Date,

	postedAt: Date,

	author: String,

	userId: ObjectId,

	title: String,

	body: String,

	commentCount: Number,

	commenters: [ObjectId],

	lastCommentedAt: Date,

	upvoteCount: Number,

	upvoters: [String],

	isActive: Boolean,

	isPending: Boolean,

	isRejected: Boolean,

	isDeleted: Boolean

});

module.exports = mongoose.model('Post', PostSchema);


