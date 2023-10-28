
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;

module.exports = async (member) => {
    if (!member.user.bot) return;
    let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.BotAdd }).then(audit => audit.entries.first());
    if (!entry || await client.checkPermission(client, entry.executor.id, "bot")) return;
        await client.cezaVer(client, entry.executor.id, "kick")
    await client.cezaVer(client, member.id, "kick")
            const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
            .setDescription(`
            \`•\` Uygulanan İşlem: **Bot_Add**
            \`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
            \`•\` İşlem Detayı: **${entry.executor} adlı üye sunucuya bot ekledi**
            \`•\` Yapılan İşlem: **Kişi ve Eklenen bot sunucudan kicklendi.`)          
member.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed] });

    
    


  
};