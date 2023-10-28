const Discord = require('discord.js');
const { ButtonStyle, EmbedBuilder, ButtonBuilder, Events, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const Custom = require("../../models/menü")
const settings = require('../../../settings');
const moment = require("moment");
let sunucuayar = require("../../models/sunucuayar");

require("moment-duration-format");
const Ec = [
  "Etkinlik",
  "Cekilis"
  ];
  
  const Horoscopes = [
      "Koç",
      "Aslan",
      "Yay",
      "Balık",
      "Ikizler",
      "Kova",
      "Akrep",
      "Terazi",
      "Boğa",
      "Yengeç",
      "Oğlak",
      "Başak"
  ];
  
  const Ship = [
      "Couple",
      "Alone"
  ];
  const Games = [
    "LOL",
    "CSGO",
    "Valorant",
    "Fortnite",
    "GTA",
    "PUBG",
  ];
  const wex = [
    "Siyah",
    "Su Yeşili",
    "Turkuaz",
    "Gold",
    "Gün Batımı",
    "Sarı",
    "Nar Çiçeği",
    "Lacivert",
    "Bordo",
    "Grimsi",
    "Kırmızı",
    "Yeşil",
  ];
  const Colors = [
   "Siyah",
   "Su Yeşili",
   "Turkuaz",
   "Gold",
   "Gün Batımı",
   "Sarı",
   "Nar Çiçeği",
   "Lacivert",
   "Bordo",
   "Grimsi",
   "Kırmızı",
   "Yeşil",
   "Turuncu",
   "Mor",
   "Pembe",
  ];
client.on(Events.InteractionCreate, async (interaction) => {
  let server = await sunucuayar.findOne({guildID: interaction.guild.id});  

  if(interaction.isStringSelectMenu()) {
    if(interaction.customId === "etkinlik") {

      const etkinlik = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "Etkinlik Katılımcısı 🎉")
      const cekilis = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "Çekiliş Katılımcısı 🎉")
      let eventsMap = new Map([
        ["etkinlik", etkinlik],
        ["cekilis", cekilis],
      ])
      let roles = [etkinlik, cekilis] 
      var role = []
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = eventsMap.get(ids)
        var role = []
        role.push(den);
      }
      if (interaction.values[0] === "ecRemove") {
          await interaction.member.roles.remove(roles)
        } else {
          if (!interaction.values.length) {
              await interaction.member.roles.remove(roles).catch(err => {})
            } else if (interaction.values.length > 1) {
              await interaction.member.roles.add(roles).catch(err => {})
            } else {
              //await interaction.member.roles.remove(roles).catch(err => {})
              await interaction.member.roles.add(role).catch(err => {})
            }
        }
      interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })
    } 
    if(interaction.customId === "burc") {
    
const koç = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♈ Koç")
const boğa = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♉ Boğa")
const ikizler = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♊ İkizler")
const yengeç = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♋ Yengeç")
const aslan = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♌ Aslan")
const başak = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♍ Başak")
const terazi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♎ Terazi")
const akrep = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♏ Akrep")
const yay = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♐ Yay")
const oğlak = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♑ Oğlak")
const kova = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♒ Kova")
const balık = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "♓ Balık")

