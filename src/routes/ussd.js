const { claim } = require('../helpers/claim');
const { status } = require('../helpers/status');

const ussdApi = async (req, res) => {
	// Read variables sent via POST from our SDK
	let { sessionId, serviceCode, phoneNumber, text } = req.body;
	let start = false;
	let arr = [];

	let response = '';

	if (text === '') {
		// This is the first request. Note how we start the response with CON
		response = `CON Welcome to Incourage. Please select a service
        1. View cover status
        2. Make a claim`;
	} else if (text === '1' || text === '2') {
		// Business logic for first level response
		arr = text.split('*');
		response = `CON Enter Policy Number
        `;
	} else {
		arr = text.split('*');
		if (arr[0] === '1') {
			const cover = arr[1];
			const result = await status(cover);

			response = `END ${result}`;
		} else if (arr[0] === '2') {
			const cover = arr[1];
			const result = await status(cover);
			if (result === 'Invalid policy number') {
				response = `END ${result}`;
			} else if (result !== 'Invalid policy number') {
				response = `CON Enter claim amount`;
				arr = text.split('*');

				if (arr.length === 3) {
					const cover = arr[1];
					const amount = arr[2];
					const claimResult = await claim(cover, amount);
					response = `END ${claimResult}`;
				}
			}
		} else if (arr[0] !== 1 || arr[1] !== 2) {
			response = `END Invalid selection`;
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
