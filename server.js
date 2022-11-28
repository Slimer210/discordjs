const http = require('http');
const moment = require('moment');
require('dotenv').config()
const logger = require('npmlog');
const database = require('./database')
const Bot = require('./bot')

logger.info('Starting Client...');

// Serious Keep-Alive Code
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('hello~');
	res.end();
  }).listen(process.env.HTTP_PORT);

Bot.connect(process.env.BOT_TOKEN);
logger.info("Successfully Initialized");