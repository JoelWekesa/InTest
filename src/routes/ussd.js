const firstResponse = '0: Check status \n 1: Make claim';

const ussdApi = (req, res) => {
	// Read variables sent via POST from our SDK
	const { sessionId, serviceCode, phoneNumber, text } = req.body;

	let response = '';

	if (text === '') {
		// This is the first request. Note how we start the response with CON
		response = `CON Welcome to Incourage. Please select a service
        1. View cover status
        2. Make a claim`;
	} else if (text === '1') {
		// Business logic for first level response
		response = `CON Select Identifier
        1. National ID
        2. Policy Number`;
	} else if (text === '2') {
		// Business logic for first level response
		// This is a terminal request. Note how we start the response with END
		response = `CON Select Identifier
        1. National ID
        2. Policy Number`;
	} else if (text === '1*1') {
		// This is a second level response where the user selected 1 in the first instance
		const nationalID = '12345678';
		const policyNo = 'ACB1234KLM';
		// This is a terminal request. Note how we start the response with END
		response = `END Your cover of policy ${policyNo} associated with ID ${nationalID} is active`;
	} else if (text === '1*2') {
		// This is a second level response where the user selected 1 in the first instance
		const nationalID = '12345678';
		const policyNo = 'ACB1234KLM';
		// This is a terminal request. Note how we start the response with END
		response = `END Your cover of policy ${policyNo} associated with ID ${nationalID} is active`;
	} else if (text === '2*1') {
		response = `CON Select Type of Claim
        1. Accident Claim
        2. Natural Calamity Claim
        3. Riot Claim`;
	} else if (text === '2*1*1') {
		response = `END You have successfully filled an accident claim.
        One of our respondents will reach out for further details.
        `;
	} else if (text === '2*1*2') {
		response = `END You have successfully filled a natural calamity claim.
        One of our respondents will reach out for further details.
        `;
	} else if (text === '2*1*3') {
		response = `END You have successfully filled a natural calamity claim.
        One of our respondents will reach out for further details.
        `;
	} else if (text === '2*2') {
		response = `CON Select Type of Claim
        1. Accident Claim
        2. Natural Calamity Claim
        3. Riot Claim`;
	} else if (text === '2*2*1') {
		response = `END You have successfully filled an accident claim.
        One of our respondents will reach out for further details.
        `;
	} else if (text === '2*2*2') {
		response = `END You have successfully filled a natural calamity claim.
        One of our respondents will reach out for further details.
        `;
	} else if (text === '2*2*3') {
		response = `END You have successfully filled a natural calamity claim.
        One of our respondents will reach out for further details.
        `;
	}

	// Print the response onto the page so that our SDK can read it
	res.set('Content-Type: text/plain');
	res.send(response);
	// DONE!!!
};

module.exports = {
	ussdApi,
};
