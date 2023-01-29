const { Claim } = require('../models/claims');
const { Cover } = require('../models/cover');

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

module.exports = {
	claim,
};
