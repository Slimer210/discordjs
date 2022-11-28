const mongodb = require("mongodb");
const fml = require("./fuck");
const logger = require("npmlog");
require('dotenv').config();

logger.info("[DB] Connecting Database")
const DB_ENDPOINT = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qp86kcn.mongodb.net/?retryWrites=true&w=majority`

mongodb.MongoClient.connect(DB_ENDPOINT);
logger.info("[DB] Database Connection Success")

function readGuildConfig(guildID) {
    console.log(guildID);
}

module.exports.readGuildConfig = readGuildConfig;
module.exports.lut = require("./fuck");