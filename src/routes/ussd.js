const ussdApi = (req, res) => {
	const { text } = req.body;
	let response;
	console.log(res.body);

	if (text === '') {
		response = 'CON Enter your name';
	}
	if (text !== '') {
		let arr = text.split('*');
		if (arr.length === 1) {
			response = 'CON Enter your policy number';
		} else if (arr.length === 2) {
			response = 'END Process has been completed';
		}
	}

	setTimeout(() => {
		res.send(response);
	}, 2000);
};

module.exports = {
	ussdApi,
};
