const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('express');
const dotenv = require('dotenv');
const { coverApi } = require('./src/routes/cover');
const { ussdApi } = require('./src/routes/ussd');
const { connectDB } = require('./src/db');
const { bot } = require('./src/routes/telegraph');

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

connectDB();

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.post('/', coverApi);
app.post('/ussd', ussdApi);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log('Server running');
});
