const credentials = {
	apiKey: 'd6cf9efb2745e300ad68f52e944ef0f887525a44f6beb5e9ef4cb6f6f2090868',
	username: 'sandbox',
};

const AfricasTalking = require('africastalking')(credentials);

const sms = AfricasTalking.SMS;

const sendMessage = ({ phoneNumber, message }) => {
	const options = {
		to: [phoneNumber],
		message,
		from: '21635',
	};

	sms
		.send(options)
		.then((data) => {
			console.log('data', data);
		})
		.catch((err) => {
			console.log(err.message);
		});
};

module.exports = {
	sendMessage,
};
