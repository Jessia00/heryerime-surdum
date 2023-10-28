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
        const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
    const coinCountUser = db ? db.CoinCount : 0;
    const yazıturaCountUser = db ? db.yazıtureGame : 0;
    const rulesCountUser = db ? db.ruletGame : 0;
    const Embedcik = new EmbedBuilder().setDescription(`Sunucuda Toplam **${coinCountUser} ${message.guild.name}** coinin bulunmakta.\n\n\`\`\`diff\n-Yazı-Tura ${yazıturaCountUser ||"0"} - Rulet ${rulesCountUser || "0"}\`\`\``)
   if(!args[0]) return message.reply({embeds: [Embedcik]})    

    if(args[0] == "help") {
        const Embedcik = new EmbedBuilder()
        .setDescription(`Selamlar \`${message.guild.name}\` Üyeleri, \`FunCoin\` Sistemimiz hakkındaki bilgiler aşşağıda belirtilmiştir.`)
        .addFields([{name: `FunCoin Nasıl Oynanır?`,value: `${conf.prefix}<cf/coinflip> <Miktar>"`,}])
        .addFields([{name: `Nasıl Coin Kazanacağım?`,value: `\`•\` 24 saatte bir kullabileceğin \`${conf.prefix}daily\` komutu ile \`0 - 500\` arasında coin kazanabilirsin.\n\`•\` Sunucumuza Üye davet ederek her bir üye \`75 FunCoin'e\` eşittir.\n\`•\` Tag alarak \`600 FunCoin\` kazanabilirsin.`,}])

        message.reply({embeds: [Embedcik]})    
    }
       
}
exports.conf = {aliases: ["aquacoin"]}
exports.help = {name: 'coinaqua'}