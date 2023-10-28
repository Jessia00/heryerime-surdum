
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

module.exports = async (emoji) => {
  let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiUpdate }).then(audit => audit.entries.first());
  if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  let member = emoji.guild.members.cache.get(entry.executor.id); 
  await newEmoji.edit({ name: oldEmoji.name }, `${entry.executor.username} tarafından güncellenmeye çalışıldı.`)
  client.cezaVer(client, entry.executor.id, "jail");
  const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setDescription(`
  \`•\` Uygulanan İşlem: **Emoji_Update**
  \`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
  \`•\` İşlem Detayı: **${entry.executor} adlı üye ${emoji.name} isimli emojiyi güncelledi**
  \`•\` Yapılan İşlem: **Kişi jail'e atıldı, sildiği emoji eski haline getirildi.`)
  emoji.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
  
};