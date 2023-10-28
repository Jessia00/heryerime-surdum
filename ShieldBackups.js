const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");
const conf = require("./settings");
let Bots = global.bots = []
module.exports = Bots
let tkn = []
tkn.push(conf.MODERASYON)
tkn.push(conf.EXECUTIVE)
tkn.push(conf.STATS)
conf.DAGITICILAR.forEach(xx => tkn.push(xx))
tkn.forEach(token => {let clients = new Client({fetchAllMembers: true,intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],presence: { status: "invisible"},});clients.on("ready", () => {Bots.push(clients);})
clients.login(token).then(e => {}).catch(e => {console.log(`${token.substring(Math.floor(token.length / 2))} giriş yapamadı.`);});});




