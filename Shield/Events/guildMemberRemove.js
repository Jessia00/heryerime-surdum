
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
let KickLimit = {};

module.exports = async (member) => {
  let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick }).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  if (entry.executor.id === member.id) return;
    let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
  if (KickLimit[entry.executor.id] && KickLimit[entry.executor.id].Now + 1 > conf.kickLimit) {
      if (victimMember) {
        await client.cezaVer(client, victimMember.id, "kick")
        const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **İzinsiz "guildMemberRemove (Kicked)" işlemi yaptığı için sunucudan kicklendi.__`)
        member.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
      
          KickLimit[entry.executor.id] = {
              Now: 1,
              Last: Date.now()
          }
      }
      KickLimit[entry.executor.id].Now += 1;
  } else if (!KickLimit[entry.executor.id]) {
      KickLimit[entry.executor.id] = {
          Now: 1,
          Last: Date.now()
      };
  } else {
      KickLimit[entry.executor.id].Now += 1;
      const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
      .setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **İzinsiz "guildMemberRemove (Kicked)"** işlemi yaptı, sunucu için belirlenen KickLimiti ${1}/${conf.kickLimit}.__`)
      member.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });

      setTimeout(() => {
          KickLimit[entry.executor.id] = {
              Now: 1,
              Last: Date.now()
          }
      }, 1000 * 60 * 3);
  }



  
};