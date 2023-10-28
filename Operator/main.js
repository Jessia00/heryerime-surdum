
const Discord = require('discord.js');

const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, StringSelectMenuBuilder } = require("discord.js");
const { Interaction,  ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits, ChannelType } = require('discord.js')
const Guild  = require("./models/secretRoom");
const User  = require("./models/secretRoomUser");

const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
let ceza = require("./models/ceza");
require("moment-duration-format")
const fs = require('fs');
client.invites = new Collection()
const { EmbedBuilder, ActivityType } = require("discord.js")
client.snipe = new Map();
let ozelKomut = require("./models/özelkomut");
const { joinVoiceChannel } = require("@discordjs/voice");
const moment = require('moment');
const Database = require("./models/invite")
const roller = require('./models/auditrole')
let teyit = require("./models/teyit");
moment.locale("tr");
const logs = require("discord-logs");
logs(client)
let profil = require("./models/profil");
let taglıData = require("./models/taglıUye");
const yetkiliDB = require("./models/yetkili");
const tasks = require("./models/tasksystem")
const puansystem = require("./models/puansystem")
const Stat = require("./models/stats");
let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
const URI = mainSettings.MongoDB;
client.fighting = new Set();

mongoose.connect(URI, {

  useNewUrlParser: true, 
  
  useUnifiedTopology: true 
  
  }, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });
  
client.db = require("./models/özelperm");
const Voices = global.Voices = new Collection();

const sunucuayar = require('./models/sunucuayar');
let randMiss = require("./models/randomMission");
let easyMiss = require("./models/easyMission");
let xpData = require("./models/stafxp");
const { table } = require('table');

require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
const hanedan = require("./models/hanedanlik");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(__dirname + '/Commands/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
fs.readdir(__dirname + "/Commands/" + f, (err2, files2) => {
  files2.forEach(file => {
let props = require(`./Commands/${f}/` + file);
log(`Yüklenen komut: ${props.help.name}.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
  client.aliases.set(alias, props.help.name);
});
  })
})
  });
});
client.on("voiceChannelJoin", async (member, channel) => {
  if (member.user.bot) return;
  global.Voices.delete(member.id);

});



client.on("voiceChannelLeave", async (member, channel) => {
  if (member.user.bot) return;
let gorev = await randMiss.findOne({userID: member.id }) 
if(!gorev) return;
  if(gorev.Mission.MISSION == "ses" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
.setDescription(`${member} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK I (SES GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)
client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed]})
xpData.updateOne({userID: member.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
randMiss.updateOne({userID: member.id}, {$set: { Active: false }}, {upsert: true}).exec()
  }
});
client.on("messageCreate", async (message) => {

let gorev = await randMiss.findOne({userID: message.author.id }) 
if(!gorev) return;
if(gorev.Mission.MISSION == "mesaj" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
.setDescription(`${message.author} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK II (MESAJ GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)

client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed]})
xpData.updateOne({userID: message.author.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
randMiss.updateOne({userID: message.author.id}, {$set: { Active: false }}, {upsert: true}).exec()
}
})
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-.]{27}/g;
client.on("messageCreate", async (message) => {
  if(message.channel.id === "1141004282926223360") {
    await message.react("<a:like_aqualand:1142089317292974150>")
    await message.react("<a:dislike_aqualand:1142089302763896922>")
  }
  if(message.channel.id === "1141004278794825759") {
    if(message.attachments.size < 1)return;
    await message.react("<a:kalp_aqualand:1142089236263211140>")
    await message.react("<a:yanom:1141185818829004870>")
  }
  if(message.channel.id === "1141004296679333949") {
    message.react("<a:Insta_aqualand:1141655517605929014>")
  }
})

client.ayarlar = {
  "prefix": mainSettings.prefix,
  "botSesID": mainSettings.botSesID,
  "sunucuId": mainSettings.sunucuId,
  "sahip": mainSettings.sahip,
  "commandChannel": mainSettings.commandChannel,

  "CHAT_KANAL": mainSettings.CHAT_KANAL,
  "PUBLIC_KATEGORI": mainSettings.PUBLIC_KATEGORI,
  "STREAMER_KATEGORI": mainSettings.STREAMER_KATEGORI,
  "REGISTER_KATEGORI": mainSettings.REGISTER_KATEGORI,
  "SLEEP_ROOM": mainSettings.SLEEP_ROOM,
  "taglıAlım": mainSettings.taglıAlım,

  "footer": mainSettings.footer,
  "onsekizatilacakoda": mainSettings.onsekizatilacakoda,
  "onsekizodalar": mainSettings.onsekizodalar,
  "readyFooter": mainSettings.readyFooter,
  "chatMesajı": mainSettings.chatMesajı,
  "YETKI_VER_LOG": mainSettings.YETKI_VER_LOG,
  "CEZA_PUAN_KANAL": mainSettings.CEZA_PUAN_KANAL,

  "leaderboard": mainSettings.leaderboard,
  "yetkilisay": mainSettings.yetkilisay,
  "GörevSystem": mainSettings.GörevSystem,

  "vkyonetici": "",
}
const conf = client.ayarlar
global.conf = conf;
client.on("ready", async client => {
  try {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(client.ayarlar.guildID);
if (connection) return;
setInterval(async () => { 
const VoiceChannel = client.channels.cache.get(client.ayarlar.botSesID);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);
  
let activities = client.ayarlar.readyFooter, i = 0;
setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
  type: ActivityType.Streaming,
  url: "https://www.twitch.tv/wex"}), 10000);
   } catch (err) { }  
})
client.on("interactionCreate", async interaction => {
const member = await client.guilds.cache.get(interaction.guild.id).members.fetch(interaction.member.user.id)
if (interaction.customId === 'one') {
  let data = await ceza.find({userID: member.id})
  let embed2cezas = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setDescription(`${data.reverse().slice(0,10).map( (data, index) => `#${data.ID} **[${data.Ceza.toUpperCase()}]** (${data.Bitis == "null" ? "Aktif" : data.Bitis == "KALICI" ? "Aktif" : Date.now()>=data.Bitis ? "Kapalı" : "Aktif"}) \`${new Date(Number(data.Atilma)).toTurkishFormatDate()}\` tarihinde **${data.Sebep}** nedeniyle ${member.guild.members.cache.has(data.Yetkili) ? member.guild.members.cache.get(data.Yetkili).toString() : data.Yetkili} tarafından cezalandırıldı!`).join("\n")}`)
if (data.length == 0) return interaction.reply({ content: `Herhangi bir ceza-i işlem verin bulunmuyor`, ephemeral: true})
interaction.reply({ embeds:  [embed2cezas], ephemeral: true})

}
if (interaction.customId === 'two') {
let config = {
  border: {
  topBody: ``,
  topJoin: ``,
  topLeft: ``,
  topRight: ``,

  bottomBody: ``,
  bottomJoin: ``,
  bottomLeft: ``,
  bottomRight: ``,

  bodyLeft: `│`,
  bodyRight: `│`,
  bodyJoin: `│`,

  joinBody: ``,
  joinLeft: ``,
  joinRight: ``,
  joinJoin: ``
  }
};


let datax = [
  ["Mesaj Level", "Ses Level", "Mesaj Xp", "Ses Xp"]
];

  Stat.findOne({
userID: member.id,
guildID: member.guild.id
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
 Stat.find({ userID: member.id }).exec(async (err, res) => {

  res.map(x => {
  datax.push([x.messageLevel, x.voiceLevel, `${x.messageXP.toFixed(0)}/${x.messageLevel*643}`, `${x.voiceXP.toFixed(0)}/${x.voiceLevel*643}`])
})
let outi = table(datax, config)
  let embed2cezas = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
  .setDescription(`**${member.guild.name}** Sunucusundaki Level Bilgilerin.\n\`\`\`${outi}\`\`\``)
interaction.reply({ embeds:  [embed2cezas], ephemeral: true})
});
})
}

