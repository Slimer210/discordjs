const mongodb = require("mongodb");
const fml = require("./fuck");
const logger = require("npmlog");
require('dotenv').config();

const DB_ENDPOINT = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qp86kcn.mongodb.net/?retryWrites=true&w=majority`

function connect() {
    logger.info("[DB] Connecting Database")
    

    // var connection = mongodb.MongoClient.connect(DB_ENDPOINT);
    // logger.info("[DB] Database Connection Success")
    // const db = connection.db("guildConfig");
    // const collection = db.collection("config");
    // connection.close();

    mongodb.MongoClient.connect(DB_ENDPOINT, function(err, database) {
        if (err) throw err;
        logger.info("[DB] Success")
        const datab = database.db("werewolf");
        const coll = datab.collection("guildConfig");
        database.close();
      });
}

function insertGuildConfig(guildID) {
    mongodb.MongoClient.connect(DB_ENDPOINT, function(err, database) {
        if (err) throw err;
        logger.info("[DB] Success")
        const datab = database.db("werewolf");
        const coll = datab.collection("guildConfig");
        coll.insertOne({ 
            guild_id: 'Jackie Robinson', 
            admin_role: 'admin',
            player_role: 'player',
            game_channel: 'game',
            
        });
            
        database.close();
      });
    
}

function readGuildConfig(guildID) {
    console.log(guildID);
    mongodb.MongoClient.connect(DB_ENDPOINT, function(err, database) {
        if (err) throw err;
        logger.info("[DB] Success")
        const datab = database.db("werewolf");
        const coll = datab.collection("guildConfig");
        database.close();
    });
}

module.exports.insertGuildConfig = insertGuildConfig;
module.exports.readGuildConfig = readGuildConfig;
module.exports.lut = require("./fuck");
module.exports.connect = connect;
