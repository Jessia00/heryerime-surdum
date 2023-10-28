const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const conf = client.ayarlar;
let moment = require("moment")
moment.locale("tr");
let ms = require("ms");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
let profil = require("../../models/profil");
let reklamInterval = require("../../models/reklamInterval");
var limit = new Map(); 
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    
    let sec = args[0];
    let data = await sunucuayar.findOne({})
    let jailSorumlusu = data.REKLAMAuthorized;
    let reklamLOGKanal = data.REKLAMChannel;
    let REKLAMLimit = data.REKLAMLimit;
    let cezaID = data.WARNID;
    let reklamROL = data.REKLAM;
    let booster = data.BOOST
    if (sec == "setup") {
        if (!args[1]) return message.reply("Lütfen `yetki-kanal-limit` belirleyiniz")
        if (message.guild.members.cache.some(member => conf.sahip.some(sahip => member === sahip)) || message.member.permissions.has(8) || message.author.id === message.guild.owner.id) {
            await sunucuayar.findOne({
                guildID: message.guild.id
            }, async (err, data) => {
                if (args[1] == "yetki") {
                    let select;
                    if (message.mentions.roles.size >= 1) {
                        select = message.mentions.roles.map(r => r.id);
                    } else {
                        if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                        select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                    }
                    return data.REKLAMAuthorized = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "kanal") {
                    let select = message.mentions.channels.first();
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.REKLAMChannel = select.id, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "limit") {
                    let select = Number(args[2])
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.REKLAMLimit = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
            })
        } else return message.reply("Bu komutu kullanabilmek için YÖNETİCİ - Sunucu Sahibi olmanız gerekiyor")
    }
      let server = await sunucuayar.findOne({guildID: message.guild.id});  
      if(!message.member.permissions.has("8") && !server.REKLAMAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
    if (jailSorumlusu.length >= 1 && client.channels.cache.get(reklamLOGKanal) && REKLAMLimit >= 1) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let reason = args.slice(1).join(" ");
            if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (!reason) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir sebeb belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (limit.get(message.author.id) >= REKLAMLimit) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Limiti aştıgın için ban komutunu kullanman engellendi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile \`Aynı/Alt\` bir yetkide oldugun için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (target.roles.cache.get(data.EnAltYetkiliRol) && !message.member.permissions.has(8)) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Yetkili birine işlen uygulayamazsın.`);

            let embedcik = new Discord.EmbedBuilder()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }).setDescription(`${client.emojis.cache.find(res => res.name === "wex_ban")} ${target} (**${target.id}**) kullanıcısı ${message.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı. (Ceza Numarası: \`#${cezaID+1}\`)`)
            let messageEmbed = embedcik
let messageLogEmbed = new Discord.EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
				.setDescription(`${target} (**${target.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${reason}** sebebiyle kalıcı olarak sunucudan yasakland.`)
            limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
            setTimeout(() => {
                limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
            },1000*60*3)
            bahadırınAmk(target, booster, reklamROL, message, messageEmbed, client, reklamLOGKanal, messageLogEmbed, cezaID, reason);

        } else return client.Embed(message.channel.id, "Lütfen reklam komudunun kurulumunu tamamlayınız `" + conf.prefix[0] + "reklam setup` yazarak kurunuz!")
}
exports.conf = {
    aliases: ["ban"]
}
exports.help = {
    name: 'ban'
}

function bahadırınAmk(target, booster, reklamROL, message, messageEmbed, client, reklamLOGKanal, messageLogEmbed, cezaID, reason) {
    message.guild.members.ban(target.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1})
    message.channel.send({embeds: [messageEmbed]}).then(sentEmbed => {
            sentEmbed.react(client.emojis.cache.find(res => res.name === "wex_tik"))
    
        })
        client.channels.cache.get(reklamLOGKanal).send({embeds: [messageLogEmbed]});
        let newData = ceza({
            ID: cezaID + 1,
            userID: target.id,
            Yetkili: message.author.id,
            Ceza: "BAN",
            Sebep: reason,
            Puan: 0,
            Atilma: Date.now(),
            Bitis: "null",
        });
        client.savePunishment();
        newData.save();
}