const { Client, Events,ComponentType,Message,ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits,ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const Discord  = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");3
let ceza = require("../../models/ceza");
let teyit = require("../../models/teyit");
let moment = require("moment");
moment.locale("tr");
let Database = require("../../models/invite");
const Stat = require("../../models/stats");

client.on(Events.InteractionCreate, async (interaction) => {

  if(interaction.values  == "cezapuanpanel") {
    let cezalar = await ceza.find({
      userID: interaction.member.id
  });
  if (cezalar.length == 0) {
      cezalar = [{
          Puan: 0
      }, {
          Puan: 0
      }];
  };
  let toplam = 0;
  for (var oge of cezalar.map(x => x.Puan)) {
    if (isNaN(oge)) {
      continue;
    };
    toplam += Number(oge);
  };

  interaction.reply({content: `Sunucu İçerisindeki Cezapuanın: **${toplam}**`, ephemeral: true})
  }

  if(interaction.values  == "isimpanel") {
    teyit.findOne({userID: interaction.member.id}, (err, res) => {
      if(!res) {
return interaction.reply({content: "Kullanıcının isim geçmişi olmadığı için veri görüntüleyemedim.", ephemeral: true})
      } else {
          const History = res.nicknames.map((e, i) => `\`•\` ${e.isimler} (<@${e.execID}>) (<t:${Math.floor(Math.floor(e.date) / 1000)}:R>) [${e.rol}]`).slice(0, 30)
          interaction.reply({ content: `Aşağıda sunucu içerisinde ki isimleriniz (**${History.length}**) sıralandırılmıştır:
──────────────────────
${History.join("\n")}
──────────────────────`, ephemeral: true})
      
      }   
      
      })
  }
  if(interaction.values  == "boosterpanel") {
    const modal = new ModalBuilder()
    .setCustomId("boosterpanel")
    .setTitle("İsim Gümcelleme")
    const soru1 = new TextInputBuilder()
    .setCustomId("isminneolsun")
    .setLabel(`İsim Belirt.`)
    .setPlaceholder("Yeni isminizi belirtiniz. Örn: tatlış erkay")
    .setMinLength(6)
    .setMinLength(12)
    .setStyle(TextInputStyle.Short);
    const AOne = new ActionRowBuilder().addComponents(soru1);
    modal.addComponents(AOne);
    await interaction.showModal(modal);

   }

   if(interaction.values  == "roltemizlepanel") {
    const lol = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 League of Legends")
    const csgo = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 CS:GO")
    const valorant = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 Valorant")
    const fortnite = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 Fortnite")
    const gta = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 Gta V")
    const pubg = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🎮 PUBG")
    const koç = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♈ Koç")
    const boğa = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♉ Boğa")
    const ikizler = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♊ İkizler")
    const yengeç = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♋ Yengeç")
    const aslan = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♌ Aslan")
    const başak = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♍ Başak")
    const terazi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♎ Terazi")
    const akrep = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♏ Akrep")
    const yay = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♐ Yay")
    const oğlak = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♑ Oğlak")
    const kova = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♒ Kova")
    const balık = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "♓ Balık")
          const siyah = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🌑")
    const suyesili = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🥦")
    const turkuazmavi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "💙")
    const gold = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍍")
    const gunbatimi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🌄")
    const sari = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "💛")
    const narcicegi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🌸")
    const lacivert = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🔵")
    const bordo = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍒")
    const grimsi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "❄️")
    const kirmizi = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍓")
    const turuncu  = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍊")
    const yesil  = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🥑")
    const mor  = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍇")
    const pembe = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "🍑")
    const etkinlik = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "Etkinlik Katılımcısı 🎉")
    const cekilis = await client.guilds.cache.get(client.ayarlar.sunucuId).roles.cache.find(x => x.name === "Çekiliş Katılımcısı 🎉")
    let roles = [etkinlik, cekilis,lol,csgo, valorant, fortnite, gta, pubg,siyah, suyesili, turkuazmavi, gold, gunbatimi, sari, narcicegi, lacivert, bordo, grimsi, kirmizi, yesil, turuncu, mor, pembe,koç, boğa, ikizler, yengeç, aslan, başak, terazi, akrep, yay, oğlak, kova, balık]
    await interaction.member.roles.remove(roles)
    interaction.reply({ content: `Üstündeki gereksiz roller temizlendi.`, ephemeral: true})  }

  
  if(interaction.values  == "hesappanel") {
    interaction.reply({ content: `Hesabını \`${moment(interaction.member.createdTimestamp).locale('tr').format("LLL")}\` tarihinde <t:${Math.floor(Math.floor(interaction.member.user.createdAt) / 1000)}:R>  oluşturmuşsun.`, ephemeral: true})  }
  if(interaction.values  == "katilimpanel") {
    interaction.reply({ content: `Sunucuya \`${moment(interaction.member.joinedAt).locale('tr').format("LLL")}\` tarihinde <t:${Math.floor(Math.floor(interaction.member.user.joinedAt) / 1000)}:R>  katılmışsın.`, ephemeral: true})
  }
  if(interaction.values  == "rolbilgipanel") {
    const roles = interaction.member.roles.cache.filter(role => role.id !== interaction.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}> (\`${role.id}\`)`);
    const rolleri = [];
    if (roles.length > 15) {
        const lent = roles.length - 15;
        let itemler = roles.slice(0, 15);
        itemler.map(x => rolleri.push(x));
        rolleri.push(`${lent}...`);
    } else {
        roles.map(x => rolleri.push(x));
    };
    interaction.reply({ content: `Üstünüzde bulunan rol(ler) şunlardır.
${rolleri.join("\n")}
Üzeriniz de ${rolleri.length} adet rol(ler) bulunmaktadır.
    `, ephemeral: true})

  }
  if(interaction.values  == "sunucupanel") {
    var AktifMember = interaction.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size

    interaction.reply({ content: `**${interaction.guild.name}** Sunucusunun Bilgisi
Sunucumuz da **${interaction.guild.memberCount}** üye bulunmakta.
Sunucumuz da **${AktifMember}** aktif üye bulunmakta.
`, ephemeral: true})
  }
  if(interaction.values  == "haftalıkpanel") {
    Stat.findOne({
      userID: interaction.member.id,
      guildID: interaction.guild.id
  }, (err, data) => {
      if (!data) data = {
          yedi: {
              Voice: {},
              Chat: {}
          },
          voiceCategory: {},
          voiceChannel: {},
          messageChannel: {},
          voiceLevel: 1,
          messageLevel: 1,
          voiceXP: 0,
          messageXP: 0,
          coin: 0.0
      }

    let voiceCategory = Object.keys(data.voiceCategory).splice(0, 10).sort(function (a, b) {
        return data.voiceCategory[b] - data.voiceCategory[a]
    }).map((x, index) => `\`${index + 1}\` ${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${client.convertDuration(data.voiceCategory[x])}\``).join("\n");
    let voiceChannel = Object.keys(data.voiceChannel).splice(0, 10).sort(function (a, b) {
        return data.voiceChannel[b] - data.voiceChannel[a]
    }).map((x, index) => `\`${index + 1}\` ${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${client.convertDuration(data.voiceChannel[x])}\``).join("\n");
    let messageChannel = Object.keys(data.messageChannel).splice(0, 5).sort(function (a, b) {
        return data.messageChannel[b] - data.messageChannel[a]
    }).map((x, index) => `\`${index + 1}\` ${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${data.messageChannel[x]} mesaj\``).join("\n");
    let embed = new Discord.EmbedBuilder()
    .setFooter({ text: client.ayarlar.footer })

        .setThumbnail("https://cdn.discordapp.com/attachments/774447325060923393/812908877636567090/unknown.png")
        .setDescription(`hey ${interaction.member} basitleştirilmiş sunucu istatistiklerin.\n`)
    embed.addFields([{name: `:bookmark: Kategori İstatistikleri (${client.convertDuration(data.totalVoice)})`,value: `${voiceCategory ? voiceCategory : "Veriler henüz yüklenmedi"}`,}])
    embed.addFields([{name: `${client.emojis.cache.find(x => x.name == "wex_ses")} **Ses Sıralaması** (Toplam ${Object.keys(data.voiceChannel).length} kanalda durmuş)`,value: `${voiceChannel ? voiceChannel : "Veriler henüz yüklenmedi"}`,}])
    embed.addFields([{name: `${client.emojis.cache.find(x => x.name == "wex_mesaj")} **Mesaj Sıralaması** (${data.totalMessage} mesaj)`,value: `${messageChannel ? messageChannel : "Veriler henüz yüklenmedi"}`,}])
    interaction.reply({embeds: [embed], ephemeral: true});

  })



  }

  if(interaction.values  == "davetpanel") {
    Database.findOne({
      guildID: interaction.guild.id,
      userID: interaction.member.id
  }, (err, inviterData) => {
      if (!inviterData) {
          interaction.reply({ content: `Toplam **0** davete sahip! (**0** gerçek, **0** bonus, **0** fake, **0** haftalık)`, ephemeral: true});
      } else {
          Database.find({
              guildID: interaction.guild.id,
              inviterID: interaction.member.id
          }).sort().exec((err, inviterMembers) => {
              let dailyInvites = 0;
              if (inviterMembers.length) {
                  dailyInvites = inviterMembers.filter(x => interaction.guild.members.cache.has(x.userID) && (Date.now() - interaction.guild.members.cache.get(x.userID).joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).length;
              };
              interaction.reply({ content: `Toplam **${inviterData.regular+inviterData.bonus}** davete sahip! (**${inviterData.regular}** gerçek, **${inviterData.bonus}** bonus, **${inviterData.fake}** fake, **${dailyInvites}** haftalık)`, ephemeral: true});
            });
      };
  });
  }
})


