var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({

	createdAt: Date,

	postedAt: Date,

	author: String,

	userId: Schema.ObjectId,

	title: String,

	body: String,

	commentCount: Number,

	commenters: [Schema.ObjectId],

	lastCommentedAt: Date,

	upvoteCount: Number,

	upvoters: [String],

	isActive: Boolean,

	isPending: Boolean,

	isRejected: Boolean,

	isDeleted: Boolean

});

module.exports = mongoose.model('Post', PostSchema);


