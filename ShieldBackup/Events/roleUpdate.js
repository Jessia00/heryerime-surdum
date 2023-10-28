
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
module.exports = async (oldRole, newRole) => {
let entry = await newRole.guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
newRole.edit(oldRole)
client.cezaVer(client, entry.executor.id, "kick");
const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Role_Update**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${oldRole.name} isimli rolü güncelledi.**
\`•\` Yapılan İşlem: **Kişi sunucudan kicklendi, Rol eski haline getirildi..`)
newRole.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
};