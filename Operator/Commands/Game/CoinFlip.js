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
     let argss = args[0]
     if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     let Coin = db ? db.CoinCount : 0;
     if(Coin < argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Oynamak istediğin değer kadar \`FunCoin\` coinin bulunmamakta.`)
     let kazanç = ((Number(args[0]) * 2))
     const cevaplar = ["win","lost","win","lost","win","lost","lost","lost","win","lost"];                        
     var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
     let msg = await message.channel.send(`**${message.member.user.username}** ${argss} **${conf.GameServerName}** Coini değerinde coin çeviriyorum\nCoin çevriliyor ${client.emojis.cache.find(res => res.name === "wex_coin")}`);
     if (cevap === "lost") {
         msg.edit({content: `**${message.member.user.username}** ${argss} **${conf.GameServerName}** coini değerinde coin çevrildi..\nTüh Bee! ${client.emojis.cache.find(res => res.name === "wex_coin")} **${argss}** **${conf.GameServerName}** coini kaybettin!`});
         await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: -argss, yazıtureGame: 1 } }, { upsert: true });
     } else if (cevap === "win") {
             msg.edit({content: `**${message.member.user.username}** **__${argss}__** **${conf.GameServerName}** coini değerinde coin çevrildi..\nHelalllğ! ${client.emojis.cache.find(res => res.name === "wex_coin")} **${kazanç}** **${conf.GameServerName}** coini kazandın!`});
             await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: kazanç, yazıtureGame: 1 } }, { upsert: true });
         }

}
exports.conf = {aliases: ["cf"]}
exports.help = {name: 'coinflip'}