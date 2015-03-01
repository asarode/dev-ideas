var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({

	username: String,

	email: String,

	createdAt: Date,

	upvotes: [Schema.ObjectId],

	hacklist: [Schema.ObjectId]

});

module.exports = mongoose.model('User', UserSchema);