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
		} else {
			response =
				'End Thank you for making your claim. A respondent will get back to you';
		}
	}

	setTimeout(() => {
		res.send(response);
	}, 2000);
};

module.exports = {
	ussdApi,
};
