let moment = require("moment");
moment.locale("tr");
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
let sunucuayar = require("../models/sunucuayar");
let jailInterval = require("../models/jailInterval");
let reklamInterval = require("../models/reklamInterval");
const client = global.client;
const ceza = require("../models/ceza");
const settings = require("../../settings");
let conf = client.ayarlar
module.exports = async member => {
  let data = await sunucuayar.findOne({});
  let kayitKanal = data.REGISTER;
  let rules = data.RULES;
  let kayitsizRol = data.UNREGISTER;
  let supheliRol = data.SUPHELI;
  let tag2 = data.TAG2;
  let tag = data.TAG;
  let kanalKontrol = client.channels.cache;
  let jailRol = data.JAIL;
  let reklamRol = data.REKLAM;
  let yasaklıTagRol = data.BANTAG
  let bantag = data.BAN_TAG;
  if (!kanalKontrol.get(kayitKanal)) return console.log("kayıt kanalı ayarlı değil.")
  let toplamüye = member.guild.memberCount

  let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
  let jailKontrol = await jailInterval.findOne({
    userID: member.id
  }) || {
    jailed: false
  };
  let reklamKontrol = await reklamInterval.findOne({
    userID: member.id
  }) || {
    reklam: false 
  };

  let kayitsizRol2 = reklamKontrol.reklam == true ? [reklamRol] : jailKontrol.jailed === true ? [jailRol] : bantag.some(yasak => member.user.username.includes(yasak)) ? [yasaklıTagRol] :  kayitsizRol
  if (guvenilirlik) {
    let embed2 =  new Discord.EmbedBuilder().setFooter({ text: client.ayarlar.footer }).setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true})})

   client.channels.cache.find(a => a.name === "şüpheli-log").send({ embeds: [embed2.setDescription(`${member} (\`${member.id}\` - \`${member.user.tag}\`) Adlı Üye Sunucuya Katıldı.
   **─────────────────────**
   :clock: Kullanıcı Hesabını \`7\` gün içerisinde oluşturduğu için sunucuda \`Yeni Hesap\` Kategorisine Gönderildi ${client.emojis.cache.find(x => x.name === "wex_carpi")}
   Verilen Roller: <@&${supheliRol}>
   **─────────────────────**
   Kullanıcının Hesap Oluşturma Tarihi: \`${moment(member.user.createdTimestamp).locale('tr').format("LLL")}\` **[** <t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R>  **]** `)] })
   member.roles.add(supheliRol)
    return kanalKontrol.get(kayitKanal).send(`\`${member}\` kullanıcısının hesabı <t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R> açıldığı için **Cezalı** kategorisine gönderildi! ${client.emojis.cache.find(x => x.name === "wex_carpi")}`);
  } else {
    await member.roles.set(kayitsizRol2).then(async () => {
      await member.setNickname(`${tag2} İsim | Yaş`)
      kanalKontrol.get(kayitKanal).send(`${member.toString()} Sunucumuza Hoşgeldin, 
Seninle Beraber **${toplamüye}** Kişi Sayısına Ulaştık. 

Hesabın __${member.user.createdAt.toTurkishFormatDate()}__ Tarihinde (<t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R>) Oluşturulmuş ${client.emojis.cache.find(x => x.name === "wex_security")}
\`${tag}\` Tagımızı Alarak,Takviye Yaparak Kayıt Olabilirsin! ! || <@&1141003821649236038> ||
\`\`\`json\n"Sayın Üyemiz Kayıt Olduktan Sonra Rules Kanalımızdaki Kurallarımızı Okumuş Sayılacaksınız Ve Ona Göre Ceza-i İşlem Uygulayacağız.${member.guild.name}"\n\`\`\``).catch(console.error);
            if(member.user.username.includes("†")) member.roles.add(ayarlar.TEAM)
         
    })

  }
  let embed =  new Discord.EmbedBuilder().setFooter({ text: client.ayarlar.footer }).setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true})})
  client.channels.cache.find(a => a.name === "giris-cikis-log").send({ embeds: [embed.setDescription(`${member} (\`${member.id}\` - \`${member.user.tag}\`) Adlı Üye Sunucuya Katıldı.
  **─────────────────────**
  Kullanıcının Hesap Oluşturma Tarihi: \`${moment(member.user.createdTimestamp).locale('tr').format("LLL")}\` **[** <t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R>  **]**`)] })

};
client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;  

  string = string.trim();
  return `\`${string} önce\``;
};

Array.prototype.chunk = function (chunk_size) {
  let myArray = Array.from(this);
  let tempArray = [];
  for (let index = 0; index < myArray.length; index += chunk_size) {
    let chunk = myArray.slice(index, index + chunk_size);
    tempArray.push(chunk);
  }
  return tempArray;
};
Date.prototype.toTurkishFormatDate = function () {
  return moment.tz(this, "Europe/Istanbul").locale("tr").format('LLL');
};

client.convertDuration = (date) => {
  return moment.duration(date).format('H [saat,] m [dakika]');
};