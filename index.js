const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('express');
const dotenv = require('dotenv');
const { firstApi } = require('./src/routes/first');
const { tMiddleware } = require('./src/middleware/test');
const { ussdApi } = require('./src/routes/ussd');

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const mongoDB = process.env.MONGO_URI;

main().catch((err) => {
	throw new Error(err);
});
async function main() {
	await mongoose.connect(mongoDB);
	console.log('Database connected');
}

app.get('/', [tMiddleware], firstApi);
app.post('/ussd', ussdApi);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log('Server running');
});
