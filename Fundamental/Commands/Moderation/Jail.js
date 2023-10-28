const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const conf = client.ayarlar;
let moment = require("moment")
const {   ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js");
moment.locale("tr");
let ms = require("ms");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
let profil = require("../../models/profil");
let jailInterval = require("../../models/jailInterval");
var limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    
    let sec = args[0];
    let data = await sunucuayar.findOne({})
    let JailSorumlusu = data.JAILAuthorized;
    let JailLogKanal = data.JAILChannel;
    let JailLimit = data.JAILLimit;
    let cezaID = data.WARNID;
    let JailROL = data.JAIL;
    let booster = data.BOOST;

    if (sec == "setup") {
        if (!args[1]) return message.reply("Lütfen `yetki-kanal-limit` belirleyiniz")
		if (message.guild.members.cache.some(member => conf.sahip.some(sahip => member === sahip)) || message.member.permissions.has("ADMINISTRATOR")) {
            await sunucuayar.findOne({
                guildID: message.guild.id
            }, async (err, data) => {
                if (args[1] == "yetki") {
                    let select;
                    if (message.mentions.roles.size >= 1) {
                        select = message.mentions.roles.map(r => r.id);
                    } else {
                        if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_cancel"));			
                        select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                    }
                    return data.JAILAuthorized = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "axze_tik")))
                }
                if (args[1] == "kanal") {
                    let select = message.mentions.channels.first();
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_cancel"));			
                    return data.JAILChannel = select.id, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "axze_tik")))
                }
                if (args[1] == "limit") {
                    let select = Number(args[2])
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_cancel"));			
                    return data.JAILLimit = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
            })
        } else return message.reply("Bu komutu kullanabilmek için YÖNETİCİ - Sunucu Sahibi olmanız gerekiyor")
    }
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.JAILAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
        if (JailSorumlusu.length >= 1 && client.channels.cache.get(JailLogKanal) && JailLimit >= 1) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (target.roles.cache.get(JailROL)) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"))
            if (limit.get(`${message.author.id}`) >= JailLimit) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_carpi")} Geçerli olan \`Mute limitini\` aştığın için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile \`Aynı/Alt\` bir yetkide oldugun için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
