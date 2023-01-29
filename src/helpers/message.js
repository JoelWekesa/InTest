require('dotenv').config();

const credentials = {
	apiKey: process.env.AT_API_KEY,
	username: process.env.AT_USERNAME,
};

const AfricasTalking = require('africastalking')(credentials);

const sms = AfricasTalking.SMS;

const sendMessage = ({ phoneNumber, message }) => {
	const options = {
		to: [phoneNumber],
		message,
		from: '21635',
	};

	sms.send(options);
};

module.exports = {
	sendMessage,
};
