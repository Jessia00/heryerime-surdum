const {
  MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const { AuditLogEvent } = require("discord.js");

const { Client, Collection, GatewayIntentBits, EmbedBuilder,Partials, InteractionType } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const fs = require('fs');
const ceza = require("./models/ceza")
const moment = require('moment');
const Users = require('./models/RolesLog');
const logs = require('discord-logs');
moment.locale("tr");
let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
const URI = mainSettings.MongoDB;
logs(client);

mongoose.connect(URI, {

  useNewUrlParser: true, 
  
  useUnifiedTopology: true 
  
  }, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });
  const sunucuayar = require('./models/sunucuayar');
let randMiss = require("./models/randomMission");
let easyMiss = require("./models/easyMission");
let puansystem = require("./models/puansystem");
client.db = require("./models/özelperm");
let stats = require("./models/stats");
let xpData = require("./models/stafxp");
require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
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

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-.]{27}/g;


client.ayarlar = {
	"prefix": mainSettings.prefix,
	"botSesID": mainSettings.botSesID,
	"sunucuId": mainSettings.sunucuId,
	"sahip": mainSettings.sahip,
	"commandChannel": mainSettings.commandChannel,
	
	"CHAT_KANAL": mainSettings.CHAT_KANAL,
	"PUBLIC_KATEGORI": mainSettings.PUBLIC_KATEGORI,
	"STREAMER_KATEGORI":mainSettings.STREAMER_KATEGORI,
	"REGISTER_KATEGORI": mainSettings.REGISTER_KATEGORI,
	"SLEEP_ROOM": mainSettings.SLEEP_ROOM,
	
	"footer": mainSettings.footer,
	"onsekizatilacakoda": mainSettings.onsekizatilacakoda,
	"onsekizodalar": mainSettings.onsekizodalar,
	"readyFooter": mainSettings.readyFooter,
	"chatMesajı": mainSettings.chatMesajı,
	"YETKI_VER_LOG": mainSettings.YETKI_VER_LOG,
	"CEZA_PUAN_KANAL": mainSettings.CEZA_PUAN_KANAL,
	"CEZA_PUAN_SYSTEM": mainSettings.CEZA_PUAN_SYSTEM
}
const ayarlar = client.ayarlar
global.ayarlar = ayarlar;

client.login(mainSettings.STATS).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));
client.emoji = function (x) {
  return client.emojis.cache.find(x => x.name === client.emojiler[x]);
};

client.channelTime = new Map();

client.yolla = async (mesaj, msg, kanal) => {
  if (!mesaj || typeof mesaj !== "string") return
  const embd = new EmbedBuilder()
    .setDescription(mesaj)
  kanal.send({embeds: [embd]})
    .catch(console.error);
}


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
  onay: "sea27",
  iptal: "sea20",
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


client.on("guildMemberAdd", member => {
  let toplamüye = member.guild.memberCount
  const amanınanı = client.channels.cache.find(x => x.name == "giris-cikis-log-basic");
  amanınanı.send(`:inbox_tray: ${member.user} (\`${member.user.id}\`) katıldı. (\`${toplamüye}\`) kişi olduk.`)
})

client.on("guildMemberRemove", member => {
  let toplamüye = member.guild.memberCount
  const babanınanı = client.channels.cache.find(x => x.name == "giris-cikis-log-basic");
  babanınanı.send(`:outbox_tray: ${member.user} (\`${member.user.id}\`) ayrıldı. (\`${toplamüye}\`) kişi olduk.`)
})


