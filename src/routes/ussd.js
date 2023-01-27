const ussdApi = (req, res) => {
	const { phoneNumber, text, sessionId } = req.body;

	if (text === '') {
		response = 'CON Enter your name';
	}
	return res.status(201).json({
		name: 'here',
	});
};

module.exports = {
	ussdApi,
};