client.on(Events.InteractionCreate, async (interaction) => {
  if(interaction.customId === 'boosterpanel'){
    if (!interaction.member.roles.cache.has("1112122263257493656")) {
      await interaction.reply({ content: `İsmini güncellemek için sunucumuza **Boost** basmış olman gerek.`, ephemeral: true });

    } else {
      const s1 = interaction.fields.getTextInputValue('isminneolsun');
      teyit.findOne({userID: interaction.member.id}, (err, res) => {
                    
                    
        if(!res) {
            new teyit({userID: interaction.member.id, nicknames: [{isimler: s1 ,rol: `Booster İsim Güncelleme`, execID: interaction.member.id, date: Date.now()}]}).save()
            } else {
                res.nicknames.push({isimler: s1,rol: `Booster İsim Güncelleme`, execID: interaction.member.id, date: Date.now()})
                res.save()}})

      await interaction.reply({ content: `Başarılı bir şekilde ismin güncellendi. [Yeni ismin: **${s1}** ]`, ephemeral: true });
  interaction.member.setNickname(s1)
  }
   
  }
  if(interaction.customId === 'sorunilett'){
      const s1 = interaction.fields.getTextInputValue('sorunne');
      await interaction.reply({ content: `Sorunun Başarıyla kurucularımıza iletildi.`, ephemeral: true });
      let embed = new Discord.EmbedBuilder()
      .setFooter({ text: client.ayarlar.footer })
      .setDescription(`hey ${interaction.member} adlı üye bir sorununu belirtti.\n`)
      embed.addFields([{name: `Üye Bilgileri;`,value: `${interaction.member} - (\`${interaction.member.id}\`)`,}])  
      embed.addFields([{name: `Sorunu;`,value: `${s1}`,}])  

      await client.channels.cache.get("1151536360042274836").send({embeds: [embed]})
    }
   
  })


exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return
  if (message.author.id !== "728161454288535604") return;
  const yetkiliistiom = new ButtonBuilder().setLabel("Yetkili Olmak İstiyorum").setCustomId("ybasvuru").setStyle(ButtonStyle.Success).setEmoji("1128662510149574766")
  const isteklerimiiletcem = new ButtonBuilder().setLabel("İstek / Öneri").setCustomId("istekilet").setStyle(ButtonStyle.Secondary).setEmoji("989129365973499925").setDisabled(true)

const row = new ActionRowBuilder()
.addComponents([yetkiliistiom, isteklerimiiletcem])
  const rowStat = new ActionRowBuilder()
  .addComponents(
  new StringSelectMenuBuilder()
  .setCustomId('newpanel')
  .setPlaceholder(`Seçim yap`)
  .addOptions([
    { label: 'Ceza Puanı', description: 'Sunucu içerisindeki cezapuanım.', value: 'cezapuanpanel', emoji: '783371682835464242'},
    { label: 'İsim Bilgisi', description: 'Sunucudaki eski isim bilgilerinizi görüntüleyin.', value: 'isimpanel', emoji: '783371682835464242'},
    { label: 'Hesap Tarihi', description: 'Hesabınızın açılış tarihini öğrenin.', value: 'hesappanel', emoji: '783371682835464242'},
    { label: 'Davet Bilgisi', description: `Davet bilgilerinizi öğrenin`, value: 'davetpanel' , emoji: '783371682835464242'},
    { label: 'Katılım Tarihi', description: 'Sunucuya giriş tarihinizi öğrenin.', value: 'katilimpanel', emoji: '783371682835464242'},
    { label: 'İsim Güncelleme', description: 'Sunucuya taktive bastıysanız isminizi buradan güncelleyebilirsin.', value: 'boosterpanel', emoji: '783371682835464242'},
    { label: 'Sunucu İstatistiklerin', description: 'Sunucudaki basitleştirişmiş ses ve mesaj istatistiklerinizi görüntüleyin.', value: 'haftalıkpanel', emoji: '783371682835464242'},
    { label: 'Gereksiz Rol Temizle', description: 'Üstünüzde bulunan etkinlik ve diğer rolleri alır.', value: 'roltemizlepanel', emoji: '783371682835464242'},
    { label: 'Sunucu Bilgisi', description: 'Sunucunun anlık aktif listesini görüntüleyin.', value: 'sunucupanel', emoji: '783371682835464242'},
    { label: 'Rol Bilgisi', description: 'Üstünüzde bulunan rollerin listesini alın.', value: 'rolbilgipanel', emoji: '783371682835464242'},


  ]),
  );
  let msg = await message.channel.send({ content: `Merhaba! **${message.guild.name}**
Yetkili olmak mı istiyorsun?
Botlarla veya komutlarla ilgili bir sorunun mu var? 
Sunucu içerisindeki bilgilerini mi öğrenmek istiyorsun?
Aşağıda ki menü veya düğmeleri kullanarak yapabileceğiniz kısayollar bulunmaktadır.
  `, components: [rowStat, row, row2] });

  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['newpanel'],
  permLevel: 4
};

exports.help = {
  name: 'panelnew',
  description: "Sunucuda komut denemeye yarar",
  usage: 'eval <kod>',
  kategori: "Bot Yapımcısı"
};

