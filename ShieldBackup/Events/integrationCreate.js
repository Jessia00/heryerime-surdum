
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
module.exports = async (guild) => {
let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.IntegrationCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "bot")) return;
client.cezaVer(client, entry.executor.id, "kick");
const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **İntegration_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye bir integration oluşturdu.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, Oluşturulan integration siliniyor...**
`)

newRole.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
};