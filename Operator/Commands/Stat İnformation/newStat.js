const { Client, ComponentType,Message, ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const Discord  = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const ms = require("ms")
const Canvas = require("canvas");

const {
  loadImage
} = require('canvas');
const {
  join
} = require("path");
const streamerUser = require("../../models/streamerUser");
const Stat = require("../../models/stats");
let moment = require("moment");
const streamerUserChannel = require("../../models/streamerUserChannel");
const cameraUserChannel = require("../../models/cameraUserChannel");
let Database = require("../../models/invite");
let teyit = require("../../models/stats");

let voiceUserChannel = require("../../models/weeklyvoicechannel");

const ayarlar = require("../../../settings")
const messageUser = require("../../models/weeklymessage");
const voiceUser = require("../../models/weeklyvoice");
let profil = require("../../models/profil");
const Seens = require("../../models/Seens")
let puansystem = require("../../models/puansystem");


module.exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  let background = await loadImage("https://media.discordapp.net/attachments/1146865103464050770/1153025622642270388/2.png");

  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const Active6 = await cameraUserChannel.find({ userID: target.id }).sort({ channelData: -1 });
  const Active5 = await streamerUserChannel.find({  userID: target.id }).sort({ channelData: -1 });
  const İnvite = await Database.find({     guildID: message.guild.id,     userID: target.id})
  let loading = await message.reply(`${client.emojis.cache.find(x => x.name == "wex_stat")} **| ${target.user.tag}** isimli kullanıcının verileri yükleniyor. Lütfen bekleyin!`)
 message.react(client.emojis.cache.find(x => x.name === "wex_tik"))
  let messageData = await messageUser.findOne({
    userID: target.id,
    guildID: message.guild.id
}) || {
    
        dailyStat: 0,
        weeklyStat: 0,
        topStat: 0,
        topStat: 0
    
};

let voiceData = await voiceUser.findOne({
    userID: target.id,
    guildID: message.guild.id
}) || {
    
        dailyStat: 0,
        weeklyStat: 0,
        topStat: 0,
        topStat: 0
    
};
let streamer = await streamerUser.findOne({
    userID: target.id,
    guildID: message.guild.id
}) || {
    
        topStat: 0,
    
};

const rowStat = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('statscık')
.setPlaceholder(`${target.user.tag} üyesinin detaylarını görüntüle.`)
.addOptions([
  { label: 'Genel İstatistikler', description: 'Tüm veri detaylarını görüntüle.', value: 'genestats', emoji: '1135498659262369824'},
  { label: 'Haftalık İstatistikler', description: 'Hafttalık veri detaylarını görüntüle.', value: 'weeklystats', emoji: '1135498659262369824'},
  { label: 'Yayın İstatistikleri', description: 'Yayın veri detaylarını görüntüle.', value: 'streamerstatss', emoji: '1046440532538298389'},
  { label: 'İstatistik Kartı', description: `${target.user.tag} üyesinin istatistik kartını görüntüle`, value: 'statkartı' , emoji: '989129368225857546'},
  { label: 'Rozet Bilgisi', description: `${target.user.tag} üyesinin rozet bilgisini görüntüle`, value: 'rozetbilgisi', emoji: '989129364320968704'},
]),
);
const rowStat2 = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('statscık')
.setPlaceholder(`${target.user.tag} üyesinin detaylarını görüntüle.`)
.addOptions([
  { label: 'Genel İstatistikler', description: 'Tüm veri detaylarını görüntüle.', value: 'genestats', emoji: '1135498659262369824'},
  { label: 'Haftalık İstatistikler', description: 'Hafttalık veri detaylarını görüntüle.', value: 'weeklystats', emoji: '1135498659262369824'},
  { label: 'Yayın İstatistikleri', description: 'Yayın veri detaylarını görüntüle.', value: 'streamerstatss', emoji: '1046440532538298389'},
  { label: 'İstatistik Kartı', description: `${target.user.tag} üyesinin istatistik kartını görüntüle`, value: 'statkartı' , emoji: '989129368225857546'},
  { label: 'Rozet Bilgisi', description: `${target.user.tag} üyesinin rozet bilgisini görüntüle`, value: 'rozetbilgisi', emoji: '989129364320968704'},
]),
);


