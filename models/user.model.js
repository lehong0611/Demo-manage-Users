const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var userSchema = new Schema({
	userID: {
		type: Number,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'user'
	},
	dateAdded: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', userSchema, 'users');

userSchema.plugin(autoIncrement.plugin, {
	model: 'User', field: 'userID'
});

module.exports = User;