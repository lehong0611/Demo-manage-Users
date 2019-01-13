const User = require('../models/user.model');

module.exports = {
	index: async (req, res) => {
		const users = await User.find({});
		res.status(200).json(users);
	},
	newUser: async (req, res) => {
		const newUser = new User({
			userID: req.body.userID,
	        email: req.body.email,
	        password: req.body.password,
	        role: req.body.role
		});

		const user = await newUser.save();
		const users = await User.find({});
		res.status(200).json(users);
	},
	viewDetailUser: async (req, res) => {
		var userID = req.params.userID;

		var user = await User.findOne({ userID:userID});
		res.status(200).json(user);
	},
	updateUserID: async (req, res) => {
		var query = { userID: req.params.userID };
		var user = User.findOneAndUpdate(query, {
			role: req.body.role,
			password: req.body.password
		}, 
		{upsert:true}, 
		(e, raw) => {
			if (e) {
			  res.status(400).send('Invalid user supplied');
			}
			res.send(raw);
		});
	},
	deleteUser: (req, res) => {
		var query = { userID: req.params.userID };
  		User.findOneAndRemove(query, 
		(e, raw) => {
		if (e) {
			res.status(400).send('Invalid username supplied');
		}
		res.send(raw);
	});
	}
}