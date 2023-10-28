const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
let moment = require("moment");
require("moment-duration-format")
let stats = require("../../models/stats");

module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    if (kanal) return

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let statData = await stats.findOne({userID: user.id, guildID: message.guild.id}) || {autoRankup: []};

let rozetleri = statData.autoRankup || [];
const embed = new EmbedBuilder()
.setAuthor({ name: user.displayName, iconURL: user.user.avatarURL({ dynamic: true })})
.setFooter({ text: client.ayarlar.footer })
    if (message.guild.members.cache.has(user.id)) {
    let member = message.guild.members.cache.get(user.id);
    let nickname = member.displayName == user.username ? "" + user.username + " [Yok] " : member.displayName
    const members = message.guild.members.cache.filter(x => !x.user.bot).sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
    const joinPos = members.map((u) => u.id).indexOf(member.id);
    const roles = member.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
    const rolleri = [];
    if (roles.length > 6) {
        const lent = roles.length - 6;
        let itemler = roles.slice(0, 6);
        itemler.map(x => rolleri.push(x));
        rolleri.push(`${lent}...`);
    } else {
        roles.map(x => rolleri.push(x));
    };
    embed.setDescription(`
${client.emojis.cache.find(x => x.name === "wex_bit")} **Kullanıcı Bilgisi**
\` • \` Rozetler: \`${rozetleri.length == 0 ? "Rozet yoktur" : rozetleri.map(x => `${x}`).join(" ")}\`
\` • \` Hesap: ${user}
\` • \` Kullanıcı ID: \`${member.id}\`
\` • \` Kuruluş Tarihi: \`${moment(member.user.createdTimestamp).locale("tr").format("LLL")} - (${moment(member.user.createdTimestamp).locale("tr").fromNow()})\`

${client.emojis.cache.find(x => x.name === "wex_bit")} **Sunucu Bilgisi**
\` • \` Sunucu İsmi: \`${nickname}\`
\` • \` Katılım Tarihi: \`${moment(member.joinedAt).locale("tr").format("LLL")} - (${moment(member.joinedAt).locale("tr").fromNow()})\`
\` • \` Katılım Sırası: \`${joinPos} / ${message.guild.members.cache.size}\`

${client.emojis.cache.find(x => x.name === "wex_info")} Rolleri (${rolleri.length}): ${rolleri.join(", ")}

`)
    embed.setColor(member.displayHexColor);
}
message.channel.send({embeds: [embed]})
}
exports.conf = {aliases: ["Bilgi", "profil", "info", "i","me"]}
exports.help = {name: 'bilgi'}
