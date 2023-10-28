const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, PermissionsBitField, ButtonBuilder } = Discord = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let teyit = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    let data = await sunucuayar.findOne({});
    let kayitSorumlusu = data.REGISTERAuthorized;
    let jailSorumluRol = data.JAILAuthorized;
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.guild.roles.cache.some(rol => kayitSorumlusu.some(rol2 => rol === rol2)) || message.guild.roles.cache.some(rol => jailSorumluRol.some(rol2 => rol === rol2)) || durum) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        let data2 = await teyit.findOne({userID: target.id, guildID: message.guild.id});
        let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`
            Toplam **${data2.Man + data2.Woman}** kayıta sahip! (Erkek: **${data2.Man}**, Kadın: **${data2.Woman}**)`)
        message.channel.send({embeds: [embed]})



    } else return;
}
exports.conf = {
    aliases: ["teyitbilgi"]
}
exports.help = {
    name: 'Teyitbilgi'
}

