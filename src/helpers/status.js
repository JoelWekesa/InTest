const { Cover } = require('../models/cover');

const status = async (cover) => {
	const n = await Cover.findOne({ cover })
		.then((data) => {
			if (!data) {
				return 'Invalid policy number';
			}

			return `Your policy number ${cover} is ${data.status}`;
		})
		.catch((err) => {
			return 'An error occurred';
		});
	return cover;
};

module.exports = {
	status,
};
