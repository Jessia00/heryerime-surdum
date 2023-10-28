
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

module.exports = async (emoji) => {
  let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiCreate }).then(audit => audit.entries.first());
  if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  let member = emoji.guild.members.cache.get(entry.executor.id); 
  await emoji.delete()
  client.cezaVer(client, entry.executor.id, "jail");
  const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setDescription(`
\`•\` Uygulanan İşlem: **Emoji_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye bir emoji oluşturdu**
\`•\` Yapılan İşlem: **Kişi jail'e atıldı, oluşturdugu emoji silindi.`)

  .setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **İzinsiz "emojiCreate" işlemi yaptığı için sunucudan kicklendi.__`)
  emoji.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
  
};