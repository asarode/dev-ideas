var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({

	username: String,

	email: String,

	createdAt: Date,

	upvotes: [ObjectId],

	hacklist: [ObjectId]

});