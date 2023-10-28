const conf = require("../../../settings")
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently2 = new Set();
const FunCountCoin = require("../../models/FunGame")
const { ButtonStyle, SlashCommandBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");

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
     function isOdd(num) { 
        if ((num % 2) == 0) return false;
        else if ((num % 1) == 1) return true;
        }
        const One = new ButtonBuilder().setLabel("⚫️ Siyah").setCustomId("siyahsecim").setStyle(ButtonStyle.Secondary)
        const Two = new ButtonBuilder().setLabel("🔴 Kırmızı").setCustomId("kirmizisecim").setStyle(ButtonStyle.Danger)
        const Three = new ButtonBuilder().setLabel("🟢 Yeşil").setCustomId("yesilsecim").setStyle(ButtonStyle.Success)
        const row = new ActionRowBuilder()
        .addComponents([One , Two , Three ])
        let random = Math.floor(Math.random() * 37);
        const Embedcik = new EmbedBuilder()
        Embedcik.setDescription(`
        **${message.guild.name}** rulet oyununa hoşgeldin ${message.author}! 
       Hangi renge oynamak istiyorsan aşağıdaki kısımdan seçmelisin! Unutma sadece 30 saniye süren var!
       Yeşil : \`15X\`
       Kırmızı : \`2X\`
       Siyah : \`4X\`
       Unutma kaybedersen dolar kazanamazsın! **BOL ŞANS**
       `)
       let colour = args[1]
       let msg = await message.channel.send({content: `Hangi renge oynamak istiyorsan aşağıdaki kısımdan seçmelisin! Unutma sadece 30 saniye süren var!
        Yeşil : \`15X\`, Kırmızı : \`2X\`, Siyah : \`4X\``,
  components : [row]})
       var filter = (button) => button.user.id === message.author.id;
       let collector = await msg.createMessageComponentCollector({filter, time: 30000  })
       collector.on("collect", async (button, user) => {
       if(button.id === "yesil") {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[3].setDisabled(true) 

       colour = 2;
       }
       if(button.id === "kirmizi") {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[3].setDisabled(true) 

       colour = 1;
       }
       if(button.id === "siyah") {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[3].setDisabled(true) 

       colour = 0;
       }
       if (random == 0 && colour == 2) { // Yesil
        await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: +argss * 15 } }, { upsert: true });
        msg.edit(`> Tebrikler ${message.author}! Yeşili tutturarak ${args[0] * 15} miktar dolar kazandın! Mutlu harcamalar!`)  
    } else if (isOdd(random) && colour == 1) { // Kırmızı
        await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: +argss * 2 } }, { upsert: true });
        msg.edit(`> Tebrikler ${message.author}! Kırmızı tutturarak ${args[0] * 2} miktar dolar kazandın! Mutlu harcamalar!`) 
    } else if (!isOdd(random) && colour == 0) { // Siyah
        await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: +argss * 4 } }, { upsert: true });
        msg.edit(`> Tebrikler ${message.author}! Siyah tutturarak ${args[0] * 4} miktar dolar kazandın! Mutlu harcamalar!`)
    } else { // Kayıp
        await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: -argss,  } }, { upsert: true });
        msg.edit(`> Malesef ${message.author}! ${args[0]} dolar kaybettin! Bir dahaki sefere!`)
    }
       })
       collector.on("end", async () => {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[3].setDisabled(true) 

   });
       
}
exports.conf = {aliases: ["rolute"]}
exports.help = {name: 'rulet'}