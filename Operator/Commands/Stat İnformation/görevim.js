require("moment-timezone")
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
const moment = require("moment")
let ms = require("ms");
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
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let mission = await missionSystem.findOne({
            userID: target.id,
            Active: true
        })

        
if(!mission) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Herhangi bir görevin bulunmuyor, <#1146845466743545977> kanalından görev seçebilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
let loading = await message.channel.send(`Veriler yükleniyor...`)
const Görev1 = new ButtonBuilder().setLabel("Görevi İptal Et!").setCustomId("goreviptal").setStyle(ButtonStyle.Danger)
const row = new ActionRowBuilder()
.addComponents([Görev1])

let Embed = new Discord.EmbedBuilder().setFooter({ text: "developed by erkaysalci" }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }) 

.setDescription(`Merhaba, ${target}

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev Aktif mi ?\` ${mission.Active ? "Aktif": "HATA !"}
${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev \` ${mission ? mission.Mission.MISSION.toUpperCase() : "HATA !"}
${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev Hakkında \` ${mission.Mission.MISSION == "ses" ? `<$${mission.Mission.CHANNEL}> kanalında ${moment.duration(mission.Mission.AMOUNT).format('H [saat,] m [dk.]')} aktif ol.`: mission.Check, mission.Mission.MISSION == "mesaj" ? `<#${mission.Mission.CHANNEL}> kanalına **${mission.Mission.AMOUNT}** mesaj gönder.`: mission.Mission.MISSION == "ses" ? `<#${mission.Mission.CHANNEL}> kanalında **${moment.duration(mission.Mission.AMOUNT).format('H [saat,] m [dk.]')}** aktif ol.` : mission.Mission.MISSION == "davet" ? `Sunucumuza **${mission.Mission.AMOUNT}** üye davet et.` : `Sunucumuzda **${mission.Mission.AMOUNT}** üye kayıt et.`}
${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev İlerleme \` ${mission ? `${progressBar(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6)} (**%${yuzdelik(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6).toFixed(1)}**) ` : `Görev Seçmelisin !`}
${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev Durumu \` ${mission ? mission.Check >= mission.Mission.AMOUNT ? `Tamamlandı. ${client.emojis.cache.find(x => x.name === "wex_succes")}`: `Tamamlanmadı. ${client.emojis.cache.find(x => x.name === "wex_carpi")} (görevin (**%${yuzdelik(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6).toFixed(1)}**) kısmını tamamlamışsın. )` : `${client.emojis.cache.find(x => x.name === "wex_carpi")} Görevin Bulunmamakta.`}
${client.emojis.cache.find(x => x.name === "wex_circle")} \` Görev Ödülü \` ${mission.Mission.Reward} puan.

${client.emojis.cache.find(x => x.name === "wex_info")} Dikkat görevi iptal ettiğinizde görevi aldığınızdan beri yaptıgınız işlemler silinir. `)
loading.delete();
let msg = await message.channel.send({ embeds: [Embed], components: [row] })
    
var filter = button => button.user.id === target.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (button) => {
    let Embed2 = new Discord.EmbedBuilder().setFooter({ text: "developed by erkaysalci" }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }) 
    .setDescription(`${client.emojis.cache.find(x => x.name === "wex_tik")} Başarılı. **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde ${mission ? mission.Mission.MISSION.toUpperCase() : "HATA !"} görevini iptal ettin, <#1146845466743545977> kanalından yeni bir görev seçebilirsin.`)

  if (button.customId === "goreviptal") {
    let missionSyste2m = require("../../models/randomMission");
    row.components[0].setDisabled(true) 
    button.update({components: [row], embeds: [Embed2]})
    let embed2 =  new Discord.EmbedBuilder().setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`${message.author} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde ${mission ? mission.Mission.MISSION.toUpperCase() : "HATA !"} görevini iptal etti`)
    client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed2]})

    await missionSyste2m.deleteOne({userID: target.id})

  }

});

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





}
exports.conf = {
    aliases: ["görevim"]
}
exports.help = {
    name: 'task'
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