const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: target.user.id }).sort({ channelData: -1 });
const voiceLength = Active2 ? Active2.length : 0;
let voiceTop;
Active2.length > 0
? (voiceTop = Active2.splice(0, 5)
        .map((x) => `${message.guild.channels.cache.get(x) ? message.guild.channels.cache.get(x).name : "Kanal Bulunamadı."} \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)
        .join("\n"))
: (voiceTop = "Veri bulunmuyor.");

const Active3 = await voiceUserChannel.find({ guildID: message.guild.id, userID: target.user.id }).sort({ channelData: -1 });
const voiceLength2 = Active3 ? Active3.length : 0;
let voiceTop2;
Active3.length > 0
? (voiceTop2 = Active3.splice(0, 5)
        .map((x) => `${message.guild.channels.cache.get(x.parentID) ? message.guild.channels.cache.get(x.parentID).name : "#kanal-silindi"} \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)
        .join("\n"))
: (voiceTop2 = "Veri bulunmuyor.");


  let streamerList;
  Active5.length > 0
      ? (streamerList = Active5.splice(0, 3)
              .map((x) => `${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : "#kanal-silindi"} \`${moment.duration(x.channelData).format("H [saat], m [dk.]")}\``)
              .join("\n"))
      : (streamerList = "Veri bulunmuyor.");

      let camewraList;
      Active6.length > 0
          ? (camewraList = Active6.splice(0, 3)
                  .map((x) => `${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : "#kanal-silindi"} \`${moment.duration(x.channelData).format("H [saat], m [dk.]")}\``)
                  .join("\n"))
          : (camewraList = "Veri bulunmuyor.");
    

  let profilData = await profil.findOne({
      userID: target.id,
      guildID: message.guild.id
  }) || {
      userID: target.id,
      guildID: message.guild.id,
      BanAmount: 0,
      JailAmount: 0,
      MuteAmount: 0,
      VoiceMuteAmount: 0
  };
  let data2 = await Stat.findOne({
    userID: target.id,
    guildID: message.guild.id
}) || {
    yedi: {
        Chat: {},
        Voice: {},
        TagMember: 0,
        Invite: 0,
        Register: 0,
        Yetkili: 0
    },
    messageChannel: {}
};

let rozetler = []
if(target.id == message.guild.ownerId) rozetler.push("guild_owner")
if(target.user.id == "728161454288535604") {
    rozetler.push("dev")
}
let yetkis = ["1141038032707932260", "1143243472086761492", "1141003821649236038"]
if(yetkis.some(x => target.roles.cache.has(x))) rozetler.push("wex_staff")
let vip = "1141003898849603684"
if(vip && message.guild.roles.cache.has(vip) && target.roles.cache.has(vip)) rozetler.push("wex_vip")
let booster = "1112122263257493656"
if(booster && message.guild.roles.cache.has(booster) && target.roles.cache.has(booster)) rozetler.push("wex_booster")



let avatar = await loadImage(target.user.displayAvatarURL({ extension: "jpg"  }));

let canvas = Canvas.createCanvas(1190, 666),


kart_resim = canvas.getContext("2d");""
kart_resim.drawImage(background, 0, 0, 1190, 666)
kart_resim.drawImage(avatar, 23, 15, 198, 198)

kart_resim.font = '45px "Marlin Geo Black"';
let uname = target.user.username;
if (uname.length > 5) {
  uname = uname.slice(0, 5);
}
kart_resim.fillText(`${target.user.tag.replace("ş","s").replace("Ş","S").replace("İ","I").replace("ı","i").replace("Ç","C").replace("ç","c").replace("Ğ","G").replace("ğ","g").replace("Ö","O").replace("ö","ö")}`, String(target.user.tag).length > 9 ? String(target.user.tag).length > 12 ? 240 :  260 : 280 , 110, 350)

