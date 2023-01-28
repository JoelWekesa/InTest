const { Cover } = require('../models/cover');

const coverApi = async (req, res) => {
	const cover = await Cover.create({
		cover: Math.random().toString(32).slice(2),
	})
		.then((data) => {
			return res.status(201).json(data);
		})
		.catch((err) => {
			return res.status(400).json({
				error: err.message,
			});
		});
	return cover;
};

module.exports = {
	coverApi,
};
