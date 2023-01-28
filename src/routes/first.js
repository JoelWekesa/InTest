const { Cover } = require('../models/cover');

const firstApi = async (req, res) => {
	const cover = await Cover.create({
        cover: '1234567890'
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
	firstApi,
};