if (interaction.customId === 'five') {
  const member = await client.guilds.cache.get(interaction.guild.id).members.fetch(interaction.member.user.id)

  Stat.findOne({
    userID: member.id,
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
    }).map((x, index) => `${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${client.convertDuration(data.voiceCategory[x])}\``).join("\n");
    let voiceChannel = Object.keys(data.voiceChannel).splice(0, 10).sort(function (a, b) {
        return data.voiceChannel[b] - data.voiceChannel[a]
    }).map((x, index) => `${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${client.convertDuration(data.voiceChannel[x])}\``).join("\n");
    let messageChannel = Object.keys(data.messageChannel).splice(0, 5).sort(function (a, b) {
        return data.messageChannel[b] - data.messageChannel[a]
    }).map((x, index) => `${interaction.guild.channels.cache.get(x) ? interaction.guild.channels.cache.get(x).name : "#kanal-silindi"} \`${data.messageChannel[x]} mesaj\``).join("\n");


    let embed = new Discord.EmbedBuilder()
    .setFooter({ text: client.ayarlar.footer })

        .setThumbnail("https://cdn.discordapp.com/attachments/774447325060923393/812908877636567090/unknown.png")
        .setDescription(`${member} (<@&${member.roles.highest.id}>) istatistikleri\n`)
        
    embed.addFields([{name: `:bookmark: Kategori İstatistikleri (${client.convertDuration(data.totalVoice)})`,value: `${voiceCategory ? voiceCategory : "Veriler henüz yüklenmedi"}`,}])
    embed.addFields([{name: `${client.emojis.cache.find(x => x.name == "wex_ses")} **Ses Sıralaması** (Toplam ${Object.keys(data.voiceChannel).length} kanalda durmuş)`,value: `${voiceChannel ? voiceChannel : "Veriler henüz yüklenmedi"}`,}])
    embed.addFields([{name: `${client.emojis.cache.find(x => x.name == "wex_mesaj")} **Mesaj Sıralaması** (${data.totalMessage} mesaj)`,value: `${messageChannel ? messageChannel : "Veriler henüz yüklenmedi"}`,}])
    interaction.reply({embeds: [embed], ephemeral: true});

  })

}
if (interaction.customId === 'ybasvuru') {
  
const modal = new ModalBuilder()
.setCustomId("ybasvuru")
.setTitle("Yetkili Başvurusu")
const soru1 = new TextInputBuilder()
.setCustomId("soru1")
.setLabel(`Ad & Yaş`)
.setPlaceholder("İsim ve yaşınızı giriniz. Örn: Erkay 20")
.setStyle(TextInputStyle.Short);
const soru2 = new TextInputBuilder()
.setCustomId("soru2")
.setLabel(`Discorda ne kadar süre ayıyabilirsin?`)
.setPlaceholder(`Örnek: Günlük 3 Saat`)
.setStyle(TextInputStyle.Short);
const soru3 = new TextInputBuilder()
.setCustomId("soru3")
.setLabel(`Okuma Çalışma durumun?`)
.setPlaceholder(`Okuyorum/Çalışıyorum`)
.setStyle(TextInputStyle.Short);
const soru4 = new TextInputBuilder()
.setCustomId("soru4")
.setMinLength(10)
.setLabel(`Sunucumuza neler katabilirsin?`)
.setPlaceholder(`Örnek: Sunucunun ses aktifliğine katkım olur`)
.setStyle(TextInputStyle.Paragraph);
const soru5 = new TextInputBuilder()
.setCustomId("soru5")
.setMinLength(10)
.setLabel(`Sunucumuzda daha önceden yetkili oldun mu?`)
.setPlaceholder(`Örnek: Evet daha önceden X yetki rolündeyken yetkiyi bıraktım`)
.setStyle(TextInputStyle.Paragraph);


const AOne = new ActionRowBuilder().addComponents(soru1);
const ATwo = new ActionRowBuilder().addComponents(soru2);
const AThree = new ActionRowBuilder().addComponents(soru3);
const AFour = new ActionRowBuilder().addComponents(soru4);
const AFive = new ActionRowBuilder().addComponents(soru5);

modal.addComponents(AOne, ATwo, AThree, AFour, AFive);
await interaction.showModal(modal);


  }
  if (interaction.customId === 'sorunilet') {
  
    const modal = new ModalBuilder()
    .setCustomId("sorunilett")
    .setTitle("Sorunları İlet")
    const sorunne = new TextInputBuilder()
    .setCustomId("sorunne")
    .setMinLength(10)
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: Erkay 20")
    .setStyle(TextInputStyle.Paragraph);
    
    
    const AOne = new ActionRowBuilder().addComponents(sorunne);
    
    modal.addComponents(AOne);
    await interaction.showModal(modal);
    
    
      }
    
  
