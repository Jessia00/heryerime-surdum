const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
let teyit = require("../../models/teyit");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

    let data = await sunucuayar.findOne({guildID: message.guild.id});
    if(message.member.roles.cache.some(rol => data.REGISTERAuthorized.some(rol2 => rol.id == rol2)) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let Embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    teyit.findOne({userID: target.id}, (err, res) => {
        if(!res) {
return message.reply("Kullanıcının isim geçmişi olmadığı için veri görüntüleyemedim.")
        } else {
            const History = res.nicknames.reverse().map((e, i) => `**[** <t:${Math.floor(Math.floor(e.date) / 1000)}:R> **]** \`${e.isimler}\` (**${e.rol}**) - <@${e.execID}>`).slice(0, 30)
        message.reply({ embeds: [Embed.setDescription(`${target} adlı üyenin geçmiş isimleri sırasıyla aşağıda listelenmiştir.

        ${History.join("\n")}
        
        ${client.emojis.cache.find(x => x.name === "wex_carpi") || "Emoji Bulunamadı"} üyenin \`${History.length}\` adet geçmiş ismi görüntülendi.`)]}), message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`) 
        
        }
        
        })

   }

}
exports.conf = {
    aliases: ["İsimler", "names"]
}
exports.help = {
    name: 'isimler'
}

function dateToUnixEpoch(date) {
    return `<t:${Math.floor(Math.floor(date) / 1000)}:L>`
  }
  