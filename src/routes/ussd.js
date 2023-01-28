const { claim } = require('../helpers/claim');
const { status } = require('../helpers/status');

const ussdApi = async (req, res) => {
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
			const result = await status(cover);

			response = `END ${result}`;
		} else if (arr[0] === '2') {
			const cover = arr[1];
			const result = await status(cover);
			if (result === 'Invalid policy number') {
				response = `END ${result}`;
			} else if (result !== 'Invalid policy number') {
				response = `CON Enter claim amount`;
				let arr = text.split('*');

				if (arr.length === 3) {
					const cover = arr[1];
					const amnt = arr[2];

					try {
						const amount = +amnt;
						const claimResult = await claim(cover, amount);
						response = `END ${claimResult}`;
					} catch (error) {
						response = `END Invalid amount`;
					}
				}
			}
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
