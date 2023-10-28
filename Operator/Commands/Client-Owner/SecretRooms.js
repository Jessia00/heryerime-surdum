const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
const { Client, CommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ChannelType, PermissionsBitField, UserFlagsBitField, ButtonStyle } = require('discord.js')
const { SlashCommandBuilder, Embed } = require('@discordjs/builders')
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
const Guild = require('../../models/secretRoom');
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (!client.ayarlar.sahip.includes(message.author.id)) return;
    let data = await Guild.findOne({ guildId: message.guild.id });
    if (!data) {
        await Guild.create({ guildId: message.guild.id });
    }
    let newdata = await Guild.findOne({ guildId: message.guild.id });
    if (newdata?.private_voices?.categoryId && newdata?.private_voices?.channelId != null) {
      let btn = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('delete').setLabel('Sil').setStyle(ButtonStyle.Danger))
      let msg = await message.channel.send({ embeds: [new EmbedBuilder().setDescription('Özel odalar sistemi zaten var silinsin mi?')], components: [btn] })
      setTimeout(() => {
        msg.edit({ components: [] }).catch(() => null)
      }, 20 * 1000);
      let collector = msg.createMessageComponentCollector()
      collector.on('collect', async (i) => {
          if (message.author.id != i.user.id) return i.deferUpdate().catcha(() => null);
          if (i.customId == 'delete') {
            msg.edit({ components: [], content: `Özel Oda Sistemi Kaldırıldı ✅` })
              let data = await Guild.findOne({ guildId: message.guild.id })
              let channelId = await client.channels.fetch(data?.private_voices?.channelId).catch(() => null)
              let textId = await client.channels.fetch(data?.private_voices?.textId).catch(() => null)
              let categoryId = await client.channels.fetch(data?.private_voices?.categoryId).catch(() => null)
              channelId?.delete().catch(() => null)
              textId?.delete().catch(() => null)
              categoryId?.delete().catch(() => null)
              return await Guild.updateOne({ guildId: message.guild.id }, {
                  $set: {
                      'private_voices': {}
                  }
              })
          }
      })
  } else {
      let categoryId = await message.guild.channels.create({
          name: `Özel Oda`,
          type: ChannelType.GuildCategory,
      })
      let channelId = await message.guild.channels.create({
          name: `Secret Room's`,
          type: ChannelType.GuildVoice,
          parent: categoryId,
          userLimit: 1,
          permissionOverwrites: [
              {
                  id: message.guild.id,
                  allow: [PermissionsBitField.Flags.Connect],
                  deny: [PermissionsBitField.Flags.Speak]
              }
          ]
      })
      let textId = await message.guild.channels.create({
          name: `oda-ayarları`,
          parent: categoryId,
          topic: `Özel kanal yönetimi`,
          permissionOverwrites: [
              {
                  id: message.guild.id,
                  deny: [PermissionsBitField.Flags.SendMessages]
              }
          ]
      })
      let rename = new ButtonBuilder().setCustomId('rename').setLabel("İsim Değiştir").setEmoji('✏️').setStyle(ButtonStyle.Secondary);
      let lock = new ButtonBuilder().setCustomId('lock').setLabel("Kilit").setEmoji('🔒').setStyle(ButtonStyle.Secondary);
      let bit = new ButtonBuilder().setCustomId('bit').setLabel("Bit Hızı").setEmoji('📻').setStyle(ButtonStyle.Secondary)
      let limit = new ButtonBuilder().setCustomId('limit').setLabel("Oda Limiti").setEmoji('🫂').setStyle(ButtonStyle.Secondary)
      let kick = new ButtonBuilder().setCustomId('kick').setLabel("Sesten At").setEmoji('🚫').setStyle(ButtonStyle.Secondary)

      let Buttons = new ActionRowBuilder().addComponents([lock, rename, bit, limit, kick])

     
      textId.send({ content: `**Merhaba!** Özel Oda Oluşturma Sistemine Hoş Geldiniz!

Secret Room's kanalına giriş yaparak kendin belirleyeceğin isimde ve senin yöneteceğin bir kanal oluşturabilirsin.
Ayrıca bu kanala istediklerin girebilir, istemediklerini odaya almayabilirsin.

Belki odanı gizli yaparak devlet sırlarını konuşabilir,

Ya da herkese açık yaparak halka seslenebilirsin.
      
Hemen Secret Room's kanalına gir kanalını oluştur ve bu panelden odanı yönet.
      
      `, components: [Buttons] })
      await Guild.updateOne({ guildId: message.guild.id }, {
          $set: {
              'private_voices.mode': true,
              'private_voices.categoryId': categoryId,
              'private_voices.channelId': channelId,
              'private_voices.textId': textId,
          }
      })

      await message.reply({ content: `Kanallar başarıyla oluşturuldu.` })
  }

  }
exports.conf = {aliases: []};
exports.help = {name: 'secretroom'};