const { Claim } = require('../models/claims');
const { Cover } = require('../models/cover');
const { EventEmitter } = require('node:events');

const eventEmitter = new EventEmitter();

const claim = async ({ phoneNumber, cover, amount }) => {
	const n = await Cover.findOne({ cover })
		.then(async (data) => {
			if (parseInt(amount) > 0) {
				if (!data) {
					return 'Invalid policy number';
				}

				return await Claim.create({
					cover,
					amount: parseInt(amount),
				})
					.then(() => {
						const message = `New claim for cover of policy number ${cover} for KSHs ${amount} has been made`;
						eventEmitter.emit('claim.made', message);
						return message;
					})
					.catch((err) => err.message);
			}

			return 'Invalid amount';
		})
		.catch((err) => {
			return 'An error occurred';
		});
	return n;
};

eventEmitter.on('claim.made', (data) => {
	console.log('data', data);
});

module.exports = {
	claim,
};
