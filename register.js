const { REST, Routes } = require('discord.js');
const cute = require('dotenv').config();

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
    {
        name: 'kill',
        description: '(DEV) Kill the server',
    },
	{
		name: 'time',
		description: 'Displays current time of the server',
	},
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();