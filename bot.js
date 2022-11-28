const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
const http = require('http');
const moment = require('moment');
require('dotenv').config()
const logger = require('npmlog');
const database = require('./database')
const bot = require('./bot')

logger.info('Starting Client...');

database.readGuildConfig("fuck");
database.fuck("Bruh");

client.on('ready', () => {
	logger.info(`[BOT] Logged in as ${client.user.tag}!`);
});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    //Your other stuff like adding to guildArray
})

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    //remove from guildArray
})

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {
		await interaction.reply("lol");
	}
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		console.log(interaction.user.tag + " use command: " + interaction.commandName)
		await interaction.reply('Pong!');
	}

	if (interaction.commandName === 'kill') {
		await interaction.reply('Server is down');
		client.destroy();
	}

	if (interaction.commandName === 'lol') {
		const timeEmbed = new EmbedBuilder()
			.setColor(0x8C82FF)
			.setTitle('Time Information')
			.setAuthor({ name: "Slimer's Bot"})
			.addFields({ name: 'Current Server Time', value: moment().format('MMMM Do YYYY, h:mm:ss a'), inline: true })
			.setTimestamp()
			.setFooter({ text: 'Sent by A Trash Bot'});
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

// Serious Keep-Alive Code
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('hello~');
	res.end();
  }).listen(process.env.HTTP_PORT);

client.login(process.env.BOT_TOKEN);

logger.info("Successfully Initialized")