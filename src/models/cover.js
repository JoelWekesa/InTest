const mongoose = require('mongoose');

const coverSchema = mongoose.Schema(
	{
		cover: {
			type: String,
			required: true,
			default: Math.random().toString(32).slice(2),
			unique: true,
		},

		status: {
			type: String,
			required: true,
			default: 'Active',
		},
	},
	{
		timestamps: true,
	}
);

const Cover = mongoose.model('Cover', coverSchema);

module.exports = {
	Cover,
};