if (interaction.customId === 'three') {
  let statData = await Stat.findOne({userID: member.id, guildID: member.guild.id}) || {autoRankup: []};

  let rozetleri = statData.autoRankup || [];
  const embed =  new Discord.EmbedBuilder().setFooter({ text: conf.footer })

  if (member.guild.members.cache.has(member.id)) {
  let nickname = member.displayName == member.username ? "" + member.username + " [Yok] " : member.displayName
  const members = member.guild.members.cache.filter(x => !x.user.bot).sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
  const joinPos = members.map((u) => u.id).indexOf(member.id);
  const roles = member.roles.cache.filter(role => role.id !== member.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
  const rolleri = [];
  if (roles.length > 6) {
  const lent = roles.length - 6;
  let itemler = roles.slice(0, 6);
  itemler.map(x => rolleri.push(x));
  rolleri.push(`${lent}...`);
  } else {
  roles.map(x => rolleri.push(x));
  };
  embed.setDescription(`
  **❯ Kullanıcı Bilgisi**
  \`•\` Rozetler: \`${rozetleri.length == 0 ? "Rozet yoktur" : rozetleri.map(x => `${x}`).join(" ")}\`
  \`•\` Hesap: ${member}
  \`•\` Kullanıcı ID: \`${member.id}\`
  \`•\` Kuruluş Tarihi: \`${moment(member.user.createdTimestamp).locale("tr").format("LLL")} - (${moment(member.user.createdTimestamp).locale("tr").fromNow()})\`
  
  **❯ Sunucu Bilgisi**
  \`•\` Sunucu İsmi: \`${nickname}\`
  \`•\` Katılım Tarihi: \`${moment(member.joinedAt).locale("tr").format("LLL")} - (${moment(member.joinedAt).locale("tr").fromNow()})\`
  \`•\` Katılım Sırası: \`${joinPos} / ${member.guild.members.cache.size}\`
  
  \`•\` Rolleri (${rolleri.length}): ${rolleri.join(", ")}
  
  `)
  embed.setColor(member.displayHexColor);
  }
  interaction.reply({embeds: [embed], ephemeral: true});
}
})