let baslangic = 315


let seens = await Seens.findOne({userID: target.id});

let weekly = await Seens.findOne({userID: target.id});


  let statemoji = client.emojis.cache.find(x => x.name === "wex_circle");
  let BanMiktar = profilData.BanAmount
  let JailMiktar = profilData.JailAmount
  let MuteMiktar = profilData.MuteAmount;
  let SesMuteMiktar = profilData.VoiceMuteAmount
  let kanallar = await puansystem.findOne({
    guildID: message.guild.id
});
      
    for (let i = 0; i < rozetler.slice(0, 5).length; i++) {
        let rozet = client.emojis.cache.find(x => x.name == String(rozetler[i]))
        if(rozet && rozet.url) {
         let rozet_resim = await loadImage(rozet.url.replace("webp", "png"))
         kart_resim.drawImage(rozet_resim, baslangic, 133, 22.5, 22.5)
         baslangic += 35
        }
  
    }


 let data = Stat.findOne({
      userID: target.id,
      guildID: message.guild.id
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
        

      let sleeping;
      if (!data.yedi.Voice) sleeping = 0;
      else sleeping = data.yedi.Voice[kanallar.SleepingKanal.Id] || 0;

      let status = target?.presence?.status ? target?.presence?.status?.toString().replace("dnd", `DND Etmeyin`).replace("online", `ONLİNE`).replace("idle", `IDLE`).replace("offline", `OFFLİNE`) : `OFFLİNE`

  
      const members = message.guild.members.cache.filter(x => !x.user.bot).sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
      const joinPos = members.map((u) => u.id).indexOf(target.id);
  
      kart_resim.font = '20px Bold';
      kart_resim.fillText(`Veri Alınamadı.`, 675, 80, 200)
     kart_resim.fillText(`Veri Alınamadı.`, 675, 143, 200)
     kart_resim.fillText(`0 Beğeni.`, 955, 80, 200)
     kart_resim.fillText(`0 Takipçi.`, 955, 143, 200)
     kart_resim.font = '20px Bold';
     kart_resim.fillText(`${data.totalMessage} MESAJ`, 80, 345, 200)
     kart_resim.fillText(`${moment.duration(streamer.topStat).format("H [saat], m [dk.]")}`, 80, 410, 200)
     kart_resim.fillText(`${client.convertDuration(data.totalVoice)}`, 80 * 4 + 45, 345, 200)
     kart_resim.fillText(`${client.convertDuration(sleeping)} AFK`, 80 * 4 + 45, 410, 200)
     kart_resim.fillText(`${messageData.weeklyStat || "0"} MESAJ`, 670, 345, 200)
     kart_resim.fillText(`${moment.duration(streamer.topStat).format("H [saat], m [dk.]")}.`, 670, 410, 200)
     kart_resim.fillText(`${moment.duration(voiceData.weeklyStat).format("H [saat], m [dk.]")}`, 955, 345, 200)
     kart_resim.fillText(`${client.convertDuration(sleeping)} AFK`, 955, 410, 200)
     kart_resim.font = '20px Bold';
     kart_resim.fillText(`KATILIM: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <=target.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}`, 670, 567, 180)
     kart_resim.font = '20px Bold';
     kart_resim.fillText(`Veri Alınamadı.`, 670, 632, 200)
     kart_resim.font = '20px Bold';
     kart_resim.fillText(`${Object.keys(data.voiceChannel).length > 0 ? message.guild.channels.cache.get(Object.keys(data.voiceChannel).sort((x, y) => data.voiceChannel[y] - data.voiceChannel[x])[0]) ? `#${message.guild.channels.cache.get(Object.keys(data.voiceChannel).sort((x, y) => data.voiceChannel[y] - data.voiceChannel[x])[0]).name}` : "Kanal Bulunamadi!" : "Kanal Bulunamadi!"}`, 955, 567, 200)
     kart_resim.fillText(`${Object.keys(data.messageChannel).length > 0 ? message.guild.channels.cache.get(Object.keys(data.messageChannel).sort((x, y) => data.messageChannel[y] - data.messageChannel[x])[0]) ? `#${message.guild.channels.cache.get(Object.keys(data.messageChannel).sort((x, y) => data.messageChannel[y] - data.messageChannel[x])[0]).name}` : "Kanal Bulunamadi!" : "Kanal Bulunamadi!"}`, 955, 632, 200)
     kart_resim.font = '20px Bold';
     kart_resim.font = '20px Bold';
     kart_resim.fillText(`${moment(data.lastSeenMessage).format("LLL")}`, 80, 345 + 222, 200)
     kart_resim.fillText(`Veri Alınamadı.`, 80, 410 + 223, 200)
     kart_resim.fillText(`${moment(data.lastSeenVoice).format("LLL")}`, 80 * 4 + 45, 345 + 222, 200)
     kart_resim.fillText(`Tip: ${status} `, 80 * 4 + 45, 410 + 223, 200)

    
      let voiceCategory = Object.keys(data.voiceCategory).splice(0, 5).sort(function (a, b) {
          return data.voiceCategory[b] - data.voiceCategory[a]
      }).map((x, index) => `${message.guild.channels.cache.get(x) ? message.guild.channels.cache.get(x) : "Kategori Bulunamadı."} \`${client.convertDuration(data.voiceCategory[x])}\``).join("\n");
      let messageCategory = Object.keys(data.messageCategory).splice(0, 5).sort(function (a, b) {
        return data.voiceCategory[b] - data.messageCategory[a]
    }).map((x, index) => `${message.guild.channels.cache.get(x) ? message.guild.channels.cache.get(x) : "Kategorisiz Kanallar"} \`${data.messageCategory[x]}\``).join("\n");
      let voiceChannel = Object.keys(data.voiceChannel).splice(0, 5).sort(function (a, b) {
          return data.voiceChannel[b] - data.voiceChannel[a]
      }).map((x, index) => `\`${index + 1}\` ${message.guild.channels.cache.get(x) ? message.guild.channels.cache.get(x).name : "Kanal Bulunamadı."} \`${client.convertDuration(data.voiceChannel[x])}\``).join("\n");
      let messageChannel = Object.keys(data.messageChannel).splice(0, 5).sort(function (a, b) {
          return data.messageChannel[b] - data.messageChannel[a]
      }).map((x, index) => `\`${index + 1}\` ${message.guild.channels.cache.get(x) ? message.guild.channels.cache.get(x).name : "Kanal Bulunamadı"} \`${data.messageChannel[x]} mesaj\``).join("\n");


      let img = new AttachmentBuilder(canvas.toBuffer(), { name: 'yatay_dg.png'});

      let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: target.displayName, iconURL: target.user.displayAvatarURL({ dynamic: true }) })
      embed.setImage("attachment://yatay_dg.png")
      embed.setDescription(`${target} (<@&${target.roles.highest.id}>) kullanıcısının \`${message.guild.name}\` sunucusunda yaptığı ses ve mesaj istatistikleri aşağıda listelendirilmiştir.`)
      embed.addFields([{name: `Periyodik Ses İstatistikleri`,value: `
> Toplam: \`${client.convertDuration(data.totalVoice)}\`
> Günlük: \`${moment.duration(voiceData.dailyStat).format("H [saat], m [dk.]")}\`
> Haftalık: \`${moment.duration(voiceData.weeklyStat).format("H [saat], m [dk.]")}\`
> Aylık: \`${client.convertDuration(data.totalVoice)}\``,}])
embed.addFields([{name: `Periyodik Mesaj İstatistikleri`,value: 
`> Toplam: \`${client.convertDuration(data.totalMessage)}\`
> Günlük: \`${messageData.dailyStat || "0"}\`
> Haftalık: \`${messageData.weeklyStat || "0"}\`
> Aylık: \`${client.convertDuration(data.totalMessage)}\``,}])
embed.addFields([{name: `En İyi 5 Mesaj Kanalları`,value: `${messageChannel ? messageChannel : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `En İyi 5 Ses Kanalları`,value: `${voiceChannel ? voiceChannel : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `Kategorilendirilmiş Genel Ses Listesi`,value: `${voiceCategory ? voiceCategory : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `Kategorilendirilmiş Genel Mesaj Listesi`,value: `${messageCategory ? messageCategory : "Veriler henüz yüklenmedi"}`,}])

loading.delete()

     message.channel.send({embeds: [embed], files: [img], components: [rowStat]}).then(async (msg) => {
const filter = i => i.user.id == message.author.id    
let collector = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
collector.on("collect", async (interaction) => {
  if (interaction.values[0] === "statkartı") {
    
      let embed2 = new Discord.EmbedBuilder().setAuthor({ name: target.displayName, iconURL: target.user.displayAvatarURL({ dynamic: true }) })

      .setImage("attachment://yatay_dg.png"
      )
      await interaction.deferUpdate();
      msg.edit({embeds: [embed2],files: [img]})
  }
  if (interaction.values[0] === "genestats") {
    
    let embed = new Discord.EmbedBuilder()
    .setAuthor({ name: target.displayName, iconURL: target.user.displayAvatarURL({ dynamic: true }) })
    embed.setImage("attachment://yatay_dg.png")
    embed.setDescription(`${target} (<@&${target.roles.highest.id}>) kullanıcısının \`${message.guild.name}\` sunucusunda yaptığı ses ve mesaj istatistikleri aşağıda listelendirilmiştir.`)
    embed.addFields([{name: `Periyodik Ses İstatistikleri`,value: `
> Toplam: \`${client.convertDuration(data.totalVoice)}\`
> Günlük: \`${moment.duration(voiceData.dailyStat).format("H [saat], m [dk.]")}\`
> Haftalık: \`${moment.duration(voiceData.weeklyStat).format("H [saat], m [dk.]")}\`
> Aylık: \`${client.convertDuration(data.totalVoice)}\``,}])
embed.addFields([{name: `Periyodik Mesaj İstatistikleri`,value: 
`> Toplam: \`${client.convertDuration(data.totalMessage)}\`
> Günlük: \`${messageData.dailyStat || "0"}\`
> Haftalık: \`${messageData.weeklyStat || "0"}\`
> Aylık: \`${client.convertDuration(data.totalMessage)}\``,}])
embed.addFields([{name: `En İyi 5 Mesaj Kanalları`,value: `${messageChannel ? messageChannel : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `En İyi 5 Ses Kanalları`,value: `${voiceChannel ? voiceChannel : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `Kategorilendirilmiş Genel Ses Listesi`,value: `${voiceCategory ? voiceCategory : "Veriler henüz yüklenmedi"}`,}])
embed.addFields([{name: `Kategorilendirilmiş Genel Mesaj Listesi`,value: `${messageCategory ? messageCategory : "Veriler henüz yüklenmedi"}`,}])
  await interaction.deferUpdate();
    msg.edit({embeds: [embed],files: [img]})
}

  if (interaction.values[0] === "weeklystats") {
    let embedc = new EmbedBuilder().setThumbnail(target.user.avatarURL({dynamic: true, size: 2048})) 
    .setDescription(`${target} (<@&${target.roles.highest.id}>) üyesinin \`${message.guild.name}\` sunucusunda bu haftanın ses ve mesaj istatistikleri aşağıda listelendirilmiştir.`)
    embedc.addFields([{name: `Periyodik Toplamlar`,value: `Ses:\`${moment.duration(voiceData.weeklyStat).format("H [saat], m [dk.]")}\` Mesaj: \`${messageData.weeklyStat || "0"}\``,}])
    embedc.addFields([{name: `Haftalık En İyi 5 Ses Kanalları`,value: `${voiceTop ? voiceTop : "Veriler henüz yüklenmedi"}`,}])
    embedc.addFields([{name: `Haftalık En İyi 5 Mesaj Kanalları`,value: `${messageChannel ? messageChannel : "Veriler henüz yüklenmedi"}`,}])
    embedc.addFields([{name: `Kategorilendirilmiş Haftalık Ses Listesi`,value: `${voiceTop2 ? voiceTop2 : "Veriler henüz yüklenmedi"}`,}])
    embedc.addFields([{name: `Kategorilendirilmiş Haftalık Mesaj Listesi`,value: `${messageCategory ? messageCategory : "Veriler henüz yüklenmedi"}`,}])

  
    await interaction.deferUpdate();
    msg.edit({ embeds: [embedc
], files: [] }) 

 
}
if (interaction.values[0] === "streamerstatss") {
    let embedc = new EmbedBuilder().setThumbnail(target.user.avatarURL({dynamic: true, size: 2048})) 
    .setDescription(`${target} (<@&${target.roles.highest.id}>) üyesinin \`${message.guild.name}\` sunucusunda yapılan yayın bilgileri aşağıda belirtilmiştir.
Toplam Yayın: \`${data.totalstreamernumber}\`
Toplam Yayın Süresi: \`${client.convertDuration(data.totalstreamer)}\``)
    embedc.addFields([{name: `Son 20 Yayın`,value: `${streamerList}`,}])

  
    await interaction.deferUpdate();
    msg.edit({ embeds: [embedc
], files: [] }) 

 
}

  

  if (interaction.values[0] === "rozetbilgisi") {
            let public = yetkiliStat(data.yedi.Voice, kanallar.PublicKanallar.Id, kanallar.SleepingKanal.Id);

    let embedwex = new Discord.EmbedBuilder().setThumbnail(target.user.avatarURL({dynamic: true, size: 2048})).setAuthor({ name: target.displayName, iconURL: target.user.displayAvatarURL({ dynamic: true }) })

    let rozetbir = "1150988095110524958"
    let rozetiki = "1150988098373689384"
    let rozetuc = "1150988101649444914"
    let rozetdort = "1150988429430104134"
    let rozetbes = "1150988431590182962"
    if(parseInt(public) < ms("14h")) {
      target.roles.remove(rozetbir).catch(err => {})
      target.roles.remove(rozetiki).catch(err => {})
      target.roles.remove(rozetuc).catch(err => {})
      target.roles.remove(rozetdort).catch(err => {})
      target.roles.remove(rozetbes).catch(err => {})
    }
    if(parseInt(public) < ms("15h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `Herhangi Bir Rozete Sahip Değilsin! <@&${rozetbir}> rozetini elde etmek için sohbet kanallarıda  \`${client.convertDuration(ms("15h") - public)}\` geçirmen gerekiyor.`}])
    if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `Tebrikler <@&${rozetbir}> rozetine sahipsin! Bir sonraki <@&${rozetiki}> rozetini elde etmek için sohbet kanallarıda  \`${client.convertDuration(ms("30h") - public)}\` geçirmen gerekiyor.`}])
    if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `Tebrikler <@&${rozetiki}> rozetine sahipsin! Bir sonraki <@&${rozetuc}> rozetini elde etmek için sohbet kanallarıda  \`${client.convertDuration(ms("45h") - public)}\` geçirmen gerekiyor.`}])
    if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `Tebrikler <@&${rozetuc}> rozetine sahipsin! Bir sonraki <@&${rozetdort}> rozetini elde etmek için sohbet kanallarıda  \`${client.convertDuration(ms("60h") - public)}\` geçirmen gerekiyor.`}])
    if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `Tebrikler <@&${rozetdort}> rozetine sahipsin! Bir sonraki <@&${rozetbes}> rozetini elde etmek için sohbet kanallarıda  \`${client.convertDuration(ms("80h") - public)}\` geçirmen gerekiyor.`}])
    if(parseInt(public) > ms("80h")) embedwex.addFields([{name: `Ses Rozet durumu`,value: `İnanılmazsın! <@&${rozetbes}> rozetine sahipsin! Bu rozeti taşımak sana bir his vermeli!.`,}])
    embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
