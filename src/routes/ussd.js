const firstResponse = '0: Check status \n 1: Make claim';

const ussdApi = (req, res) => {
	const { text } = req.body;
	let response;
	console.log(res.body);

	if (text === '') {
		response = 'CON ' + firstResponse;
	}
	if (text !== '') {
		let arr = text.split('*');
		const valid = ['0', '1'];
		if (!valid.includes(text)) {
			arr.pop();
			response = 'Invalid Selection ' + firstResponse;
		}

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