client.on("interactionCreate", async interaction => {
  if (interaction.isButton()) {
if (interaction.customId === 'detete') return;
let data = await Guild.findOne({ guildId: interaction.guild.id });
let user_olddata = await User.findOne({ userId: interaction.user.id });
if (!user_olddata) { await User.create({ userId: interaction.user.id }) }
let user_data = await User.findOne({ userId: interaction.user.id });
if (data?.private_voices?.mode === true) {
if (interaction.member?.voice.channel && interaction.channel.id === data?.private_voices?.textId && interaction.channel.id === data.private_voices.textId && interaction.member?.voice.channel.id === user_data?.private_voices?.voiceId && interaction.member.voice.channel.id === user_data.private_voices.voiceId) {
if (interaction.customId === 'rename') {
const Modal = new ModalBuilder()
.setCustomId('myModal')
.setTitle('Kanal adı değişikliği');
const Input = new TextInputBuilder()
.setCustomId('Input')
.setPlaceholder('Müzik dinliyoruz')
.setLabel("Yeni bir ad girin")
.setStyle(TextInputStyle.Short)
.setMinLength(1)
.setMaxLength(24)
firstActionRow = new ActionRowBuilder().addComponents(Input);
Modal.addComponents(firstActionRow);
await interaction.showModal(Modal);
}
if (interaction.customId === 'lock') {
let user_data = await User.findOne({ userId: interaction.user.id });
if (user_data?.private_voices?.lock === false) {
let textId = await client.channels.fetch(data?.private_voices?.textId)
await User.updateOne({ userId: interaction.user.id }, {
$set: {
'private_voices.lock': true
}
})
await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Kanal Kiliti başarılı bir şekilde açıldı.`)], ephemeral: true }).catch(() => null)
await interaction.member.voice.channel.edit({
parent: data?.private_voices?.categoryId,
permissionOverwrites: [
{
id: interaction.guild.roles.everyone,
allow: ['CONNECT']
}
]
}).catch(() => null)
} else if (user_data?.private_voices?.lock === true) {
await User.updateOne({ userId: interaction.user.id }, {
$set: {
'private_voices.lock': false
}
})
await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Kanal Kiliti başarılı bir şekilde kapatıldı.`)], ephemeral: true }).catch(() => null)
await interaction.member.voice.channel.edit({
parent: data?.private_voices?.categoryId,
permissionOverwrites: [
{
id: interaction.guild.roles.everyone,
deny: ['CONNECT']
}
]
}).catch(() => null)
}
}
if (interaction.customId === 'bit') {
const Modal = new ModalBuilder()
.setCustomId('bit')
.setTitle('Kanal bit hızını değiştirme');
const Input = new TextInputBuilder()
.setCustomId('InputBit')
.setPlaceholder('8 - 96 kbps')
.setLabel("Yeni bit hızı girin")
.setStyle(TextInputStyle.Short)
.setMinLength(1)
.setMaxLength(2)
firstActionRow = new ActionRowBuilder().addComponents(Input);
Modal.addComponents(firstActionRow);
await interaction.showModal(Modal);
}
if (interaction.customId === 'limit') {
const Modal = new ModalBuilder()
.setCustomId('limit')
.setTitle('Kullanıcı sınırını değiştir');
const Input = new TextInputBuilder()
.setCustomId('InputLimit')
.setPlaceholder('0 - 99')
.setLabel("Yeni bir kullanıcı sınırı girin")
.setStyle(TextInputStyle.Short)
.setMinLength(1)
.setMaxLength(2)
firstActionRow = new ActionRowBuilder().addComponents(Input);
Modal.addComponents(firstActionRow);
await interaction.showModal(Modal);
}
if (interaction.customId === 'kick') {
const Modal = new ModalBuilder()
.setCustomId('kick')
.setTitle('Kullanıcı sınırını değiştir');
const Input = new TextInputBuilder()
.setCustomId('InputKick')
.setPlaceholder('Kullanıcı İd')
.setLabel("kullanıcı kimliğini girin")
.setStyle(TextInputStyle.Short)
.setMinLength(1)
.setMaxLength(20)
firstActionRow = new ActionRowBuilder().addComponents(Input);
Modal.addComponents(firstActionRow);
await interaction.showModal(Modal);
}
} else {
if (interaction.customId === 'delete') return;
await interaction.deferUpdate().catch(() => null)
}
}
}
if (interaction.isModalSubmit()) {
if (interaction.customId === 'myModal') {
const input = interaction.fields.getTextInputValue('Input');
interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Yeni kanal adı \`${input}\``)], ephemeral: true })
await interaction.member.voice.channel.setName(input).catch(() => null)
}
if (interaction.customId === 'bit') {
let input = interaction.fields.getTextInputValue('InputBit');
if (isNaN(input)) return interaction.reply({ embeds: [new EmbedBuilder().setColor(Config.colors.danger).setDescription(`Geçersiz bir numara girdiniz.`)], ephemeral: true })
if (input > 96) input = 96
if (input < 8) input = 8
interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Yeni bit hızı seti \`${input}\``)], ephemeral: true })
await interaction.member.voice.channel.setBitrate(input + `_000`).catch(() => null)
}
if (interaction.customId === 'limit') {
let input = interaction.fields.getTextInputValue('InputLimit');
if (isNaN(input)) return interaction.reply({ embeds: [new EmbedBuilder().setColor(Config.colors.danger).setDescription(`Geçersiz bir numara girdiniz.`)], ephemeral: true })
interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Kullanıcı sınırı ayarlandı \`${input}\``)], ephemeral: true })
await interaction.member.voice.channel.setUserLimit(input).catch(() => null)
}
if (interaction.customId === 'kick') {
let user_data = await User.findOne({ userId: interaction.user.id });
let input = interaction.fields.getTextInputValue('InputKick');
interaction.guild.members.fetch(input).then(x => {
if (x.voice.channel.id !== user_data.private_voices.voiceId) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Belirtilen katılımcı bir ses kanalında değil.`)], ephemeral: true })
interaction.reply({ embeds: [new EmbedBuilder().setDescription(`**${x.user.tag}**, ses kanalından atıldı.`)], ephemeral: true })
x.voice.disconnect()
}, y => {
interaction.reply({ embeds: [new EmbedBuilder().setColor(Config.colors.danger).setDescription(`Geçersiz bir kimlik girdiniz.`)], ephemeral: true })
}
)
await interaction.member.voice.channel.setUserLimit(input).catch(() => null)
}

}
})

  client.on("interactionCreate", async interaction => {
  function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  
  const member = await client.guilds.cache.get(interaction.guild.id).members.fetch(interaction.member.user.id)
  if (interaction.customId === 'taskOne') {
let VoiceChannel = ["1143253616346542301", "1143252726302658680", "1143253451095146628","1143253524931682445","1141004671994056714"];
let VoiceRandom = VoiceChannel[Math.floor(Math.random() * VoiceChannel.length)];
(channel => channel.id)
let gorev = await randMiss.findOne({userID: member.id, Active: true }) 
if(gorev) return interaction.reply({ content: `Zaten aktif bir **${gorev.Mission.MISSION}** görevin var.`, ephemeral: true})
let sesRandom = getRandomInt(60, 300)
let ödülcük = getRandomInt(150, 400)
randMiss.updateOne({userID: member.id}, {$set: { Active: true, userID: member.id, Check: 0, Mission: {ID: member.id, MISSION: "ses", AMOUNT: 1000*60*sesRandom, CHANNEL: VoiceRandom, Reward: ödülcük}}}, {upsert: true}).exec()
await interaction.reply({ content: `Başarılı bir şekilde **TASK I (SES GÖREVİ)** görevini aldın. [ <#${VoiceRandom}> Kanalında **${moment.duration(1000*60*sesRandom).format('H [saat,] m [dk.]')}** takıl. Ödül: **${ödülcük}**]`, ephemeral: true})}
if (interaction.customId === 'taskTwo') {
  let gorev = await randMiss.findOne({userID: member.id, Active: true }) 
if(gorev) return interaction.reply({ content: `Zaten aktif bir **${gorev.Mission.MISSION}** görevin var.`, ephemeral: true})
  let MessageChannel  = ["1141004268493607022"];
  let MessageRandom = MessageChannel[Math.floor(Math.random() * MessageChannel.length)];
  let mesajRandom = getRandomInt(300, 400)
  let ödülcük = getRandomInt(150, 400)
  randMiss.updateOne({userID: member.id}, {$set: { Active: true, userID: member.id, Check: 0, Mission: {ID: member.id, MISSION: "mesaj", AMOUNT: mesajRandom, CHANNEL: MessageRandom, Reward: ödülcük}}}, {upsert: true}).exec()
  await interaction.reply({ content: `Başarılı bir şekilde (**TASK II MESAJ GÖREVİ**) görevini aldın. [ <#${MessageRandom}> Kanalına **${mesajRandom}** mesaj gönder. Ödül: **${ödülcük}**]`, ephemeral: true})}
  if (interaction.customId === 'taskTheree') {
  let gorev = await randMiss.findOne({userID: member.id, Active: true }) 
if(gorev) return interaction.reply({ content: `Zaten aktif bir **${gorev.Mission.MISSION}** görevin var.`, ephemeral: true})
  let davetRandom = getRandomInt(5, 10)
  let ödülcük = getRandomInt(150, 400)
  randMiss.updateOne({userID: member.id}, {$set: { Active: true, userID: member.id, Check: 0, Mission: {ID: member.id, MISSION: "davet", AMOUNT: davetRandom, Reward: ödülcük}}}, {upsert: true}).exec()
  await interaction.reply({ content: `Başarılı bir şekilde **TASK III (DAVET GÖREVİ) görevini aldın. [ Sunucuya **${davetRandom}** üye davet et. Ödül: **${ödülcük}**]`, ephemeral: true})}
  if (interaction.customId === 'taskFour') {
let gorev = await randMiss.findOne({userID: member.id, Active: true }) 
  if(gorev) return interaction.reply({ content: `Zaten aktif bir **${gorev.Mission.MISSION}** görevin var.`, ephemeral: true})
let taglıRandom = getRandomInt(1, 3)
let ödülcük = getRandomInt(150, 400)
randMiss.updateOne({userID: member.id}, {$set: { Active: true, userID: member.id, Check: 0, Mission: {ID: member.id, MISSION: "taglı", AMOUNT: taglıRandom, Reward: ödülcük}}}, {upsert: true}).exec()
await interaction.reply({ content: `Başarılı bir şekilde **TASK IV (TAGLI ÇEKME GÖREVİ) görevini aldın. [ Sunucuda **${taglıRandom}** üyeye tag aldır. (.taglı <@Üye/ID> ) Ödül: **${ödülcük}**]`, ephemeral: true})}
if (interaction.customId === 'taskFive') {
let gorev = await randMiss.findOne({userID: member.id, Active: true }) 
  if(gorev) return interaction.reply({ content: `Zaten aktif bir **${gorev.Mission.MISSION}** görevin var.`, ephemeral: true})
let teyitRandom = getRandomInt(5, 30)
let ödülcük = getRandomInt(150, 400)
randMiss.updateOne({userID: member.id}, {$set: { Active: true, userID: member.id, Check: 0, Mission: {ID: member.id, MISSION: "teyit", AMOUNT: teyitRandom, Reward: ödülcük}}}, {upsert: true}).exec()
await interaction.reply({ content: `Başarılı bir şekilde **TASK V (TEYİT GÖREVİ) görevini aldın. [ Sunucuda **${teyitRandom}** üye kaydet. Ödül: **${ödülcük}**]`, ephemeral: true})}
})
client.kullanabilir = function (id) {
  if (client.guilds.cache.get(mainSettings.sunucuId).members.cache.get(id).hasPermission("ADMINISTRATOR") || client.guilds.cache.get(mainSettings.sunucuId).members.cache.get(id).hasPermission("MANAGE_CHANNELS") || client.guilds.cache.get(mainSettings.sunucuId).members.cache.get(id).hasPermission("VIEW_AUDIT_LOG")) return true;
  return false;
};

const RLSchema = mongoose.Schema({
  Id: {
type: String,
default: null
  },
  Logs: {
type: Array,
default: []
  }
});
const RLModel = mongoose.model('rolelog', RLSchema);

client.on("guildMemberRoleRemove", async (member, role) => {
  const Log = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate 
  }).then(audit => audit.entries.first());
  if (!Log || !Log.executor || Log.executor.bot || Log.createdTimestamp < (Date.now() - 5000)) return;
  const Data = await RLModel.findOne({
Id: member.id
  }) || new RLModel({
Id: member.id
  });
  Data.Logs.push({
Date: Date.now(),
Type: "[KALDIRMA]",
Executor: Log.executor.id,
Role: role.id
  });
  Data.save();
});
client.on("voiceStateUpdate", async (oldMember, newMember) => {

})
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate 
  }).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
