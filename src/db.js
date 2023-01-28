const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('mongo connection successful');
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	connectDB,
};
