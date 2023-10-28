const {
    MessageEmbed
} = require("discord.js");
require("moment-timezone")
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
let uyarıData = require("../../models/uyarı");
let puansystem = require("../../models/puansystem");
let taglıData = require("../../models/taglıUye");
let yetkiliDB = require("../../models/yetkili");
let ozelKomut = require("../../models/özelkomut");
let missionSystem = require("../../models/randomMission");
module.exports.run = async (client, message, args, durum) => {
    if (!message.guild) return;
       let sunucuData = await sunucuayar.findOne({
        guildID: message.guild.id
    }); 
    if (!sunucuData.GKV.includes(message.author.id) && !durum && !client.ayarlar.sahip.includes(message.author.id)) return
    
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) {
        return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} \`Geçersiz Sayı\` En az \`1 - 100\` arasında bir sayı değeri girmelisiniz.`).then(e => setTimeout(() => e.delete(), 7000));
      }
      else {
        message.channel.bulkDelete(Number(args[0]), true).then(msg => message.channel.send(`<#${message.channel.id}> kanalında **${msg.size}** adet mesaj başarı ile temizlendi.`))
      }
  
}
exports.conf = {
    aliases: ["sil"]
}
exports.help = {
    name: 'bulkdelete'
}