if (yapan.bot) return
newMember.roles.cache.forEach(async role => {
if (!oldMember.roles.cache.has(role.id)) {
roller.findOne({
user: hedef.id
}, async (err, res) => {
if (!res) {
let arr = []
arr.push({
rol: role.id,
mod: yapan.id,
tarih: Date.now(),
state: "Ekleme"
})
let newData = new roller({
user: hedef.id,
roller: arr
})
newData.save().catch(e => console.log(e))
} else {
res.roller.push({
rol: role.id,
mod: yapan.id,
tarih: Date.now(),
state: "Ekleme"
})
res.save().catch(e => console.log(e))
}
})
}
});
oldMember.roles.cache.forEach(async role => {
if (!newMember.roles.cache.has(role.id)) {
roller.findOne({
user: hedef.id
}, async (err, res) => {
if (!res) {
let arr = []
arr.push({
rol: role.id,
mod: yapan.id,
tarih: Date.now(),
state: "Kaldırma"
})
let newData = new roller({
user: hedef.id,
roller: arr
})
newData.save().catch(e => console.log(e))
} else {
res.roller.push({
rol: role.id,
mod: yapan.id,
tarih: Date.now(),
state: "Kaldırma"
})
res.save().catch(e => console.log(e))
}
})
}
});
})
});







 client.login(mainSettings.EXECUTIVE).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));

client.emoji = function (x) {
  return client.emojis.cache.find(x => x.name === client.emojiler[x]);
};
const emoji = global.emoji;

