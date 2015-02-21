var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({

	createdAt: Date,

	author: String, 

	userId: ObjectId,

	postedAt: Date, // comments will generally be created and posted at the same time

	postId: ObjectId, // id of the post that this comment is about

	body: String,

	isActive: Boolean,

	isDeleted: Boolean

});