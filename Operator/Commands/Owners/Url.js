const conf = client.ayarlar
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");

const { Client, Message, EmbedBuilder } = Discord = require("discord.js");

let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || durum) {
        let Embedcik = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
        message.guild.fetchVanityData().then(res => {
            message.reply({ embeds: [Embedcik.setDescription(`**${message.guild.name}** Sunucumuzun Özel-Davet İstatistikleri\n\nSunucu Özel Daveti: **${res.code}**  ${client.emojis.cache.find(x => x.name === "wex_succes")}\nKullanımı : **${res.uses}**  ${client.emojis.cache.find(x => x.name === "wex_info")}`)] }) }) 
    } else return;
}
exports.conf = {
    aliases: ["url-kullanım", "url"]
}
exports.help = {
    name: 'urlkullanım'
}