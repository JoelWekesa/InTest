const ussdApi = (req, res) => {
	const { text } = req.body;
	let response;
	console.log(res.body);

	if (text === '') {
		response = 'CON Enter your name';
	}

	setTimeout(() => {
		res.send(response);
	}, res.end);
};

module.exports = {
	ussdApi,
};
