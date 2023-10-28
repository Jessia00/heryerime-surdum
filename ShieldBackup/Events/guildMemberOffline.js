
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
  if (member && server.OnlifeOfflinePerm.some(c => member.roles.cache.has(c))) {
    const roles = member.roles.cache.filter((role) => server.OnlifeOfflinePerm.includes(role.id))
  await BackRolesData.findOneAndUpdate({ guildID: conf.sunucuId, userID: member.user.id }, { $set: { roles: roles.map((e) => e.id) } }, { upsert: true });

  let mention = roles.map((e) => `<@&${e.id}>`)
  let channelDelete = new EmbedBuilder().setThumbnail(member.avatarURL({ dynamic: true })).setDescription(`
  \`•\` Uygulanan İşlem: **Çevrimdışı İşlem**
  \`•\` İşlem Uygulayan: ${member} (\`${member.user.tag}\` - \`${member.id}\`)
  \`•\` İşlem Detayı: **${member.user.tag} çevrimdışı moda giriş yaptı.**
  \`•\` Yapılan İşlem: **Yetkilinin, yetki rolleri güvenlik amaçlı çekildi çevrimiçi oldugunda yetki rolleri geri verilecek.**
  \`•\` Roller; ${mention}
  `)
  member.roles.remove(roles.map((e) => e.id), "Çevrimdışı moda giriş yaptıgı için yetki rolleri alındı.");
  return client.channels.cache.get("1146837527249027202").send({embeds: [channelDelete]})
  }
}


