
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

module.exports = async (emoji) => {
  let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiDelete }).then(audit => audit.entries.first());
  if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  let member = emoji.guild.members.cache.get(entry.executor.id); 
  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
  client.cezaVer(client, entry.executor.id, "jail");
  const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setDescription(`
  \`•\` Uygulanan İşlem: **Emoji_Delete**
  \`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
  \`•\` İşlem Detayı: **${entry.executor} adlı üye ${emoji.name} isimli emojiyi sildi**
  \`•\` Yapılan İşlem: **Kişi jail'e atıldı, sildiği emoji geri yüklendi.`)
    emoji.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
  
};