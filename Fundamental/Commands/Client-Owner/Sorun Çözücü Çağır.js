const Discord = require('discord.js');
let sunucuayar = require("../../models/sunucuayar");
let Stat = require("../../models/stats");
let puansystem = require("../../models/puansystem");
const talkedRecently3 = new Set();
const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const { ButtonStyle, SlashCommandBuilder, IntegrationApplication, ButtonBuilder } = require("discord.js");


exports.run = async function(client, interaction, params) {

  if (!interaction.guild) return
  if(!client.ayarlar.sahip.some(x => x == interaction.author.id)) return
  const setupRow = new ActionRowBuilder()
  .addComponents(
  new StringSelectMenuBuilder()
  .setCustomId('select2')
  .setPlaceholder('Camera & Streamer')
  .addOptions([
    { label: 'Camera Rolü', description: 'Camera rolü.', value: 'pubcm' },
    { label: 'streamer Rolü', description: 'streamer rolü.', value: 'stcam' },
  ]),
  )
    interaction.channel.send({ content: `<@&1141003889391435857> Rolünü alabilmek için <#1141004027467923476> Kategorisindeki kanallarda 10 saat vakit geçirmiş olman gerekiyor.
<@&1141003888317702144> Bağımlısı Rolünü alabilmek için <#1141004031335088248> Kategorisindeki kanallarda 10 saat vakit geçirmiş olman gerekiyor.`,"components":[
      setupRow

      ] })
}

client.on('interactionCreate', async interaction => {
  let data = await Stat.findOne({
    userID: interaction.member.id,
    guildID: interaction.guild.id
}) || {
    yedi: {
        Chat: {},
        Voice: {},
        TagMember: 0,
        Invite: 0,
        Register: 0,
        Yetkili: 0
    }
};
let kanallar = await puansystem.findOne({
  guildID: interaction.guild.id
});


  let stream = yetkiliStat(data.yedi.Voice, kanallar.StreamKanallar.Id, []);
  let pubOda = yetkiliStat(data.yedi.Voice, kanallar.PublicKanallar.Id, kanallar.SleepingKanal.Id);

  const member = interaction.user;
  let server = await sunucuayar.findOne({guildID: interaction.guild.id});
    if(interaction.customId === "stcam")
    {

      const streamstat = await Math.floor(stream / 3600000)
      if (interaction.member.roles.cache.has("1141003889391435857")) {
          interaction.reply({ content: `Üzgünüm ama zaten streamer rolüne sahipsin, daha fazla zorlama şansını istersen(?)`, ephemeral: true })
      } else {
          if (streamstat < 10) {
              interaction.reply({ content: `Merhaba, üzgünüm ama şuanda streamer rolünü sana veremiyorum çünkü Public kategorisinde ${streamstat} saat süre geçirmişsin. Eğer ki rolü almak istiyorsan en az ${Math.floor(10-streamstat)} saat süre daha geçirmelisin.`, ephemeral: true })
          } else {
          interaction.reply({ content: `Tebrikler! Başarılı bir şekilde Streamer rolünü aldın.`, ephemeral: true })
          interaction.member.roles.add("1141003889391435857")
          }
      }
    }
    if(interaction.customId === "stcam")
    {

      const publicstat = await Math.floor(pubOda / 3600000)
      //await interaction.deferUpdate()
      if (interaction.member.roles.cache.has("1141003888317702144")) {
          interaction.reply({ content: `Üzgünüm ama zaten kamera rolüne sahipsin, daha fazla zorlama şansını istersen(?)`, ephemeral: true })
      } else {
          if (publicstat < 10) {
              interaction.reply({ content: `Merhaba, üzgünüm ama şuanda kamera rolünü sana veremiyorum çünkü Public kategorisinde ${publicstat} saat süre geçirmişsin. Eğer ki rolü almak istiyorsan en az ${Math.floor(10-publicstat)}saat süre daha geçirmelisin.`, ephemeral: true })
          } else {
              interaction.reply({ content: `Tebrikler! Başarılı bir şekilde Kamera rolünü aldın.`, ephemeral: true })
              interaction.member.roles.add("1141003888317702144")
          }

      }
}

function yetkiliStat(data, parentArray, yasaklıArray) {
  let obje = 0;
  if (data) {
      parentArray.forEach(parentID => {
          let ekle = 0;
          interaction.guild.channels.cache.filter(channel => channel.parentId == parentID).forEach(channel => {
              if (!yasaklıArray.includes(channel.id)) ekle += (data ? (data[channel.id] || 0) : {});
          })
          obje = ekle
      })
      return obje
  } else return obje
}
    
})




exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wexcamst'],
  permLevel: 4
};

exports.help = {
  name: 'stcam',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
