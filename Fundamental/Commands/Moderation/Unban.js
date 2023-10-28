const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
const moment = require("moment")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
    let data = await sunucuayar.findOne({});
    let banLogKanal = data.BANChannel
    let reklamROL = data.REKLAM;
    let booster = data.BOOST;
	let kayitsizUyeRol = data.UNREGISTER

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Geçerli bir **Üye Belirt** ve tekrar dene.`);
        if (target === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Kendı banını açamazsın çünkü banlı değilsin.`);
     
                  if (!target.roles.cache.get(reklamROL)) {
             message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Belirttiğin **${target.tag}** adlı üye sunucuda **yasaklı değil**.`)
             message.react(client.emojis.cache.find(x => x.name === "wex_carpi"))
            }
            message.guild.members.unban(target.id)
     message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")} Belirttiğin **${target.user.tag}** adlı üyenin **yasağı kaldırıldı**.`)
         message.react(client.emojis.cache.find(x => x.name === "wex_tik"))
         new Discord.EmbedBuilder().setFooter({ text: conf.footer })
         .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }).setDescription(`${target} (**${target.id}**) üyesinin banı __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından kaldırıldı.`)     
         await client.channels.cache.get(banLogKanal).send({embeds: [messageLogEmbed]});
        
 

}
exports.conf = {aliases: ["bankaldır", "Unban", "UNBAN"]}
exports.help = {name: 'unban'}