const sayiEmojiler = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};
client.emojiSayi = function (sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

client.emojiler = {
  onay: "wex_tik",
  iptal: "wex_iptal",
  cevrimici: "wex_online",
  rahatsizetmeyin: "wex_dnd",
  bosta: "wex_away",
  gorunmez: "wex_offline",
  erkekEmoji: "wex_man",
  kizEmoji: "wex_woman",
  sagEmoji: "wex_sag",
  tikEmoji: "wex_tik",
  aktifEmoji: "wex_acik",
  deaktifEmoji: "wex_kapali",
  muteEmoji: "wex_muted",
  unmuteEmoji: "wex_unmuted",
  deafnedEmoji: "wex_deafned",
  undeafnedEmoji: "wex_undeafned"
};

global.emoji = client.emoji = function (x) {
  return client.emojis.cache.find(x => x.name === client.emojiler[x]);
};

client.sayilariCevir = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


client.renk = {
  //"renksiz": "2F3136", // 0x36393E
  "mor": "#3c0149",
  "mavi": "#10033d",
  "turkuaz": "#00ffcb",
  "kirmizi": "#750b0c",
  "yesil": "#032221" // 00cd00 - 008b00
};

client.randomColor = function () {
  return client.renk[Object.keys(client.renk).random()];
};

let kufurler = ["allahoc", "allahoç", "allahamk", "allahaq", "0r0spuc0cu", "4n4n1 sk3r1m", "p1c", "@n@nı skrm", "evladi", "orsb", "orsbcogu", "amnskm", "anaskm", "oc", "abaza", "abazan", "ag", "a\u011fz\u0131na s\u0131\u00e7ay\u0131m", "fuck", "shit", "ahmak", "seks", "sex", "allahs\u0131z", "amar\u0131m", "ambiti", "am biti", "amc\u0131\u011f\u0131", "amc\u0131\u011f\u0131n", "amc\u0131\u011f\u0131n\u0131", "amc\u0131\u011f\u0131n\u0131z\u0131", "amc\u0131k", "amc\u0131k ho\u015faf\u0131", "amc\u0131klama", "amc\u0131kland\u0131", "amcik", "amck", "amckl", "amcklama", "amcklaryla", "amckta", "amcktan", "amcuk", "am\u0131k", "am\u0131na", "amına", "am\u0131nako", "am\u0131na koy", "am\u0131na koyar\u0131m", "am\u0131na koyay\u0131m", "am\u0131nakoyim", "am\u0131na koyyim", "am\u0131na s", "am\u0131na sikem", "am\u0131na sokam", "am\u0131n feryad\u0131", "am\u0131n\u0131", "am\u0131n\u0131 s", "am\u0131n oglu", "am\u0131no\u011flu", "am\u0131n o\u011flu", "am\u0131s\u0131na", "am\u0131s\u0131n\u0131", "amina", "amina g", "amina k", "aminako", "aminakoyarim", "amina koyarim", "amina koyay\u0131m", "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminiyarraaniskiim", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amk \u00e7ocu\u011fu", "amlarnzn", "aml\u0131", "amm", "ammak", "ammna", "amn", "amna", "amnda", "amndaki", "amngtn", "amnn", "amona", "amq", "ams\u0131z", "amsiz", "amsz", "amteri", "amugaa", "amu\u011fa", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan", "anan\u0131", "anan\u0131", "anan\u0131n", "anan\u0131n am", "anan\u0131n am\u0131", "anan\u0131n d\u00f6l\u00fc", "anan\u0131nki", "anan\u0131sikerim", "anan\u0131 sikerim", "anan\u0131sikeyim", "anan\u0131 sikeyim", "anan\u0131z\u0131n", "anan\u0131z\u0131n am", "anani", "ananin", "ananisikerim", "anani sikerim", "ananisikeyim", "anani sikeyim", "anann", "ananz", "anas", "anas\u0131n\u0131", "anas\u0131n\u0131n am", "anas\u0131 orospu", "anasi", "anasinin", "anay", "anayin", "angut", "anneni", "annenin", "annesiz", "anuna", "aq", "a.q", "a.q.", "aq.", "ass", "atkafas\u0131", "atm\u0131k", "att\u0131rd\u0131\u011f\u0131m", "attrrm", "auzlu", "avrat", "ayklarmalrmsikerim", "azd\u0131m", "azd\u0131r", "azd\u0131r\u0131c\u0131", "babaannesi ka\u015far", "baban\u0131", "baban\u0131n", "babani", "babas\u0131 pezevenk", "baca\u011f\u0131na s\u0131\u00e7ay\u0131m", "bac\u0131na", "bac\u0131n\u0131", "bac\u0131n\u0131n", "bacini", "bacn", "bacndan", "bacy", "bastard", "b\u0131z\u0131r", "bitch", "biting", "boner", "bosalmak", "bo\u015falmak", "cenabet", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "cif", "cikar", "cim", "\u00e7\u00fck", "dalaks\u0131z", "dallama", "daltassak", "dalyarak", "dalyarrak", "dangalak", "dassagi", "diktim", "dildo", "dingil", "dingilini", "dinsiz", "dkerim", "domal", "domalan", "domald\u0131", "domald\u0131n", "domal\u0131k", "domal\u0131yor", "domalmak", "domalm\u0131\u015f", "domals\u0131n", "domalt", "domaltarak", "domalt\u0131p", "domalt\u0131r", "domalt\u0131r\u0131m", "domaltip", "domaltmak", "d\u00f6l\u00fc", "d\u00f6nek", "d\u00fcd\u00fck", "eben", "ebeni", "ebenin", "ebeninki", "ebleh", "ecdad\u0131n\u0131", "ecdadini", "embesil", "emi", "fahise", "fahi\u015fe", "feri\u015ftah", "ferre", "fuck", "fucker", "fuckin", "fucking", "gavad", "gavat", "giberim", "giberler", "gibis", "gibi\u015f", "gibmek", "gibtiler", "goddamn", "godo\u015f", "godumun", "gotelek", "gotlalesi", "gotlu", "gotten", "gotundeki", "gotunden", "gotune", "gotunu", "gotveren", "goyiim", "goyum", "goyuyim", "goyyim", "g\u00f6t", "g\u00f6t deli\u011fi", "g\u00f6telek", "g\u00f6t herif", "g\u00f6tlalesi", "g\u00f6tlek", "g\u00f6to\u011flan\u0131", "g\u00f6t o\u011flan\u0131", "g\u00f6to\u015f", "g\u00f6tten", "g\u00f6t\u00fc", "g\u00f6t\u00fcn", "g\u00f6t\u00fcne", "g\u00f6t\u00fcnekoyim", "g\u00f6t\u00fcne koyim", "g\u00f6t\u00fcn\u00fc", "g\u00f6tveren", "g\u00f6t veren", "g\u00f6t verir", "gtelek", "gtn", "gtnde", "gtnden", "gtne", "gtten", "gtveren", "hasiktir", "hassikome", "hassiktir", "has siktir", "hassittir", "haysiyetsiz", "hayvan herif", "ho\u015faf\u0131", "h\u00f6d\u00fck", "hsktr", "huur", "\u0131bnel\u0131k", "ibina", "ibine", "ibinenin", "ibne", "ibnedir", "ibneleri", "ibnelik", "ibnelri", "ibneni", "ibnenin", "ibnerator", "ibnesi", "idiot", "idiyot", "imansz", "ipne", "iserim", "i\u015ferim", "ito\u011flu it", "kafam girsin", "kafas\u0131z", "kafasiz", "kahpe", "kahpenin", "kahpenin feryad\u0131", "kaka", "kaltak", "kanc\u0131k", "kancik", "kappe", "karhane", "ka\u015far", "kavat", "kavatn", "kaypak", "kayyum", "kerane", "kerhane", "kerhanelerde", "kevase", "keva\u015fe", "kevvase", "koca g\u00f6t", "kodu\u011fmun", "kodu\u011fmunun", "kodumun", "kodumunun", "koduumun", "koyarm", "koyay\u0131m", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "krar", "kukudaym", "laciye boyad\u0131m", "libo\u015f", "madafaka", "malafat", "malak", "mcik", "meme", "memelerini", "mezveleli", "minaamc\u0131k", "mincikliyim", "mna", "monakkoluyum", "motherfucker", "mudik", "oc", "ocuu", "ocuun", "O\u00c7", "o\u00e7", "o. \u00e7ocu\u011fu", "o\u011flan", "o\u011flanc\u0131", "o\u011flu it", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospu \u00e7oc", "orospu\u00e7ocu\u011fu", "orospu \u00e7ocu\u011fu", "orospu \u00e7ocu\u011fudur", "orospu \u00e7ocuklar\u0131", "orospudur", "orospular", "orospunun", "orospunun evlad\u0131", "orospuydu", "orospuyuz", "orostoban", "orostopol", "orrospu", "oruspu", "oruspu\u00e7ocu\u011fu", "oruspu \u00e7ocu\u011fu", "osbir", "ossurduum", "ossurmak", "ossuruk", "osur", "osurduu", "osuruk", "osururum", "otuzbir", "\u00f6k\u00fcz", "\u00f6\u015fex", "patlak zar", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevengin evlad\u0131", "pezevenk", "pezo", "pic", "pici", "picler", "pi\u00e7", "pi\u00e7in o\u011flu", "pi\u00e7 kurusu", "pi\u00e7ler", "pipi", "pipi\u015f", "pisliktir", "porno", "pussy", "pu\u015ft", "pu\u015fttur", "rahminde", "revizyonist", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "saxo", "sekis", "serefsiz", "sevgi koyar\u0131m", "sevi\u015felim", "sexs", "s\u0131\u00e7ar\u0131m", "s\u0131\u00e7t\u0131\u011f\u0131m", "s\u0131ecem", "sicarsin", "sie", "sik", "sikdi", "sikdi\u011fim", "sike", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikertir", "sikertmek", "sikesen", "sikesicenin", "sikey", "sikeydim", "sikeyim", "sikeym", "siki", "sikicem", "sikici", "sikien", "sikienler", "sikiiim", "sikiiimmm", "sikiim", "sikiir", "sikiirken", "sikik", "sikil", "sikildiini", "sikilesice", "sikilmi", "sikilmie", "sikilmis", "sikilmi\u015f", "sikilsin", "sikim", "sikimde", "sikimden", "sikime", "sikimi", "sikimiin", "sikimin", "sikimle", "sikimsonik", "sikimtrak", "sikin", "sikinde", "sikinden", "sikine", "sikini", "sikip", "sikis", "sikisek", "sikisen", "sikish", "sikismis", "siki\u015f", "siki\u015fen", "siki\u015fme", "sikitiin", "sikiyim", "sikiym", "sikiyorum", "sikkim", "sikko", "sikleri", "sikleriii", "sikli", "sikm", "sikmek", "sikmem", "sikmiler", "sikmisligim", "siksem", "sikseydin", "sikseyidin", "siksin", "siksinbaya", "siksinler", "siksiz", "siksok", "siksz", "sikt", "sikti", "siktigimin", "siktigiminin", "sikti\u011fim", "sikti\u011fimin", "sikti\u011fiminin", "siktii", "siktiim", "siktiimin", "siktiiminin", "siktiler", "siktim", "siktim", "siktimin", "siktiminin", "siktir", "siktir et", "siktirgit", "siktir git", "siktirir", "siktiririm", "siktiriyor", "siktir lan", "siktirolgit", "siktir ol git", "sittimin", "sittir", "skcem", "skecem", "skem", "sker", "skerim", "skerm", "skeyim", "skiim", "skik", "skim", "skime", "skmek", "sksin", "sksn", "sksz", "sktiimin", "sktrr", "skyim", "slaleni", "sokam", "sokar\u0131m", "sokarim", "sokarm", "sokarmkoduumun", "sokay\u0131m", "sokaym", "sokiim", "soktu\u011fumunun", "sokuk", "sokum", "soku\u015f", "sokuyum", "soxum", "sulaleni", "s\u00fclaleni", "s\u00fclalenizi", "s\u00fcrt\u00fck", "\u015ferefsiz", "\u015f\u0131ll\u0131k", "taaklarn", "taaklarna", "tarrakimin", "tasak", "tassak", "ta\u015fak", "ta\u015f\u015fak", "tipini s.k", "tipinizi s.keyim", "tiyniyat", "toplarm", "topsun", "toto\u015f", "vajina", "vajinan\u0131", "veled", "veledizina", "veled i zina", "verdiimin", "weled", "weledizina", "whore", "xikeyim", "yaaraaa", "yalama", "yalar\u0131m", "yalarun", "yaraaam", "yarak", "yaraks\u0131z", "yaraktr", "yaram", "yaraminbasi", "yaramn", "yararmorospunun", "yarra", "yarraaaa", "yarraak", "yarraam", "yarraam\u0131", "yarragi", "yarragimi", "yarragina", "yarragindan", "yarragm", "yarra\u011f", "yarra\u011f\u0131m", "yarra\u011f\u0131m\u0131", "yarraimin", "yarrak", "yarram", "yarramin", "yarraminba\u015f\u0131", "yarramn", "yarran", "yarrana", "yarrrak", "yavak", "yav\u015f", "yav\u015fak", "yav\u015fakt\u0131r", "yavu\u015fak", "y\u0131l\u0131\u015f\u0131k", "yilisik", "yogurtlayam", "yo\u011furtlayam", "yrrak", "z\u0131kk\u0131m\u0131m", "zibidi", "zigsin", "zikeyim", "zikiiim", "zikiim", "zikik", "zikim", "ziksiiin", "ziksiin", "zulliyetini", "zviyetini"];
client.chatKoruma = async mesajIcerik => {
  if (!mesajIcerik) return;
  let inv = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
  if (inv.test(mesajIcerik)) return true;

  let link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;
  if (link.test(mesajIcerik)) return true;

  if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(mesajIcerik))) return true;
  return false;
};

