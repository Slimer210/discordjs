const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
const moment = require('moment');
require('dotenv').config()
const logger = require('npmlog');
const database = require('../database')
const fs = require('node:fs');
const path = require('node:path');

function registerCommand(token, appid) {
	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({ version: '10' }).setToken(token);

	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationCommands(appid),
				{ body: commands },
			);

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(error);
		}
	})();
}

client.on('ready', () => {
	logger.info(`[BOT] Logged in as ${client.user.tag}!`);
	database.connect();
});

client.on("guildCreate", guild => {
	logger.warn("Bot added to guild: " + guild.name);
	const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
	console.log(channel)
	channel.send("Thanks for invite me")
	database.readGuildConfig(guild.id);
	//Your other stuff like adding to guildArray
})

client.on("guildDelete", guild => {
	logger.warn("Bot removed from guild: " + guild.name);
	//remove from guildArray
})

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {
		await interaction.reply("lol");
	}
	if (interaction.isChatInputCommand()) {
		console.log(interaction.user.tag + " use command: " + interaction.commandName)
	}

	// if (interaction.commandName === 'ping') {
	// 	console.log(interaction.user.tag + " use command: " + interaction.commandName)

	// 	await interaction.reply('Pong!');
	// }

	if (interaction.commandName === 'kill') {
		await interaction.reply('Server is down');
		client.destroy();
	}

	if (interaction.commandName === 'lol') {
		const timeEmbed = new EmbedBuilder()
			.setColor(0x8C82FF)
			.setTitle('Time Information')
			.setAuthor({ name: "Slimer's Bot" })
			.addFields({ name: 'Current Server Time', value: moment().format('MMMM Do YYYY, h:mm:ss a'), inline: true })
			.setTimestamp()
			.setFooter({ text: 'Sent by A Trash Bot' });
		await interaction.reply({ embeds: [timeEmbed] });
	}

	if (interaction.commandName === 'time') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('secondary')
					.setLabel('Fuck my Life!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });
	}


});

client.on('messageCreate', async (message) => {
	console.log(message.content);
});

function connectBot(token, appid) {
	registerCommand(token, appid);
	try {
		client.login(token);
		logger.info('Successfully connected')
	} catch (err) {
		console.log(err);
	}

}
function disconnectBot() {
	try {
		client.destroy();
		logger.info('Successfully disconnected')
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	connect: connectBot,
	disconnect: disconnectBot,
};
