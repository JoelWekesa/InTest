const { Telegraf } = require('telegraf');
const { claim } = require('../helpers/claim');
const { status } = require('../helpers/status');
require('dotenv').config();

const helpMessage = `Welcome to Incourage
    1. To view your cover status:
    a. Reply with /status followed by your policy number
    b. For example /status 123456789


    2. To make a claim:
    a. Reply with /claim followed by your policy number followed by amount
    b. For example /claim 123456789 20000


    3. To get help:
    a. Reply with /help

`;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome to incourage'));

bot.help((ctx) => ctx.reply(helpMessage));

bot.command('claim', async (ctx) => {
	let text = ctx.message.text;

	text = text.split(' ');

	if (text.length !== 3) {
		ctx.reply(
			'Invalid choice. Please read these instructions and try again. ' +
				'\n' +
				helpMessage
		);
	}

	const cover = text[1];
	const amount = text[2];

	const result = await claim({ cover, amount });

	ctx.reply(result);
});

bot.command('status', async (ctx) => {
	let text = ctx.message.text;

	text = text.split(' ');

	if (text.length !== 2) {
		ctx.reply(
			'Invalid choice. Please read these instructions and try again. ' +
				'\n' +
				helpMessage
		);
	}

	const cover = text[1];

	const result = await status({ cover });

	ctx.reply(result);
});

bot.hears('Hi', (ctx) => {
	return ctx.reply('Hello there. ' + '\n' + helpMessage);
});

module.exports = {
	bot,
};
