const conf = require("../../../settings")
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently = new Set();
const FunCountCoin = require("../../models/FunGame")

const { Client, Message, EmbedBuilder, PermissionsBitField, StringSelectMenuBuilder} = Discord = require("discord.js");
module.exports.run = async (client, message, args, durum, ) => {
  if (!message.guild) return;
	let kanalcoin = !conf.coinchat.includes(message.channel.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels);
    if(kanalcoin) return;

            if (talkedRecently.has(message.author.id)) {
                return message.channel.send(`${client.emojis.cache.find(a => a.name === "wex_info")} Hey Dur Bakalım! Daily komutunu \`24 Saatte\` bir kullanabilirsin.`);
         } else {     
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            message.delete();

              talkedRecently.delete(message.author.id);
            }, 86400000);
        }
            const sayı = Math.floor(Math.random() * 500);
            message.reply(`${client.emojis.cache.find(a => a.name === "wex_imaj")} Bugün **${sayı}** \`FunCoin\` kazandın.`)    
            await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: sayı } }, { upsert: true });

       
}
exports.conf = {aliases: ["daily"]}
exports.help = {name: 'günlük'}