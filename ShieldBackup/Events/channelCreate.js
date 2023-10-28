
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
let channelCreateLimit = {};
module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate }).then(audit => audit.entries.first());
if (!entry || !entry.executor || entry.executor.bot  || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) {
const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Channel_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanal oluşturdu.**
\`•\` Yapılan İşlem: **Kişi Güvenli Listede, herhangi bir işlem yapmadım.**
`)
channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
    
    } else {
if (!channelCreateLimit[entry.executor.id]) channelCreateLimit[entry.executor.id] = 0;
if (channelCreateLimit[entry.executor.id] && channelCreateLimit[entry.executor.id] >= conf.channelCreateLimit) {
channelCreateLimit[entry.executor.id] = 0;
const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Channel_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanal oluşturdu.**
\`•\` Yapılan İşlem: **Kişi Channel_Create Limitini aştığı için sunucudan Kickledim.**
`)
channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
await channel.delete({ reason: `ChannelCreate Guard` })
client.cezaVer(client, entry.executor.id, "kick");
return;};
channelCreateLimit[entry.executor.id] += 1;
setTimeout(() => { channelCreateLimit[entry.executor.id] = 0;}, 1000 * 60 * 3);
const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Channel_Create**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanal oluşturdu.**
\`•\` Yapılan İşlem: **Kişi Channel_Create Limitini aşmadığı için herhangi bir işlem yapmadım. Limit: **${channelCreateLimit[entry.executor.id]}/${conf.channelCreateLimit}****
`)

channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });
    }
};