client.splitEmbedWithDesc = async function (description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0]) + 1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
let desc = description.split("").splice(i * 2048, (i + 1) * 2048)
let x = new MessageEmbed().setDescription(desc.join(""))
if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
if (i == embedSize - 1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
if (i == embedSize - 1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
if (features) {
  let keys = Object.keys(features)
  keys.forEach(key => {
if (key == "setTimestamp") return
let value = features[key]
if (i !== 0 && key == 'setColor') x[key](value[0])
else if (i == 0) {
  if (value.length == 2) x[key](value[0], value[1])
  else x[key](value[0])
}
  })
}
embeds.push(x)
  }
  return embeds
};

client.yolla = async function (mesaj, msg, kanal) {
  if (!mesaj || typeof mesaj !== "string") return
  const embd = new Discord.MessageEmbed()
.setAuthor(msg.tag, msg.displayAvatarURL({
  dynamic: true
}))
.setColor("RANDOM")
.setDescription(mesaj)
  kanal.send(embd).then(msg => {
  msg.delete({
timeout: 15000
  })
})
.catch(console.error);
}

client.convertDuration = (date) => {
  return moment.duration(date).format('H [saat,] m [dk.]');
};

client.wait = async function (ms) {
  return new Promise((resolve) => {
setTimeout(resolve, ms);
  });
};

Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
};
Array.prototype.shuffle = function () {
  let i = this.length;
  while (i) {
let j = Math.floor(Math.random() * i);
let t = this[--i];
this[i] = this[j];
this[j] = t;
  }
  return this;
};
Array.prototype.temizle = function () {
  let yeni = [];
  for (let i of this) {
if (!yeni.includes(i)) yeni.push(i);
  }
  return yeni;
};

