const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || durum) {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!args[0]) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Rol Belirt.\` Lütfen geçerli bir rol belirt ve tekrar dene.`)
        if (!role) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Rol Belirt.\` Lütfen geçerli bir rol belirt ve tekrar dene.`)
        let sayı = role.members.size
        if (sayı > 200) return message.channel.send(`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`)
        let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `)
        message.channel.send(`- ${role} rol bilgileri;
- Rol ID: \`${role.id}\`
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
`, {
            split: true
        })

    } else return;
}
exports.conf = {
    aliases: ["rolbilgi"]
}
exports.help = {
    name: 'Rolbilgi'
}