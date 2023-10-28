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
        if (talkedRecently2.has(message.author.id)) {
            return message.channel.send(`${client.emojis.cache.find(a => a.name === "wex_info")} Hey Dur Bakalım! Daily komutunu \`10 Saniyede\` bir kullanabilirsin.`);
     } else {     
        talkedRecently2.add(message.author.id);
        setTimeout(() => {
        message.delete();

        talkedRecently2.delete(message.author.id);
        }, 10000);
     }
     const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
     let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     if (!target) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir üye belirtmelisin.`)
     let argss = args[1]
     if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     let Coin = db ? db.CoinCount : 0;
     if(Coin < argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Göndermek istediğin değer kadar \`FunCoin\` coinin bulunmamakta.`)
message.reply({content: `**${message.member.user.username}** **__${argss}__** **FunCoin** coini **${target.user.username}** adlı üyeye gönderdin.`});
     await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: -argss } }, { upsert: true });
     await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: target.id }, { $inc: { CoinCount: argss } }, { upsert: true });


}
exports.conf = {aliases: ["coin-gönder"]}
exports.help = {name: 'cgönder'}