client.on("guildMemberRoleAdd", (member, role) => {
  member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(async (audit) => {
    const basicrollolg = client.channels.cache.find(x => x.name == "role-log-basic");

  let ayar = audit.entries.first()
  let hedef = ayar.target
  let yapan = ayar.executor
  let Embed = new EmbedBuilder()
  .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
  .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
  if (yapan.bot) return
  basicrollolg.send(`${member} üyesine ${role.name} (\`${role.id}\`) rolü ${yapan} (\`${yapan.id}\`) tarafından verildi. `)
  client.channels.cache.find(a => a.name === "role-log").send({ embeds: [Embed.setDescription(`${member} üyesine bir rol **eklendi.**\n\n**Rolü ekleyen kişi:** ${yapan} (\`${yapan.id}\`)\n**Eklenen rol:** ${role} (\`${role.id}\`)\n**Eklenme Tarihi:** \`${moment(Date.now()).locale("tr").format("LLL")}\`\n\n\`.rollog ${hedef.id}\``)] });});})
  client.on("guildMemberRoleRemove", (member, role) => {
    const basicrollolg = client.channels.cache.find(x => x.name == "role-log-basic");
    member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(async (audit) => {
      let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    let Embed = new EmbedBuilder()
    .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
    .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
      if (yapan.bot) return
      basicrollolg.send(`${member} üyesinden ${role.name} (\`${role.id}\`) rolü ${yapan} (\`${yapan.id}\`) tarafından alındı. `)
    client.channels.cache.find(a => a.name === "role-log").send({ embeds: [Embed.setDescription(`${member} üyesinden bir rol **Alındı.**\n\n**Rolü alan kişi:** ${yapan} (\`${yapan.id}\`)\n**Alınan rol:** ${role} (\`${role.id}\`)\n**Alınma Tarihi:** \`${moment(Date.now()).locale("tr").format("LLL")}\`\n\n\`.rollog ${hedef.id}\``)] });});})
   
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
      member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberUpdate}).then(async (audit) => {
        let ayar = audit.entries.first()
      let hedef = ayar.target
      let yapan = ayar.executor
      let Embed = new EmbedBuilder()
      .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
      .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
        client.channels.cache.find(a => a.name === "nickname-log").send({ embeds: [Embed.setDescription(`\`${hedef.tag}\` adlı kullanıcının sunucu içerisindeki kullanıcı adı değiştirildi.\n**ESKİ**: \`${oldNickname || member.user.username}\` - **YENİ**: \`${newNickname || member.user.username}\`\n\`\`\`Kullanıcı: ${hedef.tag} (${hedef.id})\nDeğiştirme Tarihi: ${moment(Date.now()).locale("tr").format("LLL")}\nDeğiştiren: ${yapan.tag} (${yapan.id})\`\`\``)] });});})
        client.on('voiceStateUpdate', async (oldState, newState) => {
          if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
          const channel = client.channels.cache.find(x => x.name == "ses-log");
          const channelbasic = client.channels.cache.find(x => x.name == "ses-log-basic");
          if (!channelbasic) return;

          if (!channel) return;
          let member = newState.guild.members.cache.get(newState.id);
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
      
          if (!oldState.channel && newState.channel) {
          const newchannelmember = newState.channel.members
          .map((x) => `<@${x.user.id}>`)
          .splice(0, 20)
          .join(", ");
          channelbasic.send(`:telephone: ${oldState.member.user.tag} (\`${oldState.member.user.id}\`) <#${newState.channel.id}> kanalına giriş yaptı. `)
          channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(client.ayarlar.sunucuId).name, iconURL: client.guilds.cache.get(client.ayarlar.sunucuId).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
            .setDescription(`<@${newState.member.user.id}> üyesi <#${newState.channel.id}> kanalına giriş yaptı.\n\n**Kanala girdiği anda:**\n\`•\` Mikrofon durumu: \`${microphone}\`.\n\`•\` Kulaklık durumu: \`${headphones}\`.\n\`\`\`Giridiği kanal: ${newState.channel.name} (${newState.channelId})\nKullanıcı: ${newState.member.user.tag} (${newState.member.user.id})\nEylem Gerçekleşme: ${moment(newState.createdAt).locale("tr").format('LLL')}\n\n\n\`\`\`\nGirdiği kanalda bulunan üyeler:\n${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}`)   
]});
          return }
          if (oldState.channel && !newState.channel) {
            const makro = oldState.channel.members
            .map((x) => `<@${x.user.id}>`)
            .splice(0, 20)
            .join(", ");
            channelbasic.send(`:telephone: ${oldState.member.user.tag} (\`${oldState.member.user.id}\`) adlı üye <#${oldState.channel.id}> kanalından ayrıldı. `)
          channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(client.ayarlar.sunucuId).name, iconURL: client.guilds.cache.get(client.ayarlar.sunucuId).iconURL({dynamic:true})}).setThumbnail(oldState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
            .setDescription(`<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından ayrıldı.\n\n**Kanaldan Çıktığı anda:**\n\`•\` Mikrofon durumu: \`${microphone}\`.\n\n\`•\` Kulaklık durumu: \`${headphones}\`.\n\n\`\`\`Çıktığı kanal: ${oldState.channel.name} (${oldState.channelId})\nKullanıcı: ${oldState.member.user.tag} (${oldState.member.user.id})\nEylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`\nÇıktığı kanalda bulunan üyeler:\n${makro}`)   ]});
          return }
          if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) {
          const newchannelmember = newState.channel.members
          .map((x) => `<@${x.user.id}>`)
          .splice(0, 20)
          .join(", ");
          const makro = oldState.channel.members
          .map((x) => `<@${x.user.id}>`)
          .splice(0, 20)
          .join(", ");
          channelbasic.send(`:telephone: ${oldState.member.user.tag} (\`${oldState.member.user.id}\`) adlı üye <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı. `)
          channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(client.ayarlar.sunucuId).name, iconURL: client.guilds.cache.get(client.ayarlar.sunucuId).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
            .setDescription(`<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı.\n\n**Kanal Değiştirdiği Anda:**\n\`•\` Mikrofon durumu: \`${microphone}\`.\n\`•\` Kulaklık durumu: \`${headphones}\`.\n\n\`\`\`Çıktığı kanal: ${oldState.channel.name} (${oldState.channelId})\nKullanıcı: ${oldState.member.user.tag} (${oldState.member.user.id})\nEylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`\n\nEski Kanalında Bulunan Üyeler:\n${makro}\n\nYeni Kanalında Bulunan Üyeler:\n${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}`)   
]});
           }

          
        });
        
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


client.on("interactionCreate", async interaction => {
  if (interaction.customId === 'bir') {
    if(!interaction.member.permissions.has("8")) return;
    const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"]
    const guild = client.guilds.cache.get(client.ayarlar.sunucuId)
    guild.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
    interaction.reply(`Başarılı. Yetkiler kapatıldı.`)  
    client.channels.cache.find(a => a.name === "shields-log").send(`${interaction.member} (**${interaction.member.id}**) tarafından yetkiler kapatıldı.`)
  }
    if (interaction.customId === 'iki') {
      if(!interaction.member.permissions.has("8")) return;
      interaction.guild.roles.cache.get("876793971215568966").setPermissions(1412500629n)//ban emoji yönet  denetim kaydı rol yönet kanal yönet
      interaction.guild.roles.cache.get("976528442654871593").setPermissions(1412500613n)//ban emoji yönet  denetim kaydı rol yönet
      interaction.guild.roles.cache.get("973985494402748466").setPermissions(1144065157n)//ban emoji yönet  denetim kaydı
      interaction.guild.roles.cache.get("974027360754106408").setPermissions(70323329n)//sadece denetim kaydı
      interaction.reply(`Başarılı. Yetkiler açıldı.`)
      client.channels.cache.find(a => a.name === "shields-log").send(`${interaction.member} (**${interaction.member.id}**) tarafından yetkiler açıldı.`)

        }
        if (interaction.customId === 'üç') {
          if(!interaction.member.permissions.has("8")) return;
          const banneds = await interaction.guild.bans.fetch()
          await banneds.forEach(async member => {
            await interaction.guild.members.unban(member.user.id, `[Toplu Ban Affı] - Yetkili: ${interaction.member.user.tag}`) 
            interaction.reply(`Başarılı. Tüm banlar sırasıyla açılıyor.`)

          })  
          client.channels.cache.find(a => a.name === "shields-log").send(`${interaction.member} (**${interaction.member.id}**) tarafından ban affı getirildi.`)
    
            }
            if (interaction.customId === 'dört') {
              if(!interaction.member.permissions.has("8")) return;
              await ceza.deleteMany({}).exec()                
              interaction.reply(`Başarılı. Tüm ceza-i işlem verileri sıfırlandı.`)
              client.channels.cache.find(a => a.name === "shields-log").send(`${interaction.member} (**${interaction.member.id}**) tarafından ceza-i işlemler sıfırlandı.`)
        
                }
                if (interaction.customId === 'beş') {
                  if(!interaction.member.permissions.has("8")) return;
                  await stats.deleteMany({}).exec()                
                  interaction.reply(`Başarılı. Tüm stat verileri sıfırlandı.`)
                  client.channels.cache.find(a => a.name === "shields-log").send(`${interaction.member} (**${interaction.member.id}**) tarafından stat verileri sıfırlandı.`)
            
                    }
    
})



//LOGS
  


client.easyMission = async function(userID, type, value) {
  easyMiss.findOne({userID: userID}, async (err, data) => {
    if (!data) return;
    if (data.Mission.Type == type) {
      data.Check+=value;data.save()
    }
  })
}


let arr = [{
  Chat: "💬🥉",
  Voice: "🔊🥉",
  ChatColor: "#fa795b",
  VoiceColor: "#fa795b",
  sLevel: 3,
  cLevel: 2
}, {
  Chat: "💬🥈",
  Voice: "🔊🥈",
  ChatColor: "#cfcbcb",
  VoiceColor: "#cfcbcb",
  sLevel: 8,
  cLevel: 5
}, {
  Chat: "💬🥇",
  Voice: "🔊🥇",
  ChatColor: "#fffb00",
  VoiceColor: "#fffb00",
  sLevel: 20,
  cLevel: 35
}, {
  Chat: "💬🏆",
  Voice: "🔊🏆",
  ChatColor: "#23fafa",
  VoiceColor: "#23fafa",
  sLevel: 50,
  cLevel: 70
}]
client.checkLevel = async function (userID, guildID, type) {
  let levelKontrol = await puansystem.findOne({guildID: guildID}) || {LevelSystem: {Type: false, LogChannel: null}};
  if (levelKontrol.LevelSystem.Type == false) return;
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  let kontrol = await stats.findOne({
    userID: userID,
    guildID: guildID
  });
  if (!kontrol) return;
  arr.map(async data => {
    if (type === "mesaj") {
      if (kontrol.messageLevel >= data.cLevel) {
        if (kontrol.autoRankup.includes(data.Chat)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Chat}}, {upsert: true}).exec()
        client.channels.cache.get(levelKontrol.LevelSystem.LogChannel).send(`:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Chat}"** rolüne terfi edildin!`)
      };
    };
    if (type === "ses") {
      if (kontrol.voiceLevel >= data.sLevel) {
        if (kontrol.autoRankup.includes(data.Voice)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Voice}}, {upsert: true}).exec()
        client.channels.cache.get(levelKontrol.LevelSystem.LogChannel).send(`:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Voice}"** rolüne terfi edildin!`)
      };
    };
  });
};