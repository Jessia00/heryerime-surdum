
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
const BackRolesData = require("../models/backRoles")
moment.locale("tr")
const client = global.client;
let sunucuayar = require("../models/sunucuayar")
module.exports = async (member, oldStatus) => {
  let server = await sunucuayar.findOne({guildID: member.guild.id});  
  const data = await BackRolesData.findOne({ guildID: conf.sunucuId, userID: member.user.id });
  if (!data) return
  if (data.roles || data.roles.length) {
    await data.roles.map(e => member.roles.add(e, "Online olduğu için yetkileri verildi"))
    await BackRolesData.findOneAndDelete({ guildID: conf.sunucuId, userID: member.user.id });
  
   let zort = data.roles.map(x => `<@&${x}>`).join(",");
    let channelDelete = new EmbedBuilder().setThumbnail(member.avatarURL({ dynamic: true })).setDescription(`
    \`•\` Uygulanan İşlem: **Çevrimiçi İşlem**
    \`•\` İşlem Uygulayan: ${member} (\`${member.user.tag}\` - \`${member.id}\`)
    \`•\` İşlem Detayı: **${member.user.tag} çevrimiçi moda giriş yaptı.**
    \`•\` Yapılan İşlem: **Yetkilinin, yetki rolleri verildi eğerki çevrimdışı olursa yetki rolleri güvenlik amaçlı yeniden çekilecek.**
    \`•\` Roller; ${zort}         
    `)    
    setTimeout(() => {
        res.delete().catch(e => console.log(e))
      }, 2000);  

      return client.channels.cache.get("1146837527249027202").send({embeds: [channelDelete]})
  }
}


