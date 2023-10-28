﻿const {
  MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

const client = global.client = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const Stat = require("./models/stats");

const config = require("../settings")
const fs = require('fs');
const moment = require('moment');
moment.locale("tr");
client.cache = {
  GAME_CACHE: []
}

let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
const URI = mainSettings.MongoDB;

mongoose.connect(URI, {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});

const sunucuayar = require('./models/sunucuayar');
client.db = require("./models/özelperm");
let randMiss = require("./models/randomMission");
let easyMiss = require("./models/easyMission");
let ozelKomut = require("./models/özelkomut");
let sorumluluk = require("./models/sorumluluk");
let yetkiDATA = require("./models/yetkili");
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

client.on('interactionCreate', (interaction) => {
  const cmd = client.commands.get(interaction.commandName);
  try {
    cmd.exe(client, interaction);
  } catch (e) {
    return;
  }
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
  "SPECIALROLES": mainSettings.OZELROL,
  "YETKI_VER_LOG": mainSettings.YETKI_VER_LOG,
  "CEZA_PUAN_KANAL": mainSettings.CEZA_PUAN_KANAL,
  "CEZA_PUAN_SYSTEM": mainSettings.CEZA_PUAN_SYSTEM,
}
const conf = client.ayarlar
global.conf = conf;


client.on("messageDelete", async (message) => {
  if(message.author.bot) return;
  client.snipe.set(message.channel.id, message, Date.now())
})


client.login(mainSettings.MODERASYON).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));

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
client.aacddAudit = function (id, value, valuee) {
  Stat.updateMany({
    userID: id,
    guildID: client.ayarlar.sunucuId
  }, {
    $inc: {
      "yedi.Yetkili": value,
      yetkili: value
    }
  }).exec((err, res) => {
    if (err) console.error(err);
  });
};

client.on("interactionCreate", async interaction => {
  if (interaction.customId === 'rolsüzüm') {
    let data = await sunucuayar.findOne({
      guildID: client.ayarlar.sunucuId
    });  
    let member = await client.guilds.cache.get(client.ayarlar.sunucuId).members.fetch(interaction.member.user.id)
    if(!member.roles.cache.has(data.UNREGISTER)){
    member.roles.add(data.UNREGISTER)} else return;
  }

})

