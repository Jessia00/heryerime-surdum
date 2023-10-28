require("moment-timezone")
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
const moment = require("moment")
let uyarıData = require("../../models/uyarı");
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
let puansystem = require("../../models/puansystem");
let taglıData = require("../../models/taglıUye");
const yetkiliDB = require("../../models/yetkili");
let ozelKomut = require("../../models/özelkomut");
let missionSystem = require("../../models/randomMission");
const Seens = require("../../models/Seens")
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sunucuData = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.REGISTERAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
    let members = message.guild.members.cache.filter(m => m.voice.channelId);
    let tag = server.TAG;
    let pubID = conf.PUBLIC_KATEGORI;

    let topses = message.guild.members.cache.filter(s => s.voice.channel);
    let tagses = topses.filter(s => s.user.username.includes(tag));

    let yayın = topses.filter(s => s.voice.streaming);
    let mik = topses.filter(s => s.voice.selfMute).size;
    let kulak = topses.filter(s => s.voice.selfDeaf).size;
    let bot = topses.filter(s => s.user.bot);
    let count = 1;
    let topCategory = message.guild.channels.cache.filter(s => s.type === 'category').sort((a, b) => Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentId === b.id).size - Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentId === a.id).size))).map((c, index) => `${count++}. \`#${c.name}\`: \`${c.members.filter(s => s.voice.channel && s.voice.channel.parentId === c.id).size}\``).splice(0, 3).join('\n');
    let yetkili = message.guild.members.cache.filter(x => {
      return x.user.username.includes(conf.tag) && x.voice.channel && x.roles.cache.has(conf.ekipRolu)
  }).size
  const embed = new EmbedBuilder().setFooter({ text: conf.footer}).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true })});
    embed.setDescription(`
Sesli kanallarda toplam **${topses.size}** kişi var !

Public odalarda **${members.filter(m => pubID.includes(m.voice.channel.parentId)).size}** kişi var !
Ses kanallarında **${tagses.size}** taglı kullanıcı var !
Ses kanallarında **${yetkili}** yetkili var !

Ses kanallarında **${yayın.size}** kişi yayın yapıyor !
Mikrofonu kapalı: **${mik}**
Kulaklığı kapalı: **${kulak}**

**Top 3 kategori sırası;**
${topCategory || 'Boş'}
`)


    message.channel.send({ embeds: [embed]})

}
exports.conf = {
    aliases: ["seslisay"]
}
exports.help = {
    name: 'sssay'
}

function progressBar(value, maxValue, size) {
    const percentage = value < 0 ? 0 : value >= maxValue ? 100 / 100 : value / maxValue;
    const progress = Math.round((size * percentage));
    const emptyProgress = size - progress;
    const progressText = `${client.emojis.cache.find(x => x.name == "wex_ortabar")}`.repeat(progress);
    const emptyProgressText = `${client.emojis.cache.find(x => x.name == "wex_griortabar")}`.repeat(emptyProgress);
    const bar = `${value ? client.emojis.cache.find(x => x.name == "wex_solbar") : client.emojis.cache.find(x => x.name == "wex_baslangicbar")}` + progressText + emptyProgressText + `${emptyProgress == 0 ? `${client.emojis.cache.find(x => x.name === "wex_bitisbar")}` : `${client.emojis.cache.find(x => x.name === "wex_gribitisbar")}`}`;
    return bar;
};

function yuzdelik(amount, value) {
    let miktar = amount;
    let istenen = value;
    return Number((miktar / istenen) * 100);
}