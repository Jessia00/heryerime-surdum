const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js");
const { PermissionsBitField } = require('discord.js');       
const conf = client.ayarlar;
        let mongoose = require("mongoose");
        let sunucuayar = require("../../models/sunucuayar");
        module.exports.run = async (client, message, args, durum, kanal) => {
            let server = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return 
            if (!message.guild) return;
        let mesaj = client.snipe.get(message.channel.id)
        if (!mesaj) return message.react("🚫")
        let Embed =  new Discord.EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
            message.reply({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "wex_tikcik")} ${message.author} tarafından <t:${Math.floor(Math.floor(mesaj.createdTimestamp) / 1000)}:R> silinmiş.
"** ${mesaj.content} **"`)] });
        
        }
        exports.conf = {
        aliases: ["snipe"]
        };
        exports.help = {
        name: 'Snipe'
        };
     