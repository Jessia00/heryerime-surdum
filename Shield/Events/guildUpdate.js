
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
if (newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
if (oldGuild.banner !== newGuild.banner) await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true })).setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **"GuildUpdate"** işlemi yaptı ve sunucudan kicklendi.`)
newMember.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });

  }
