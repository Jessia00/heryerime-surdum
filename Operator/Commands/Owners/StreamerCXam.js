const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const conf = client.ayarlar
let puansystem = require("../../models/puansystem");
let stat = require("../../models/stats");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sunucuAyarOne = sunucuayar.findOne({guildID: conf.sunucuId})
    if (durum) {
      const stcam = new ActionRowBuilder()
        .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('strol')
        .setPlaceholder("Streamer & Camera Rolü")
        .addOptions([
          { label: 'Streamer Rolü', description: `Rolü Almak için Streamer Odalarında 10 saat geçirmiş olmak gerek.`, value: 'streamerrollee' },
          { label: 'Camera Rolü', description:  `Rolü Almak için Public Odalarında 10 saat geçirmiş olmak gerek.`, value: 'camerarollee' },
          { label: 'Rolleri Bırak', description:  `Rol(leri) bırakmak için tıkla.`, value: 'ecRemove' },
        ]),
        );
          

let msg = await message.channel.send({ content:  `
**Merhaba** **${message.guild.name}** üyeleri,
Streamer ve Kamera rolü alma odasına hoş geldiniz!

<@&ayarlıcam etiket gitmesin die>  Rolünü alabilmek için #"Streamer" Kategorisindeki kanallarda 10 saat vakit geçirmiş olman gerekiyor.
<@&ayarlıcam etiket gitmesin die> Bağımlısı Rolünü alabilmek için #"Public Odaları" Kategorisindeki kanallarda 10 saat vakit geçirmiş olman gerekiyor. 
`, components: [stcam] });

}

        }

        client.on("InteractionCreate", async (interaction) => {
          let data = await stat.findOne({
            userID: interaction.member.id,
            guildID: message.guild.id
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
        let pubOda = yetkiliStat(data.yedi.Voice, kanallar.PublicKanallar.Id, kanallar.SleepingKanal.Id);
        let stoda = yetkiliStat(data.yedi.Voice, kanallar.StreamKanallar.Id, kanallar.SleepingKanal.Id);

          if(interaction.isStringSelectMenu()) {
            if(interaction.customId === "strol") {
  
              const streamer = await client.guilds.cache.get(conf.sunucuId).roles.cache.get("1141003889391435857")
              const camera = await client.guilds.cache.get(conf.sunucuId).roles.cache.get("1141003888317702144")
              const streamstat = await Math.floor(pubOda / 3600000)
              const camerastat = await Math.floor(stoda / 3600000)

  
              if (interaction.values[0] === "streamerrollee") {
                await interaction.member.roles.remove(streamer)
              } else {
                if (!streamstat < 10) {
               interaction.reply({ content: `Rolü Almak için StreamerOdalarında 10 saat geçirmiş olmak gerek ve sen *${client.convertDuration(stoda)}* geçirmişsin.`, ephemeral: true})
  
                } else if (interaction.values.length > 1) {

                    await member.roles.add(streamer).catch(err => {})
                  } else {
                    await interaction.member.roles.remove(roles).catch(err => {})
                    await interaction.member.roles.add(role).catch(err => {})
                  }
              }  if (interaction.values[0] === "camerarollee") {
                  await interaction.member.roles.remove(camera)
                } else {
                  if (!camerastat < 10) {
                    interaction.reply({ content: `Rolü Almak için Public Odalarında 10 saat geçirmiş olmak gerek ve s en *${client.convertDuration(pubOda)}*geçirmişsin.`, ephemeral: true})
                  } else if (interaction.values.length > 1) {
                      await member.roles.add(camera).catch(err => {})
                    } else {
                      await interaction.member.roles.remove(camera).catch(err => {})
                      await interaction.member.roles.add(camera).catch(err => {})
                    }
                }
              if (interaction.values[0] === "ecRemove") {
                  await interaction.member.roles.remove(roles)
                } else {
                  if (!interaction.values.length) {
                      await member.roles.remove(roles).catch(err => {})
                    } else if (interaction.values.length > 1) {
                      await member.roles.add(roles).catch(err => {})
                    } else {
                      await interaction.member.roles.remove(roles).catch(err => {})
                      await interaction.member.roles.add(role).catch(err => {})
                    }
                }
            }
          }
              interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })
              function yetkiliStat(data, parentArray, yasaklıArray) {
                let obje = 0;
                if (data) {
                    parentArray.forEach(parentID => {
                        let ekle = 0;
                        message.guild.channels.cache.filter(channel => channel.parentId == parentID).forEach(channel => {
                            if (!yasaklıArray.includes(channel.id)) ekle += (data ? (data[channel.id] || 0) : {});
                        })
                        obje = ekle
                    })
                    return obje
                } else return obje
            }
            
            
        })
exports.conf = {aliases: ["stcamrole"]}
exports.help = {name: 'stcamrole'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }