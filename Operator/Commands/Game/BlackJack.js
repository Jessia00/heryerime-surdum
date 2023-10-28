const conf = require("../../../settings")
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently2 = new Set();
const FunCountCoin = require("../../models/FunGame")
const Game = require('../../models/BlackJack')

const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
	let kanalcoin = !conf.coinchat.includes(message.channel.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels);
    if(kanalcoin) return;
    if (!message.guild) return;
        if (talkedRecently2.has(message.author.id)) {
            return message.channel.send(`${client.emojis.cache.find(a => a.name === "wex_info")} Hey Dur Bakalım! Daily komutunu \`10 Saniyede\` bir kullanabilirsin.`);
     } else {     
        talkedRecently2.add(message.author.id);
        setTimeout(() => {

        talkedRecently2.delete(message.author.id);
        }, 10000);
     }
     const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
     let argss = args[0]
     if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
     let Coin = db ? db.CoinCount : 0;
     if(Coin < argss) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_info")} Hey Dur Bakalım! Oynamak istediğin değer kadar \`FunCoin\` coinin bulunmamakta.`)

	 let Ödül = Number(argss * 2)
	 let game = await Game(message, { buttons: true, transition: "edit", bahis: argss, odul: Ödül, doubleodul: Number(Ödül * 2) }) 
	 let puan = 0
	 if(game.ycard) game.ycard.forEach(c => {
		 puan += c.value
	 })
	 if(game.result.includes("DOUBLE WIN") || game.result == "BLACKJACK") {
		await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: Ödül * 2, yazıtureGame: 1 } }, { upsert: true });
	 } else if(game.result.includes("WIN") || game.result == "SPLIT LOSE-WIN" || game.result == "SPLIT WIN-LOSE" || game.result == "SPLIT LOSE-DOUBLE WIN" || game.result == "SPLIT TIE-DOUBLE WIN" || game.result == "SPLIT DOUBLE WIN-TIE" || game.result == "SPLIT DOUBLE WIN-LOSE" || game.result == "SPLIT WIN-TIE" || game.result == "SPLIT TIE-WIN") {
		 await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: Ödül * 2, yazıtureGame: 1 } }, { upsert: true });

	 } else if(game.result.includes("INSURANCE")) {
		await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: argss, yazıtureGame: 1 } }, { upsert: true });
	} else if(game.result.includes("TIE")) {
		 await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: argss, yazıtureGame: 1 } }, { upsert: true });
	 } else if(game.result == "CANCEL" || game.result == "TIMEOUT")  {
	   //  await client.Economy.updateBalance(message.member.id, Number(Miktar), "add", 1)
	 }
  
 

}
exports.conf = {aliases: ["bj"]}
exports.help = {name: 'blakcjakc'}