let burçMap = new Map([
["koç", koç],
["boğa", boğa],
["ikizler", ikizler],
["yengeç", yengeç],
["aslan", aslan],
["başak", başak],
["terazi", terazi],
["akrep", akrep],
["yay", yay],
["oğlak", oğlak],
["kova", kova],
["balık", balık],
])
let roles = [koç, boğa, ikizler, yengeç, aslan, başak, terazi, akrep, yay, oğlak, kova, balık]
var role = []
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = burçMap.get(ids)
        var role = []
        role.push(den);
      }
      if (interaction.values[0] === "burcRoleRemove") {
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
interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })      
    }
    if(interaction.customId === "oyun2") {
     
      const lol = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 League of Legends")
      const csgo = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 CS:GO")
      const valorant = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 Valorant")
      const fortnite = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 Fortnite")
      const gta = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 Gta V")
      const pubg = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🎮 PUBG")

      let GameMap = new Map([
        ["lol", lol],
        ["csgo", csgo],
        ["valorant", valorant],
        ["fortnite", fortnite],
        ["gta", gta],
        ["pubg", pubg],
      ])
      let roles = [lol,csgo, valorant, fortnite, gta, pubg]
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = GameMap.get(ids)
        var role = []
        role.push(den);
      }
      if (interaction.values[0] === "gameRoleRemove") {
          await interaction.member.roles.remove(roles)
        } else {
          if (!interaction.values.length) {
              await interaction.member.roles.remove(roles).catch(err => {})
            } else if (interaction.values.length > 1) {
              await interaction.member.roles.add(roles).catch(err => {})
            } else {
              //await interaction.member.roles.remove(roles).catch(err => {})
              await interaction.member.roles.add(role).catch(err => {})
            }
        }
      interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })

    }
    if(interaction.customId === "iliski3") {

      const couple = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "Couple 💍")
      const alone = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "Alone 💔")

        let ilişki = new Map([
            ["couple", couple],
            ["alone", alone],
          ])
          let iliskiroller = [couple, alone]
          for (let index = 0; index < interaction.values.length; index++) {
            let ids = interaction.values[index]
            let den = ilişki.get(ids)
            var role = []
            role.push(den);
          }
          if (interaction.values[0] === "iliskiRoleRemove") {
            await interaction.member.roles.remove(iliskiroller)
          } else {
            if (!interaction.values.length) {
                await member.roles.remove(iliskiroller).catch(err => {})
              } else if (interaction.values.length > 1) {
                await member.roles.add(iliskiroller).catch(err => {})
              } else {
                await interaction.member.roles.remove(iliskiroller).catch(err => {})
                await interaction.member.roles.add(role).catch(err => {})
              }
          }
            interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })
    }

    
    if(interaction.customId === "renkcik") {
      const siyah = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌑")
      const suyesili = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🥦")
      const turkuazmavi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "💙")
      const gold = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍍")
      const gunbatimi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌄")
      const sari = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "💛")
      const narcicegi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌸")
      const lacivert = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🔵")
      const bordo = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍒")
      const grimsi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "❄️")
      const kirmizi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍓")
      const turuncu  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍊")
      const yesil  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🥑")
      const mor  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍇")
      const pembe = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍑")
      let color = new Map([
        ["siyah", siyah],
        ["su yeşili", suyesili],
        ["turkuaz", turkuazmavi],
        ["gold", gold],
        ["gün batımı", gunbatimi],
        ["sarı", sari],
        ["nar çiçeği", narcicegi],
        ["lacivert", lacivert],
        ["bordo", bordo],
        ["grimsi", grimsi],
        ["kırmızı", kirmizi],
        ["yeşil", yesil],

      ])
      let renkroller = [siyah, suyesili, turkuazmavi, gold, gunbatimi, sari, narcicegi, lacivert, bordo, grimsi, kirmizi, yesil, turuncu, mor, pembe,]
      
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = color.get(ids)
        var role = []
        role.push(den);
      }
      if (!interaction.member.roles.cache.has(server.TEAM) && !interaction.member.roles.cache.has(server.BOOST) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
      } else {
        if (interaction.values[0] === "renkRoleRemove") {
          await interaction.member.roles.remove(renkroller)
        } else {
          if (!interaction.values.length) {
              await member.roles.remove(renkroller).catch(err => {})
            } else if (interaction.values.length > 1) {
              await interaction.member.roles.add(renkroller).catch(err => {})
            } else {
              await interaction.member.roles.remove(renkroller).catch(err => {})
              await interaction.member.roles.add(role).catch(err => {})
            }
        }
        interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })
      }
    }
    if(interaction.customId === "renk4") {
      const siyah = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌑")
      const suyesili = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🥦")
      const turkuazmavi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "💙")
      const gold = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍍")
      const gunbatimi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌄")
      const sari = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "💛")
      const narcicegi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🌸")
      const lacivert = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🔵")
      const bordo = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍒")
      const grimsi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "❄️")
      const kirmizi = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍓")
      const turuncu  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍊")
      const yesil  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🥑")
      const mor  = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍇")
      const pembe = await client.guilds.cache.get(settings.sunucuId).roles.cache.find(x => x.name === "🍑")
      let color = new Map([
        ["siyah", siyah],
        ["su yeşili", suyesili],
        ["turkuaz", turkuazmavi],
        ["gold", gold],
        ["gün batımı", gunbatimi],
        ["sarı", sari],
        ["nar çiçeği", narcicegi],
        ["lacivert", lacivert],
        ["bordo", bordo],
        ["grimsi", grimsi],
        ["kırmızı", kirmizi],
        ["yeşil", yesil],
        ["mor", mor],
        ["pembe", pembe],
        ["turuncu", turuncu],

      ])
      let renkroller = [siyah, suyesili, turkuazmavi, gold, gunbatimi, sari, narcicegi, lacivert, bordo, grimsi, kirmizi, yesil, turuncu, mor, pembe,]
      
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = color.get(ids)
        var role = []
        role.push(den);
      }
      if (!interaction.member.roles.cache.has(server.TEAM) && !interaction.member.roles.cache.has(server.BOOST) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
      } else {
        if (interaction.values[0] === "renkRoleRemove") {
          await interaction.member.roles.remove(renkroller)
        } else {
          if (!interaction.values.length) {
              await member.roles.remove(renkroller).catch(err => {})
            } else if (interaction.values.length > 1) {
              await interaction.member.roles.add(renkroller).catch(err => {})
            } else {
              await interaction.member.roles.remove(renkroller).catch(err => {})
              await interaction.member.roles.add(role).catch(err => {})
            }
        }
        interaction.reply({ content: "Başarıyla Rolleriniz güncellendi!", ephemeral: true })
      }
    }
  } 

});