`, false)


    if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !target.roles.cache.has(rozetbir)) {
      if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !target.roles.cache.has(rozetbir)) {
        target.roles.add(rozetbir)
        embedwex.addFields([{name: `Ses Rozet durumu`,value: `Toplam sohbet odalarında süren 15 saati geçtiği için <@&${rozetbir}> rolünü kazandın! Bir sonraki <@&${rozetiki}> rolünü elde etmek için  ${ms("30h") - public}\` geçirmen gerekiyor.`,}])
        embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
`, false)
      }
    }
    if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h") && !target.roles.cache.has(rozetiki)) {
      if(!target.roles.cache.has(rozetiki)) {
        target.roles.remove(rozetbir).catch(err => {})
        target.roles.add(rozetiki)
        embedwex.addFields([{name: `Ses Rozet durumu`,value: `Toplam sohbet odalarında süren 30 saati geçtiği için <@&${rozetiki}> rolünü kazandın! Bir sonraki <@&${rozetuc}> rolünü elde etmek için \`${ms("45h") - public}\` geçirmen gerekiyor.`,}])
        embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
`, false)
      }
    }
    if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h") && !target.roles.cache.has(rozetuc)) {
      if(!target.roles.cache.has(rozetuc)) {
        target.roles.remove(rozetiki).catch(err => {})
        target.roles.add(rozetuc)
        embedwex.addFields([{name: `Ses Rozet durumu`,value: `Toplam sohbet odalarında süren 45 saati geçtiği için <@&${rozetuc}> rolünü kazandın! Bir sonraki <@&${rozetdort}> rolünü elde etmek için \`${ms("60h") - public} - public)}\` geçirmen gerekiyor.`,}])
        embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
