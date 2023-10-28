
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

let roleCreateLimit = {};
module.exports = async (role) => {
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= conf.rolCreateLimit) {
roleCreateLimit[entry.executor.id] = 0;
const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Role_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${role.name} adında bir rol oluşturdu.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, oluşturduğu rol silindi...**`)
role.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
role.delete({reason: "RoleCreate Guard"})
client.cezaVer(client, entry.executor.id, "kick");
return;};
roleCreateLimit[entry.executor.id] += 1;
setTimeout(() => { roleCreateLimit[entry.executor.id] = 0;}, 1000 * 60 * 3);

const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Role_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${role.name} adında bir rol oluşturdu.**
\`•\` Yapılan İşlem: **Kişi Role_Create Limitini aşmadığı için herhangi bir işlem yapmadım. Limit: **${roleCreateLimit[entry.executor.id]}/${conf.rolCreateLimit}**`)
role.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
};