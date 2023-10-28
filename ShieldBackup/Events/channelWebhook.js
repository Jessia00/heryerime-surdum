
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteUpdate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "bot")) return;
client.cezaVer(client, entry.executor.id, "kick");
const webhooks = await channel.fetchWebhooks();
webhooks.forEach(async element => {
    await element.delete()
});
const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Channel_Webhook**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, Oluşturulan Webhook siliniyor...**
`)
channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
};