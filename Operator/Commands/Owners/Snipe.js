
const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
let moment = require("moment");
const conf = client.ayarlar
moment.locale("tr")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.REGISTERAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
        let mesaj = client.snipe.get(message.channel.id)
        if (!mesaj) return message.react(client.emojis.cache.find(x => x.name == "wex_carpi"))
        const embed = new EmbedBuilder() 
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
        .setFooter({ text: client.ayarlar.footer})
    .setDescription(mesaj.content)
        message.channel.send({embeds: [embed]}).then
        client.snipe.delete(message.channel.id)
}
exports.conf = {aliases: ["snipe"]}
exports.help = {name: 'Snipe'}
