const mongoose = require('mongoose');

const claimsSchema = mongoose.Schema(
	{
		cover: {
			type: String,
			required: true,
		},

		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Claim = mongoose.model('Claim', claimsSchema);

module.exports = {
	Claim,
};
