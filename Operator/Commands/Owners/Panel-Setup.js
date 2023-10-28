const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const conf = client.ayarlar
let puansystem = require("../../models/puansystem");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sunucuAyarOne = sunucuayar.findOne({guildID: conf.sunucuId})
    if (durum) {
        const setupRow = new ActionRowBuilder()
        .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('select2')
        .setPlaceholder('Bot Kurulum Bilgileri')
        .addOptions([
          { label: 'Sunucu Kurulum Bilgilendirme', description: 'Sunucu kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Server' },
          { label: 'Rol Kurulum Bilgilendirme', description: 'Rol kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Roles' },
          { label: 'Kanal Kurulum Bilgilendirme', description: 'Kanal kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Channel' },
          { label: 'Kategori Kurulum Bilgilendirme', description: 'Kategori kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Category' },
        ]),
        );
        const embedSetup = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu için kurulum bilgilendirmeleri için aşağıdaki menüyü kullan.
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await message.reply({ embeds: [embedSetup], components: [setupRow] }).catch({});
      const filter = i => i.user.id == message.author.id    
      let collector = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
      collector.on("collect", async (interaction) => {
        sunucuayar.findOne({guildID: conf.sunucuId}, async (err, data) => {
          let arr = [];
          arr.push(data)
          let dataStat = await puansystem.findOneAndUpdate({guildID: message.guild.id}, {guildID: message.guild.id}, {upsert: true, setDefaultsOnInsert: true}).exec()

        if (interaction.values[0] === "Server") {
          await interaction.deferUpdate();
          console.log(sunucuAyarOne.TAG)
            const sunucu = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.
${arr.map(y => `\`\`\`fix\n Sunucu Ayarları \`\`\`
**Sunucu Id**: ${y.guildID} 
**Sunucu Tag**: ${y.TAG ? y.TAG : "\`.setup tag ⊰\`"} 
**Sunucu Tag2**: ${y.TAG2 ? y.TAG2 : "\`.setup tag2 •\`"}
**Sunucu Url**: ${y.LINK ? y.LINK : "\`.setup link discord.gg/aqualand\`"}
**Bot Erişim**: ${y.GKV.length > 0 ? y.GKV.map(x => `<@${x}>`).slice(0, 5).join(","): "\`.setup boterişim @user\`"}
**Level-Sistemi:** (${dataStat.LevelSystem.Type == true ? "Aktif": "Kapalı"})
**Otomatik-Yetki-Atlama:** (${dataStat.AutoRankUP.Type == true ? "Aktif": "Kapalı"})

`)}
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
interaction.message.delete()
await interaction.channel.send({ embeds: [sunucu], components: [setupRow] }).catch({});

        }
        
        if (interaction.values[0] === "Roles") {
          await interaction.deferUpdate();
            const rolesembed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.
${arr.map(y => `\`\`\`fix\n Rol Ayarları \`\`\`
**Kayıtsız-Rol(leri)**: ${y.UNREGISTER.length > 0 ? `${y.UNREGISTER.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Erkek-Rol(leri)**: ${y.MAN.length > 0 ? `${y.MAN.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Kadın-Rol(leri)**: ${y.WOMAN.length > 0 ? `${y.WOMAN.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Aile-Rol(leri)**: ${y.TEAM != "1" ? `<@&${y.TEAM}>` : "\`Kapalı\`"}
**Booster-Rolü**: ${y.BOOST != "1" ? `<@&${y.BOOST}>` : "\`Kapalı\`"}
**Cezalı/Reklamcı-Rolü**: ${y.JAIL != "1" ? `<@&${y.JAIL}>` : "\`Kapalı\`"}
**Şüpheli-Rolü**: ${y.SUPHELI != "1" ? `<@&${y.SUPHELI}>` : "\`Kapalı\`"}
**Yasaklı-Tag-Rolü**: ${y.BANTAG != "1" ? `<@&${y.BANTAG}>` : "\`Kapalı\`"}
**Chat-Muted-Rolü**: ${y.MUTED != "1" ? `<@&${y.MUTED}>` : "\`Kapalı\`"}
**Voice-Muted-Rolü**: ${y.VMUTED != "1" ? `<@&${y.VMUTED}>` : "\`Kapalı\`"}
**Teyitçi Rol(leri)**: ${y.REGISTERAuthorized.length  > 0 ? `${y.REGISTERAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Bot-Komut Rol(leri):**: ${y.COMMANDAuthorized.length  > 0 ? `${y.COMMANDAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**En-Alt-Yetkili-Rolü**: ${y.EnAltYetkiliRol ? `<@&${y.EnAltYetkiliRol}>` : "\`Kapalı\`"}
**Ses-Mute-Yetkili-Rol(leri)**: ${y.VMUTEAuthorized.length  > 0 ? `${y.VMUTEAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Chat-Mute-Yetkili-Rol(leri)**: ${y.MUTEAuthorized.length  > 0 ? `${y.MUTEAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Cezalı-Yetkili-Rol(leri)**: ${y.JAILAuthorized.length  > 0 ? `${y.JAILAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Ban-Yetkili-Rol(leri)**: ${y.BANAuthorized.length  > 0 ? `${y.BANAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Uyarı-Yetkili-Rol(leri)**: ${y.WARNAuthorized.length  > 0 ? `${y.WARNAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
**Stat-Bot-Command:** (${dataStat.AutoRankUP.sabitROL ? `<@&${dataStat.AutoRankUP.sabitROL}>` : "Kapalı"})

**Etkinlik-Katılımcısı-Rolü**: ${y.EtkinlikKatilimcisi != "1" ? `<@&${y.EtkinlikKatilimcisi}>` : "\`Kapalı\`"}
**Çekiliş-Katılımcısı-Rolü**: ${y.CekilisKatilimcisi != "1" ? `<@&${y.CekilisKatilimcisi}>` : "\`Kapalı\`"}
`)}
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
interaction.message.delete()
await interaction.channel.send({ embeds: [rolesembed], components: [setupRow] }).catch({});


      }
      if (interaction.values[0] === "Channel") {
        await interaction.deferUpdate();
          const channelsembed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.
${arr.map(y => `\`\`\`fix\n Kanal Ayarları \`\`\`
**Genel-Chat**: ${y.CHAT != "1" ? `<#${y.CHAT}>` : "\`Kapalı\`"}
**Register-Chat** ${y.REGISTER != "1" ? `<#${y.REGISTER}>` : "\`Kapalı\`"}
**Tag-Bilgilendirmesi**: ${y.TAGLOG != "1" ? `<#${y.TAGLOG}>` : "\`Kapalı\`"}
**Kurallar-Kanalı**: ${y.RULES != "1" ? `<#${y.RULES}>` : "\`Kapalı\`"}
**Sleep-Room**: ${y.SLEEP != "1" ? `<#${y.SLEEP}>` : "\`Kapalı\`"}
**Ses-Mute-Log**: ${y.VMUTEChannel != "1" ? `<#${y.VMUTEChannel}>` : "\`Kapalı\`"}
**Chat-Mute-Log**: ${y.MUTEChannel != "1" ? `<#${y.MUTEChannel}>` : "\`Kapalı\`"}
**Jail-Log**: ${y.JAILChannel != "1" ? `<#${y.JAILChannel}>` : "\`Kapalı\`"}
**Ban-Log**: ${y.BANChannel != "1" ? `<#${y.BANChannel}>` : "\`Kapalı\`"}
**Ceza-Puan-Log**: ${conf.CEZA_PUAN_KANAL != "1" ? `<#${conf.CEZA_PUAN_KANAL}>` : "\`Kapalı\`"}
**Komut-Kanalları**: ${conf.commandChannel.length > 0 ? `${conf.commandChannel.map(x => `<#${x}>`).join(",")}` : "\`Kapalı\`"}
**Ship-Kanal**: ${y.ShipChannel != "1" ? `<#${y.ShipChannel}>` : "\`Kapalı\`"}
**Yetki-Atlama-Log:** (${dataStat.AutoRankUP.LogChannel ? `${dataStat.AutoRankUP.LogChannel}` : "Kapalı"})
**Level-Log:** (${dataStat.LevelSystem.LogChannel ? `${dataStat.LevelSystem.LogChannel}` : "Kapalı"})

`)}
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
interaction.message.delete()
await interaction.channel.send({ embeds: [channelsembed], components: [setupRow] }).catch({});


    }
    if (interaction.values[0] === "Category") {
      await interaction.deferUpdate();
        const channelsembed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.
${arr.map(y => `\`\`\`fix\n Kategori Ayarları \`\`\`
**Public Parent:** (${dataStat.PublicKanallar.Id.length > 0 ? dataStat.PublicKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 public #PUBLİC\`"})
**Game Parent:** (${dataStat.GameKanallar.Id.length > 0 ? dataStat.GameKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 game #GAME\`"})
**Register Parent:** (${dataStat.KayitKanallar.Id.length > 0 ? dataStat.KayitKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 register #REGİSTER\`"})
**Stream Parent:** (${dataStat.StreamKanallar.Id.length > 0 ? dataStat.StreamKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 streamer #STREAMER\`"})
**Secret Parent:** (${dataStat.SecretKanallar.Id.length > 0 ? dataStat.SecretKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 secret #SECRET\`"})
**Alone Parent:** (${dataStat.AloneKanallar.Id.length > 0 ? dataStat.AloneKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 alone #ALONE\`"})
**Terapi Parent:**  (${dataStat.TerapiKanallar.Id.length > 0 ? dataStat.TerapiKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 terapi #TERARİ\`"})
**Sorun Çözme Parent:**  (${dataStat.SorunCozmeKanallar.Id.length > 0 ? dataStat.SorunCozmeKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 sorunçözme #SORUNÇÖZME\`"})
**Müzik Odaları:**  (${dataStat.Müzik.Id.length > 0 ? dataStat.Müzik.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 müzik #Müzik Odası\`"})
**Toplantı Odası:** (${dataStat.Toplantı.Id.length > 0 ? dataStat.Toplantı.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 toplantı #Toplantı Odası\`"})
**Genel-Chat:** (${dataStat.MesajKanallar.Id.length > 0 ? dataStat.MesajKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "\`.setup2 genelchat #genel-chat\`"})
**Sleep Room:** (${dataStat.SleepingKanal.Id > 0 ? message.guild.channels.cache.get(dataStat.SleepingKanal.Id) : "\`.setup sleep #Sleep Room\`"})
`)}
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
interaction.message.delete()
await interaction.channel.send({ embeds: [channelsembed], components: [setupRow] }).catch({});


  }
    })
    })  

}

        }
exports.conf = {aliases: ["panelsetup2"]}
exports.help = {name: 'yardımsetup2'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }