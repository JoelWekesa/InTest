const { claim } = require('../helpers/claim');
const { status } = require('../helpers/status');
const { EventEmitter } = require('node:events');

const eventEmitter = new EventEmitter();

const ussdApi = async (req, res) => {
	// Read variables sent via POST from our SDK
	let { sessionId, serviceCode, phoneNumber, text } = req.body;
	const valid = ['1', '2'];
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
			const result = await status({ cover });

			const compose = {
				phoneNumber,
				result,
			};

			eventEmitter.emit('view.status', compose);

			response = `END ${result}`;
		} else if (arr[0] === '2') {
			const cover = arr[1];
			const result = await status({ cover });
			if (result === 'Invalid policy number') {
				response = `END ${result}`;
			} else if (result !== 'Invalid policy number') {
				response = `CON Enter claim amount`;
				arr = text.split('*');

				if (arr.length === 3) {
					const cover = arr[1];
					const amount = arr[2];
					const claimResult = await claim({ cover, amount });
					response = `END ${claimResult}`;
				}
			}
		} else if (!valid.includes(arr[0])) {
			response = `END Invalid selection`;
		}
	}
	// Print the response onto the page so that our SDK can read it
	res.set('Content-Type: text/plain');
	res.send(response);
	// DONE!!!
};

eventEmitter.on('view.status', (data) => {
	const { phoneNumber, result } = data;
	console.log(phoneNumber);
	console.log(result);
});

module.exports = {
	ussdApi,
};
