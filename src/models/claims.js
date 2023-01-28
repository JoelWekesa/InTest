const mongoose = require('mongoose');

const claimsSchema = mongoose.Schema({
	cover: {
		type: String,
		required: true,
	},

	amount: {
		type: String,
		amount: Number,
	},
});

const Claim = mongoose.model('Claim', claimsSchema);

module.exports = {
	Claim,
};
