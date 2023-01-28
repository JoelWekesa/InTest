const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('express');
const dotenv = require('dotenv');
const { firstApi } = require('./src/routes/first');
const { ussdApi } = require('./src/routes/ussd');
const { connectDB } = require('./src/db');
const { status } = require('./src/helpers/status');
const { claim } = require('./src/helpers/claim');

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

connectDB();

app.post('/', firstApi);
app.post('/ussd', ussdApi);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log('Server running');
});
