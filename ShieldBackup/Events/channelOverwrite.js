
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
module.exports = async (oldChannel, newChannel) => {
let entry = await newChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteUpdate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
client.cezaVer(client, entry.executor.id, "kick");
await newChannel.edit({
  permissionOverwrites: oldChannel.permissionOverwrites.cache
});

const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Channel_Overwrites**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, kanal izinleri eski haline getiriliyor...**
`)
newChannel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
};