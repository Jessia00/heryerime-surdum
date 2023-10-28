const Discord = require('discord.js');
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
exports.run = async function(client, message, args) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
  let guild = message.guild;
	if(args[0] === "kur" || args[0] === "setup" || args[0] === "kurulum") {
console.log("wex")
const parent = await message.guild.channels.create({ name: 'logges İn The Wex',
type: ChannelType.GuildCategory, permissionOverwrites: [{ id: message.guild.id, deny: [PermissionsBitField.Flags.ViewChannel], }]});
await message.guild.channels.create({ name: 'shields-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'cmd-log', type: ChannelType.GuildText, parent: parent.id });
await message.guild.channels.create({ name: 'nickname-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'ses-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'role-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'mesaj-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'tag-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'uyarı-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'şüpheli-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'görev-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'giris-cikis-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'yetki-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'chat-mute-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'ses-mute-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'ban-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'jail-log',  type: ChannelType.GuildText, parent: parent.id});
await message.guild.channels.create({ name: 'streamer-cam-log',  type: ChannelType.GuildText, parent: parent.id});
const parent2 = await message.guild.channels.create({ name: 'Basic logges İn The Wex',
type: ChannelType.GuildCategory, permissionOverwrites: [{ id: message.guild.id, deny: [PermissionsBitField.Flags.ViewChannel], }]});
await message.guild.channels.create({ name: 'ses-log-basic',  type: ChannelType.GuildText, parent: parent2.id});
await message.guild.channels.create({ name: 'streamer-cam-log-basic',  type: ChannelType.GuildText, parent: parent2.id});
await message.guild.channels.create({ name: 'role-log-basic',  type: ChannelType.GuildText, parent: parent2.id});
await message.guild.channels.create({ name: 'giris-cikis-log-basic',  type: ChannelType.GuildText, parent: parent2.id});

message.channel.send(new Discord.EmbedBuilder.setDescription(`• Log Kanalları Başarıyla Kuruldu`))
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['channel'],
  permLevel: 4
};

exports.help = {
  name: 'log',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
