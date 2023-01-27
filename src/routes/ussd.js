const ussdApi = (req, res) => {
	const { text } = req.body;
	let response;
	console.log(res.body);

	if (text === '') {
		response = 'CON Enter your name';
	}
	if (text !== '') {
		response = 'CON Enter your policy number';
	}

	setTimeout(() => {
		res.send(response);
	}, 2000);
};

module.exports = {
	ussdApi,
};
