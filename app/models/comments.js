var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({

	createdAt: Date,

	author: String, 

	userId: Schema.ObjectId,

	postId: Schema.ObjectId, // id of the post that this comment is about

	body: String,

	isActive: Boolean,

	isDeleted: Boolean

});

module.exports = mongoose.model('Comment', CommentSchema);