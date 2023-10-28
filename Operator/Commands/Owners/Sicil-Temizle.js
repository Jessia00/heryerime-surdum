let ceza = require("../../models/ceza");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    

	if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || durum) {

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return  message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Üye Belirt.\` Lütfen geçerli bir üye belirt ve tekrar dene.`);
        await ceza.deleteMany({userID: target.id}).exec().then(x => message.react(client.emojis.cache.find(x => x.name === "wex_tik"))).catch(y => message.react(client.emojis.cache.find(x => x.name === "wex_iptal")));

    }
};
exports.conf = {aliases: ["sicil-temizle", "siciltemizle"]}
exports.help = {name: 'sicil-affı'}