client.on("messageDelete", async (message) => {
  if (message.author.bot) return;
  let Embed = new EmbedBuilder()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setDescription(`
${message.author} üyesi ${message.channel} kanalında mesajını sildi.

**__Silinen Mesaj:__**
${message.content.length > 0 ? message.content : "Silinen mesaj yoktur"}

**__Silinen Mesajdaki Resimler:__**
${message.attachments.size > 0 ? message.attachments.filter(({ proxyURL }) => /\.(gif|jpe?g|png|webp)$/i.test(proxyURL)).map(({ proxyURL }) => proxyURL) : "Silinen resim yoktur"}

\`\`\`Kanal: #${message.channel.name} (${message.channel.id})\nKullanıcı: ${message.author.tag} (${message.author.id})\nMesaj ID: ${message.id}\nMesaj Atılma: ${moment(message.createdTimestamp).locale("tr").format("LLL")}\`\`\`
`)
const basicrollolg = client.channels.cache.find(x => x.name == "mesaj-log");
  client.channels.cache.get(client.channels.cache.find(x => x.name == "mesaj-log").id).send({embeds:[Embed]})
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  let Embed = new EmbedBuilder()
    .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
    .setFooter({ text: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
 
    .setDescription(`
${newMessage.author} üyesi ${newMessage.channel} kanalında bir mesajı düzenledi.

**__Düzenlenmeden Önce:__**
${oldMessage.content}
**__Düzenlendikten Sonra:__**
${newMessage.content}

\`\`\`Kanal: #${newMessage.channel.name} (${newMessage.channel.id})\nKullanıcı: ${newMessage.author.tag} (${newMessage.author.id})\nMesaj ID: ${newMessage.id}\nMesaj Atılma: ${moment(newMessage.createdTimestamp).locale("tr").format("LLL")}\`\`\`
`)
const basicrollolg = client.channels.cache.find(x => x.name == "mesaj-log");
client.channels.cache.get(client.channels.cache.find(x => x.name == "mesaj-log").id).send({embeds:[Embed]})
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const prefixes = client.ayarlar.prefix;
  let prefix = prefixes.filter(p => message.content.startsWith(p))[0];
  if (!prefix) return;
  let yazilanKomut = message.content.split(" ")[0];
  yazilanKomut = yazilanKomut.slice(prefix.length);
  if (!yazilanKomut) return;
  client.channels.cache.get(client.channels.cache.find(x => x.name == "cmd-log").id).send(`:wrench: **${message.author.tag}** (\`${message.author.id}\`) üyesi ${message.channel} kanalında bir komut kullandı: \`${prefix + yazilanKomut}\``)
})


client.on("interactionCreate",async (interaction, message) => {

  if(interaction.isButton()) {
     let etkinlikcik = "1021768128339910706"
     let cekiliscik = "1021768134320988180"
     let turnuva = "1021768134320988180"
    if(interaction.customId === "etkinnlikKatilimcisi") {
      let member = interaction.member
      if(member.roles.cache.has(etkinlikcik)) {
        await member.roles.remove(etkinlikcik);
        await interaction.reply({ content: `<@&${etkinlikcik}> rolünü üzerinizden başarıyla aldım!`, ephemeral: true });
      } else {
        await member.roles.add(etkinlikcik);
        await interaction.reply({ content: `<@&${etkinlikcik}> rolünü üzerinize başarıyla ekledim!`, ephemeral: true });
      };
    };
    
    if(interaction.customId === "turnuvakatılım") {
      let member = interaction.member
      if(member.roles.cache.has(turnuva)) {
        await member.roles.remove(turnuva);
        await interaction.reply({ content: `<@&${turnuva}> rolünü üzerinizden başarıyla aldım!`, ephemeral: true });
      } else {
        await member.roles.add(turnuva);
        await interaction.reply({ content: `<@&${turnuva}> rolünü üzerinize başarıyla ekledim!`, ephemeral: true });
      };
    };

    
    if(interaction.customId === "cekilisKatilimcisi") {
      let member = interaction.member
      if(member.roles.cache.has(cekiliscik)) {
        await member.roles.remove(cekiliscik);
        await interaction.reply({ content: `<@&${cekiliscik}> rolünü üzerinizden başarıyla aldım!`, ephemeral: true });
      } else {
        await member.roles.add(cekiliscik);
        await interaction.reply({ content: `<@&${cekiliscik}> rolünü üzerinize başarıyla ekledim!`, ephemeral: true });
      };
    };
  }})
client.on("interactionCreate", async interaction => {
  let data = await sunucuayar.findOne({
    guildID: client.ayarlar.sunucuId
  });
  let member = await client.guilds.cache.get(client.ayarlar.sunucuId).members.fetch(interaction.member.user.id)
  let menu = interaction.customId
  if (menu === "renks") {
    let color = new Map([
      ["kirmizi", "1033476652849704970"],
      ["turuncu", "1033476653965389944"],
      ["mor", "1033476653365600416"],
      ["kahverengi", "1033476654829408266"],
      ["yesil", "1033476655458549830"],
      ["sari", "1033476656268066876"],


    ])
    let role = color.get(interaction.values[0])
    let renkroller = ["1033476652849704970", "1033476653965389944", "1033476653365600416", "1033476654829408266", "1033476655458549830", "1033476656268066876"]
    if (!member.roles.cache.has(data.TEAM) && !member.roles.cache.has(data.BOOST) && !member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({ content: `Bu sistemden sadece isminde \`${data.TAG}\` bulunan ve Booster üyelerimiz yararlanabilmektedir.`, ephemeral: true })
  } else {
      if (interaction.values[0] === "rolsil") {
        await member.roles.remove(renkroller)
      } else if (role) {
        if (renkroller.some(m => member.roles.cache.has(m))) {
          await member.roles.remove(renkroller)
        }
        await member.roles.add(role)
      }
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    }
  } 

  if (menu === "renks") {
    let color = new Map([
      ["Balık", "1033476665520685216"],
      ["Kova", "1033476664455348245"],
      ["Oğlak", "1033476664249827348"],
      ["Yay", "1033476676056797294"],
      ["İkizler", "1033476667278118912"],
      ["Boğa", "1033476669102628905"],
      ["Koç", "1033476666057564170"],
      ["Yengeç", "1033476668171505777"],
      ["Aslan", "1033476670155403354"],
      ["Başak", "1033476671057182831"],
      ["Terazi", "1033476671317213196"],
      ["Akrep", "1033476675238903868"],


    ])
    let role = color.get(interaction.values[0])
    let renkroller = ["1033476665520685216", "1033476664455348245", "1033476664249827348", "1033476676056797294", "1033476667278118912", "1033476669102628905", "1033476666057564170", "1033476668171505777", "1033476670155403354", "1033476671057182831", "1033476671317213196", "1033476675238903868"] 
    if (!member.roles.cache.has(data.TEAM) && !member.roles.cache.has(data.BOOST) && !member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({ content: `Bu sistemden sadece isminde \`${data.TAG}\` bulunan ve Booster üyelerimiz yararlanabilmektedir.`, ephemeral: true })
  } else {
      if (interaction.values[0] === "rolsilburc") {
        await member.roles.remove(renkroller)
      } else if (role) {
        if (renkroller.some(m => member.roles.cache.has(m))) {
          await member.roles.remove(renkroller)
        }
        await member.roles.add(role)
      }
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    }
  } 

})  



client.convertDuration = (date) => {
  return moment.duration(date).format('H [saat,] m [dakika]');
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
  client.channels.cache.get(kanal).send({embeds: [embed]}).then(x => x.delete({
    timeout: 5000
  }))
  return embed
}

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

client.snipe = new Map();
client.on("messageCreate", async message => {
  if (!message.guild || message.channel.type === "dm") return;
  const prefixes = client.ayarlar.prefix;
  let prefix = prefixes.filter(p => message.content.startsWith(p))[0];
  if (!prefix) return;
  let sunucuData = await sunucuayar.findOne({guildID: message.guild.id});
  let data = await ozelKomut.find({guildID: message.guild.id}) || [];
  let data2 = await sorumluluk.find({guildID: message.guild.id}) || [];
  let ozelkomutlar = data;
  let yazilanKomut = message.content.split(" ")[0];
  yazilanKomut = yazilanKomut.slice(prefix.length);
  var args = message.content.split(" ").slice(1);

  let komut = ozelkomutlar.find(x => x.komutAd.toLowerCase() === yazilanKomut);
  if (!komut) return;

  let verilenRol = message.guild.roles.cache.some(rol => komut.verilcekRol.includes(rol.id));
  if (!verilenRol) return;

  let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (message.member.roles.cache.some(rol => komut.roller.includes(rol.id)) || komut.kisiler.includes(message.author.id) || data2.some(veri => komut.sorumluluk.includes(veri)) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    if (!üye) return message.reply(`rolünü verileceği/alınacağı üyeyi etiketlemelisin!`)
    console.log(komut.verilcekRol)
    if(üye.roles.cache.some(rol => komut.verilcekRol.includes(rol.id))) {
        üye.roles.remove(komut.verilcekRol)
        message.channel.send({embeds: [new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: client.user.username, iconURL: client.user.avatarURL()}).setDescription(`${üye} üyesinden ${komut.verilcekRol.map(x => `<@&${x}>`)} rolü alındı!`)]})
    } else {
        message.channel.send({embeds: [new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: client.user.username, iconURL: client.user.avatarURL()}).setDescription(`${üye} üyesine ${komut.verilcekRol.map(x => `<@&${x}>`)} rolü verildi!`)]})
        return üye.roles.add(komut.verilcekRol)
    };
  } else return;
});


