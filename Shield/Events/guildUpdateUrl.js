
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

module.exports = async (guild) => {
  let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
  if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full")) return;
client.cezaVer(client, entry.executor.id, "kick");
if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;   

if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
request({
method: "PATCH",
url: `https://discord.com/api/v9/guilds/${wexcik.url}/vanity-url`,
headers: { 
  "Authorization": `${wexcik.shieldOneToken}`,
  "User-Agent": `created by wex' calm down wex here`,
  "Content-Type": `application/json`,
  "X-Audit-Log-Reason": `Hello i am under the watter`
},
body: { "code": wexcik.url },
json: true
});
}

const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true })).setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **"GuildUpdate (URL-GÜNCELLEME)"** işlemi yaptı ve sunucudan kicklendi.`)
newMember.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });

  }
