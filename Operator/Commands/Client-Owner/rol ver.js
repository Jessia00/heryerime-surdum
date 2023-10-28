const Discord = require("discord.js");
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");

exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return
  if (message.author.id !== "728161454288535604") return;
    var rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
message.guild.members.cache.forEach(y => y.roles.add(rol.id));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wexr'],
  permLevel: 4
};

exports.help = {
  name: 'rwex',
  description: "Sunucuda komut denemeye yarar",
  usage: 'eval <kod>',
  kategori: "Bot Yapımcısı"
};