client.rolVer = async function (userID, rolArray, authorID, yetkiliArray, mesajChannel, guildID) {
  let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
  if (authorID.roles.cache.some(rol => yetkiliArray.some(rol2 => rol == rol2))) {
    if (userID.roles.cache.some(rol => rolArray.some(rol2 => rol == rol2))) {
      client.channels.cache.get(mesajChannel).send(embed.setDescription(`${userID} adlı kullanıcıdan ${rolArray.map(x => `<@${x}>`)} rolünü aldım`)).catch(() => {})
      userID.roles.remove(rolArray).catch(() => {})
    };
    client.channels.cache.get(mesajChannel).send(embed.setDescription(`${userID} adlı kullanıcıya ${rolArray.map(x => `<@${x}>`)} rolünü verdim`)).catch(() => {})
    userID.roles.add(rolArray).catch(() => {})
  } else return;
};

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
client.easyMission = async function(userID, type, value) {
  easyMiss.findOne({userID: userID}, async (err, data) => {
    if (!data) return;
    if (data.Mission.Type == type) {
      data.Check+=value;data.save()
    }
  })
}




client.permAyar = async function (userID, guildID, type) {
  let member = client.guilds.cache.get(guildID).members.cache.get(userID);
  let data = await sunucuayar.findOne({
    guildID: guildID
  });

  let banyetkiler = data.BANAuthorized
  let muteYetkiler = data.MUTEAuthorized;
  let jailYetkiler = data.JAILAuthorized;
  let reklamYetkiler = data.REKLAMAuthorized;
  let vmuteYetkiler = data.VMUTEAuthorized;
  let registerYetkiler = data.REGISTERAuthorized;
  let USTYT = data.Ust1YetkiliRol;
  let USTYT2 = data.Ust2YetkiliRol;
  let USTYT3 = data.Ust3YetkiliRol;
  let TUMYTLER = data.UstYetkiliRol;
  let botCommands = data.COMMANDAuthorized

  let sabitpermler = member.permissions.has("ADMINISTRATOR") ||
    client.ayarlar.sahip.includes(userID) ||
    data.GKV.includes(userID) ||
    member.roles.cache.has(USTYT) ||
    member.roles.cache.has(USTYT2) ||
    member.roles.cache.has(USTYT3) ||
    member.roles.cache.some(rol => TUMYTLER.includes(rol.id)) || member.id == "728161454288535604";

  let durum;

  if (type == "global") {
    durum = member.roles.cache.some(rol => botCommands.some(rol2 => rol.id == rol2)) || sabitpermler;
  };
  if (type == "ban") {
    durum = member.roles.cache.some(rol => banyetkiler.some(rol2 => rol.id == rol2)) || sabitpermler;
  };
  if (type == "mute") {
    durum = member.roles.cache.some(rol => muteYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "vmute") {
    durum = member.roles.cache.some(rol => vmuteYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "jail") {
    durum = member.roles.cache.some(rol => jailYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "reklam") {
    durum = member.roles.cache.some(rol => reklamYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "register") {
    durum = member.roles.cache.some(rol => registerYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "say") {
    durum = member.roles.cache.some(rol => registerYetkiler.some(rol2 => rol.id == rol2)) || sabitpermler
  };
  if (type == "unban") {
    durum == member.permissions.has("ADMINISTRATOR") || member.id == member.guild.owner.id;
  };
  return durum;
};

client.toplama = async function (array, channelID, target, cezaID, cezaPuan) {
  let toplam = 0;
  for (var oge of array.map(x => x.Puan)) {
    if (isNaN(oge)) {
      continue;
    };
    toplam += Number(oge);
  };
  return client.channels.cache.get(channelID).send(`<@${target}> aldığınız **#${cezaID+1}** ID'li ceza ile **${(toplam+cezaPuan)}** ceza puanına ulaştınız.`);
};