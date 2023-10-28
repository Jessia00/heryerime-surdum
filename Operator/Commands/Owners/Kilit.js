const { MessageEmbed, Discord } = require("discord.js");
const { link } = require("fs");
const client = global.client;
const conf = client.ayarlar
const {PermissionFlagsBits, PermissionsBitField, Events, EmbedBuilder,ActionRowBuilder,ButtonStyle,ButtonBuilder} = require("discord.js");
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || durum) {
  
        if (message.channel.permissionsFor(message.guild.roles.cache.find(bes => bes.name == "@everyone")).has(PermissionFlagsBits.SendMessages)) {
            await message.channel.permissionOverwrites.edit(message.guild.roles.cache.find(bes => bes.name == "@everyone").id, { SendMessages: false });
            return message.reply(`**\`🔒\` Kanal ${message.author} Tarafından Kilitlendi!**`);
          } else {
            await message.channel.permissionOverwrites.edit(message.guild.roles.cache.find(bes => bes.name == "@everyone").id, { SendMessages: true });
            return message.reply(`**\`🔓\` Kanalın Kilidi ${message.author} Tarafından Açıldı!**`);
          };
  
   
      }

}
exports.conf = {aliases: ["kilit"]}
exports.help = {name: 'Kilit'}
