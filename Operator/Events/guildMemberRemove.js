const client = global.client;
let conf = client.ayarlar
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
let moment = require("moment");
moment.locale("tr");
let teyit = require("../models/teyit");
let sunucuayar = require("../models/sunucuayar");
const message = require("../../Fundamental/events/message");
module.exports = async member => {
  let data2 = await sunucuayar.findOne({})
  let unregister= data2.UNREGISTER;
  if (member.roles.cache.some(x => unregister.some(y => x == y))) return;
  let teyitcik = teyit.findOne({userID: member.id, guildID: member.guild.id})
  teyit.findOne({userID: member.id}, (err, res) => {
                    
                    
    if(!res) {
        new teyit({userID: member.id, nicknames: [{isimler: `dasd`,rol: `Kadın`, execID: "dasda", date: Date.now()}]}).save()
        } else {
            res.nicknames.push({isimler: `${member.displayName}`,rol: `Sunucudan Ayrılma`, execID: `${member.guild.name}`, date: Date.now()})
            res.save()}

  })
  let embed = new Discord.EmbedBuilder()
  client.channels.cache.find(a => a.name === "giris-cikis-log").send({ embeds: [embed.setDescription(`${member} (\`${member.id}\` - \`${member.user.tag}\`) adlı üye sunucudan ayrıldı.
  **─────────────────────**
  Kullanıcının Hesap Oluşturma Tarihi: \`${moment(member.user.createdTimestamp).locale('tr').format("LLL")}\` **[** <t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R>  **]**
  **─────────────────────**
  ${member.roles.cache.filter(rol => rol.name != "@everyone").map(x => x).join(",")}`)] })

};