if (target.roles.cache.get(data.EnAltYetkiliRol) && !message.member.permissions.has(8)) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Yetkililer birbirine ceza-i işlem uygulayamazlar.`);
            let cezalar = await ceza.find({userID: target.id});
            if (cezalar.length == 0) {
                cezalar = [{Puan: 0}, {Puan: 0}];
            };

            if (client.ayarlar.CEZA_PUAN_SYSTEM == true) {

                if (cezalar.map(x => x.Puan).reduce((a, b) => a + b) >= 200) {
                    await jailInterval.findOne({
                        userID: target.id
                    }, (err, data) => {
                        if (!data) {
                            newData = new jailInterval({
                                userID: target.id,
                                jailed: true,
                            })
                            newData.save()
                        } else {
                            data.jailed = true, data.save();
                        }
                    })
                    await target.roles.set(target.roles.cache.get(data.BOOST) ? [data.JAIL, data.BOOST] : [data.JAIL]);
                    return message.channel.send(`${target.id} adlı üye **200 Ceza Puan'ı** yaptığı için cezalı üyelerin arasına gönderildi!`)
                }
            }
            const sebeps = [
                { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "3 Gün", emoji: {name: "1️⃣"} , value: "1", date: "3d", type: 3},
                { label: `Ortamı  Kötülemek`, description: "5 Gün", emoji: {name: "2️⃣"} ,value: "2", date: "5d", type: 3},
                { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "1 Gün", emoji: {name: "3️⃣"} ,value: "3", date: "1d", type: 3},
                { label: "Sunucu Düzeni Ve Huzursuzluk Yaratmak", description: "4 Gün", emoji: {name: "4️⃣"} ,value: "4", date: "4d", type: 3},
                { label: "Kayıt Odalarında Gereksiz Trol Yapmak", description: "3 Gün", emoji: {name: "5️⃣"}, value: "5", date: "3d", type: 3},
            ]
  
            message.channel.send({embeds: [new EmbedBuilder().setDescription(`${target} isimli üyeyi cezalandırmak istiyor musun?`)], components: [ new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`sebep`)
                .setPlaceholder('Cezalandırmak istediğiniz sebepi seçiniz!')
                .addOptions([
                    { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "3 Gün", emoji: {name: "1️⃣"} , value: "1", date: "3d", type: 3},
                    { label: `Ortamı  Kötülemek`, description: "5 Gün", emoji: {name: "2️⃣"} ,value: "2", date: "5d", type: 3},
                    { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "1 Gün", emoji: {name: "3️⃣"} ,value: "3", date: "1d", type: 3},
                    { label: "Sunucu Düzeni Ve Huzursuzluk Yaratmak", description: "4 Gün", emoji: {name: "4️⃣"} ,value: "4", date: "4d", type: 3},
                    { label: "Kayıt Odalarında Gereksiz Trol Yapmak", description: "3 Gün", emoji: {name: "5️⃣"}, value: "5", date: "3d", type: 3},
                    ]),
            )]}).catch(err => {}).then(async (msg) => {

                const filter = i => i.user.id == message.member.id 
                const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })
        
            collector.on('collect', async cl => {
            
            
                if (cl.customId === `sebep`) {
                   let seçilenSebep = sebeps.find(x => x.value == cl.values[0])
                   if(seçilenSebep) {
                    msg.delete()
                    let embedcik =  new Discord.EmbedBuilder().setFooter({ text: conf.footer })
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
                .setDescription(`${client.emojis.cache.find(res => res.name === "wex_hapis")} ${target} (**${target.id}**) kullanıcısı ${message.author} tarafından **${seçilenSebep.label}** sebebiyle geçiçi olarak cezalı kategorisine gönderildi. (Ceza Numarası: \`#${cezaID+1}\`)`)
                    let messageEmbed = embedcik
                    let messageLogEmbed = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
                        .setDescription(`${target} (**${target.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${seçilenSebep.label}** sebebiyle geçiçi olarak cezalı kategorisine gönderildi.`)
        
                        if (target.voice.channel) {
                            target.voice.setChannel(null);
                        }
                        await jailInterval.findOne({
                            userID: target.id,
                        }, async (err, data) => {
                            if (!data) {
                                let newData = new jailInterval({
                                    userID: target.id,
                                    jailed: true,
                                    endDate: Date.now() + +ms(seçilenSebep.date)
                                })
                                let newDataz = ceza({
                                    ID: cezaID + 1,
                                    userID: target.id,
                                    Yetkili: message.author.id,
                                    Ceza: "JAIL",
                                    Sebep: seçilenSebep.label,
                                    Puan: 15,
                                    Atilma: Date.now(),
                                    Bitis: Date.now() + ms(seçilenSebep.date),
                                })
                                newDataz.save()
                                newData.save()
                                limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
                                setTimeout(() => {
                                    limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
                                },1000*60*3)
                                await banSistemi(message, messageEmbed, client, JailLogKanal, messageLogEmbed, target, cezaID, seçilenSebep.label, args, Date.now()+ms(seçilenSebep.date), JailROL, data);
                                await client.toplama(cezalar,client.ayarlar.CEZA_PUAN_KANAL, target.id, cezaID, 15);
                            } else {
                                limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
                                setTimeout(() => {
                                    limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
                                },1000*60*3)
                                data.jailed = true, data.endDate = Date.now() + +ms(seçilenSebep.date), data.save();
                                await banSistemi(message, messageEmbed, client, JailLogKanal, messageLogEmbed, target, cezaID, seçilenSebep.label, args, Date.now()+ms(seçilenSebep.date), JailROL, data);
                                await client.toplama(cezalar,client.ayarlar.CEZA_PUAN_KANAL, target.id, cezaID, 15);
                                
                            }
                        })
        
console.log(seçilenSebep)
                    cl.deferUpdate()  
                } else {
                       return i.deferUpdate({components: [], embeds: [ new EmbedBuilder().setDescription(`${i.guild.emojiGöster(emojiler.no_cartel)} İşlem sırasında hata oluştu lütfen bot sahibine başvurun.`)]})
                   }
                 }
                if (cl.customId === `iptal`) {
                    msg.delete().catch(err => {})
                    return await i.editReply({components: [], embeds: [new EmbedBuilder().setDescription(`${i.guild.emojiGöster(emojiler.no_cartel)} ${cartelim} isimli üyenin cezalandırılma işlemi başarıyla iptal edildi.`)] , ephemeral: true});
                }
            });
            collector.on("end", async i => {
                msg.delete().catch(err => {})
            })
        
               
        })
             
                            
        } else return client.Embed(message.channel.id, "Lütfen Jail komudunun kurulumunu tamamlayınız `" + conf.prefix[0] + "vJail setup` yazarak kurunuz!")
}
exports.conf = {
    aliases: ["tempjail", "jail", "tjail", "Tempjail"]
}
exports.help = {
    name: 'TJail'
}
async function banSistemi(message, messageEmbed, client, JailLogKanal, messageLogEmbed, target, cezaID, reason, args, ms, JailROL, booster) {
    target.roles.set(target.roles.cache.get(booster) ? [JailROL, booster] : [JailROL]).then(async () => {
					if (target.voice.channel) {
				target.voice.setChannel(null);
			}
        message.channel.send({embeds: [messageEmbed]}).then(sentEmbed => {
            sentEmbed.react(client.emojis.cache.find(res => res.name === "wex_tik"))
    
        })
        client.channels.cache.get(JailLogKanal).send({embeds: [messageLogEmbed]});
            profil.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {JailAmount: 1}}, {upsert: true}).exec()
            await client.savePunishment();
    });
}
