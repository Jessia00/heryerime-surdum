let mongoose = require("mongoose");
let afk = require("../../models/afk")
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
let moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
module.exports.run = async (client, message, args, durum) => {
	if (!message.guild) return;
    if (message.member.displayName.includes("[AFK]")) return
    let reason = args.slice(0).join(" ")
    if (!reason) reason = "Şuan afk oldum en kısa sürede geri geleceğim!"
    let regex = /h?t?t?p?s?:?\/?\/?discord.?gg\/?[a-zA-Z0-9]+/
    let regexSecond = /h?t?t?p?s?:?\/?\/?discorda?p?p?.?com\/?invites\/?[a-zA-Z0-9]+/
    if (regex.test(message.content) == true || regexSecond.test(message.content) == true) return
    if (message.content.includes("@here") || message.content.includes("@everyone")) return
    await message.member.setNickname("[AFK] " + message.member.displayName)
    message.reply({embeds: [new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: client.user.username, iconURL: client.user.avatarURL()}).setDescription(`${client.emojis.cache.find(x => x.name == "wex_afk")} Hey ${message.author}, \`${reason}\` sebebiyle afk modune geçiş yaptın.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    let newData = afk({
        userID: message.author.id,
        guildID: message.guild.id,
        Type: true,
        Reason: reason,
        Time: Date.now()
    })
    newData.save();
}
exports.conf = {aliases: ["Afk", "AFK"]};
exports.help = {name: 'afk'};