exports.run = async function (client, message, params) {
  if (!message.guild) return
  if (!client.ayarlar.sahip.some(x => x == message.author.id)) return
    
    const ecActionRow = new ActionRowBuilder()
    const burcActionRow = new ActionRowBuilder()
    const gameActionRow = new ActionRowBuilder()
    const iliskiActionRow = new ActionRowBuilder()
    const renkActionRow = new ActionRowBuilder()

    const ecSelect = new StringSelectMenuBuilder()
    .setCustomId("etkinlik")
    .setMaxValues(2)
    .setMinValues(1)
    .setPlaceholder("Etkinlik Rolleri");


    const burcSelect = new StringSelectMenuBuilder()
    .setCustomId("burc")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Burç Rolleri");

    const gameSelect = new StringSelectMenuBuilder()
    .setCustomId("oyun2")
    .setMaxValues(6)
    .setMinValues(1)
    .setPlaceholder("Oyun Rolleri");

    const iliskiSelect = new StringSelectMenuBuilder()
    .setCustomId("iliski3")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("İlişki Rolleri");

    const renkSelect = new StringSelectMenuBuilder()
    .setCustomId("renk4")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Renk Rolleri");
    const wexselect = new StringSelectMenuBuilder()
    .setCustomId("renkcik")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Renk Rolleri");

    const emojiBul = (emojiName) => {
      if (!emojiName) return console.error(`[HATA]: Emoji Belirtiniz`);
      const emoji = client.emojis.cache.find(x => x.name === emojiName); // Tam bir eşleşme için === kullanıldı.
      console.log(emoji ? emoji.id : "bulunamadı");
      return emoji ? emoji.id : "1102692516626710708";
  }
  
  const turkceToIngilizce = (text) => {
      return text
          .replace(/ç/g, 'c')
          .replace(/İ/g, 'i')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's');
  };


    Ec.forEach(horoscope => {
      ecSelect.addOptions([
        {
          label: horoscope,
          value: horoscope.toLowerCase(),
          emoji: emojiBul(turkceToIngilizce(horoscope))
        }
      ]);
    });
    
    Horoscopes.forEach(horoscope => {
      burcSelect.addOptions([
        {
          label: horoscope,
          value: horoscope.toLowerCase(),
          emoji: emojiBul(turkceToIngilizce(horoscope))
        }
      ]);
    });
    
    Ship.forEach(ship => {
      iliskiSelect.addOptions([
        {
          label: ship,
          value: ship.toLowerCase(),
          emoji:emojiBul(turkceToIngilizce(ship))
        }
      ]);
    });

    Games.forEach(game => {
      gameSelect.addOptions([
        {
          label: game,
          value: game.toLowerCase(),
          emoji: emojiBul(turkceToIngilizce(game))

        }
      ]);
    });

    Colors.forEach(colors => {
      renkSelect.addOptions([
        {
          label: colors,
          value: colors.toLowerCase(),
          //emoji: emojiBul(turkceToIngilizce(colors)) 

        }
      ]);
    });

    ecSelect.addOptions([
      {
        label: "Rol İstemiyorum.",
        value: "ecRemove",
        emoji: "1102692516626710708"
      }
    ]);

    burcSelect.addOptions([
      {
        label: "Rol İstemiyorum.",
        value: "burcRoleRemove",
        emoji: "1102692516626710708"
      }
    ]);
    
    iliskiSelect.addOptions([
      {
        label: "Rol İstemiyorum.",
        value: "iliskiRoleRemove",
        emoji: "1102692516626710708"
      }
    ]);

    gameSelect.addOptions([
      {
        label: "Rol İstemiyorum.",
        value: "gameRoleRemove",
        emoji: "1102692516626710708",
      }
    ]);

    renkSelect.addOptions([
      {
        label: "Rol İstemiyorum.",
        value: "renkRoleRemove",
        emoji: "1102692516626710708"
      }
    ]);

    ecActionRow.addComponents(ecSelect);
    burcActionRow.addComponents(burcSelect);
    gameActionRow.addComponents(gameSelect);
    iliskiActionRow.addComponents(iliskiSelect);
    renkActionRow.addComponents(renkSelect);

    message.channel.send({ content: `Merhaba **${message.guild.name}** üyeleri,\nSunucuda sizleri rahatsız etmemek için  \` @everyone \`  veya  \` @here \`  atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.\n\n__Aşağıda ki menülere basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__` , components: [ecActionRow,burcActionRow, gameActionRow, iliskiActionRow, renkActionRow ] });


  

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['menürol'],
  permLevel: 4
};

exports.help = {
  name: 'menurol',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};

