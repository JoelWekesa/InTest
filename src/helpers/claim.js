const { Claim } = require('../models/claims');
const { Cover } = require('../models/cover');

const claim = async (cover, amount) => {
	const n = await Cover.findOne({ cover })
		.then(async (data) => {
			if (!data) {
				return 'Invalid policy number';
			}

			return await Claim.create({
				cover,
				amount: +amount,
			})
				.then(
					() =>
						`New claim for cover of policy number ${cover} for KSHs ${amount} has been made`
				)
				.catch((err) => err.message);
		})
		.catch((err) => {
			return 'An error occurred';
		});
	return n;
};

module.exports = {
	claim,
};
