const { Cover } = require('../models/cover');

const firstResponse = '0: Check status \n 1: Make claim';

const ussdApi = (req, res) => {
	// Read variables sent via POST from our SDK
	const { sessionId, serviceCode, phoneNumber, text } = req.body;

	let response = '';

	if (text === '') {
		// This is the first request. Note how we start the response with CON
		response = `CON Welcome to Incourage. Please select a service
        1. View cover status
        2. Make a claim`;
	} else if (text === '1' || text === '2') {
		// Business logic for first level response
		response = `CON Enter Policy Number
        `;
	} else {
		let arr = text.split('*');
		if (arr[0] === '1') {
			const cover = arr[1];

			const status = async () => {
				const policy = await Cover.findOne({ cover })
					.then((data) => {
						if (!data) {
							response = `END Could not find cover for policy number ${cover}`;
						} else {
							response = `END Your cover of policy number ${cover} is ${data.status}`;
						}
					})
					.catch((err) => {
						response = `END ${err.message}`;
					});

				return policy;
			};

			status();
		}
	}
	// Print the response onto the page so that our SDK can read it
	res.set('Content-Type: text/plain');
	res.send(response);
	// DONE!!!
};

module.exports = {
	ussdApi,
};