client.savePunishment = async () => {
  sunucuayar.findOne({}, async (err, res) => {
if (!res) return
res.WARNID = res.WARNID + 1
res.save().catch(e => console.log(e))
  })
}

client.Embed = async (kanal, message) => {

  let embed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(message)
  client.channels.cache.get(kanal).send(embed).then(x => x.delete({
timeout: 5000
  }))
  return embed
}

client.aacddAudit = function (id, value) {
  Stat.updateMany({
userID: id,
guildID: client.ayarlar.sunucuId
  }, {
$inc: {
  "yedi.Yetkili": value
}
  }).exec((err, res) => {
if (err) console.error(err);
  });
};


function aaddAudit(id, value) {
  Stat.updateMany({
userID: id,
guildID: client.ayarlar.sunucuId
  }, {
$inc: {
  "yedi.Invite": value
}
  }).exec((err, res) => {
if (err) console.error(err);
  });
};


client.addAudit = function (id, value, Type) {
  if (Type == "Erkek") {
Stat.updateMany({
  userID: id,
  guildID: client.ayarlar.sunucuId
}, {
  $inc: {
"yedi.Register": value,
"Man": value,
["coin"]: 0.6666666666666666
  }
}, {
  upsert: true
}).exec((err, res) => {
  if (err) console.error(err);
});

  } else if (Type == "Kadin") {
Stat.updateMany({
  userID: id,
  guildID: client.ayarlar.sunucuId
}, {
  $inc: {
"yedi.Register": value,
"Woman": value,
["coin"]: 0.6666666666666666
  }
}, {
  upsert: true
}).exec((err, res) => {
  if (err) console.error(err);
});
  } else return;
}

client.dailyMission = async function (userID, type, value) {
  randMiss.findOne({
userID: userID
  }, async (err, data) => {
if (!data) return;
if (data.Mission.MISSION == type) {
  data.Check += value;
  data.save()
}
  })
}

client.easyMission = async function (userID, type, value) {
  easyMiss.findOne({
userID: userID
  }, async (err, data) => {
if (!data) return;
if (data.Mission.Type == type) {
  data.Check += value;
  data.save()
}
  })
}