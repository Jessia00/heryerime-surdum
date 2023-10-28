const conf = require("../../../settings")
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently2 = new Set();
const FunCountCoin = require("../../models/FunGame")
const { Client, Message, EmbedBuilder, PermissionsBitField, StringSelectMenuBuilder} = Discord = require("discord.js");
module.exports.run = async (client, message, args, durum, ) => {
    if (!message.guild) return;
	let kanalcoin = !conf.coinchat.includes(message.channel.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels);
    if(kanalcoin) return;

    if (!conf.sahip.some(x => x === message.author.id)) return
     let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     if (!target) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir üye belirtmelisin.`)
     let argss = args[1]
     if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
message.reply({content: `**${message.member.user.username}** **__${argss}__** **FunCoin** coini **${target.user.username}** adlı üyeye eklendi.`});
     await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: target.id }, { $inc: { CoinCount: argss } }, { upsert: true });


}
exports.conf = {aliases: ["coin-ekle-admin"]}
exports.help = {name: 'coin-admin'}