`, false)
      }
    }
    if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h") && !target.roles.cache.has(rozetdort)) {
      if(!target.roles.cache.has(rozetdort)) {
        target.roles.remove(rozetuc).catch(err => {})
        target.roles.add(rozetdort)
        embedwex.addFields([{name: `Ses Rozet durumu`,value: `Toplam sohbet odalarında süren 60 saati geçtiği için <@&${rozetdort}> rolünü kazandın! Bir sonraki <@&${rozetbes}> rolünü elde etmek için \`${ms("80h") - public}\` geçirmen gerekiyor.`,}])

        embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
        `, false)
        
      }
    }
    if(parseInt(public) > ms("80h") && !target.roles.cache.has(rozetbes)) {
      if(!target.roles.cache.has(rozetbes)) {
        target.roles.remove(rozetdort).catch(err => {})
        target.roles.add(rozetbes)
        embedwex.addFields([{name: `Ses Rozet durumu`,value: `Toplam sohbet odalarında süren 80 saati geçtiği için <@&${rozetbes}> rolünü kazandın! Üstün aktifliğinden dolayı sana teşekkür ederiz.`,}])
        embedwex.setDescription(`${target} () üyesinin \`${message.guild.name}\` sunucunda yaptığı aktifliğe göre uygun rozet bilgileri aşağıda belirtilmiştir. 
`, false)
      }

          }
          await interaction.deferUpdate();

      msg.edit({embeds: [embedwex], components: [rowStat],files: [] })
}

collector.on("end", async (interaction) => {
interaction.message.delete()})


})
}) 
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


};  
exports.conf = {
    aliases: ["stats", "Stat", "Stats"]
  };
  exports.help = {
    name: 'stat'
  };
  
function yuzdelik(currentXP, requiredXP, maxWidth) {
  let miktar = currentXP;
  let istenen = requiredXP; 
  return parseInt((miktar / istenen) * 100);
}