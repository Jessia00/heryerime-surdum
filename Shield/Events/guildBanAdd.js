
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
let BanLimit = {};

module.exports = async (member) => {
  let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
  if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  if (entry.executor.id === member.id) return;
  if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > allah.Guard.Limit.Ban) {
    if (entry.executor) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
        await client.cezaVer(client, entry.executor.id, "kick")
        member.guild.members.unban(member.user.id);

    }
    BanLimit[entry.executor.id].Now += 1;
} else if (!BanLimit[entry.executor.id]) {
    BanLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };
} else {
    BanLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);
}



  
};
//const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
//.setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **İzinsiz "guildBanAdd"** işlemi yaptı, sunucu için belirlenen banLimiti ${BanLimit[entry.executor.id].Now}/${conf.banLimit}.__`)
//member.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });


//        const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
//.setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`\n**-** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)\n**-** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`\n\n__(${entry.executor} - \`${entry.executor.id}\`) adlı kullanıcı **İzinsiz "guildBanAdd" işlemi yaptığı için sunucudan kicklendi.__`)
//member.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });
