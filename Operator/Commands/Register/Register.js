const conf = client.ayarlar
const moment = require("moment")
let teyit = require("../../models/teyit");
let sunucuayar = require("../../models/sunucuayar");
let otokayit = require("../../models/otokayit");
const randMiss = require("../../models/randomMission")
const xpData = require("../../models/stafxp")
let puansystem = require("../../models/puansystem");
let limit = new Map();
const Stat = require("../../models/stats");
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = Discord = require("discord.js");
const { Client, Message } = Discord = require("discord.js");
let sure = new Map();
const ms = require("ms");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    let erkekRol = data.MAN;
    let kadinRol = data.WOMAN;
    let unRegisterRol = data.UNREGISTER;
    let registerChannel = data.REGISTERChannel;
    let tag = data.TAG;
    let tag2 = data.TAG2;
    let kayitSorumlusu = data.REGISTERAuthorized;
    let ekipRol = data.TEAM;
    let supheliRol = data.SUPHELI;
    let chatKANAL = data.CHAT;
    let boost = data.BOOST
    if (!message.guild.roles.cache.get(erkekRol[0]) &&
        !message.guild.roles.cache.get(kadinRol[0]) &&
        !message.guild.roles.cache.get(unRegisterRol[0]) &&
        !message.guild.roles.cache.get(kayitSorumlusu[0]) &&
        !client.channels.cache.get(registerChannel) &&
        !tag && !tag2) return message.reply(`Lütfen kurulum sistemini tamamen bitiriniz \`${conf.prefix[0]}setup help\``);
        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.member.roles.cache.some(e => kayitSorumlusu.some(x => x == e)) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

        let kntrl = limit.get(message.author.id)
        let sre = sure.get(message.author.id)
        if (kntrl >= 5 && sre > Date.now() && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.roles.cache.some(rol => data.MUTEAuthorized.includes(rol.id))) {
message.channel.send("Kısa sürede 5 den fazla kayıt yaptığınız için yetkileriniz çekildi.")
            return message.member.roles.remove(user.roles.cache.filter(rol => message.guild.roles.cache.get(data.TEAM).position <= rol.position && !rol.managed))
        }
        if (!sre) {
            sure.set(message.author.id, Date.now()+ms("30s"))
        }
        
        limit.set(message.author.id, (limit.get(message.author.id) || 0) +1)
        setTimeout(() => {
            limit.delete(message.author.id)
            sure.delete(message.author.id)
        }, ms("30s"));
    
        if (!target) return message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Üye belirtilmedi\` .e/k @wex/id wex 20`);
        unreg = unRegisterRol;
        if (!args[1]) return message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`İsim belirtilmedi\` .e/k @wex/id wex 20`);

        let name = args[1][0].toUpperCase() + args[1].substring(1);
        let age = Number(args[2]);
        if (!age) message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Yaş belirtilmedi\` .e/k @wex/id wex 20`);
        if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`);
        
        if (target.roles.cache.some(rol => erkekRol.includes(rol.id))) return message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Hatalı İşlem.\` Belirttiğin üye zaten sunucumuzda kayıtlı.`);
        if (target.roles.cache.some(rol => kadinRol.includes(rol.id))) return message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Hatalı İşlem.\` Belirttiğin üye zaten sunucumuzda kayıtlı.`);
        await message.guild.members.cache.get(target.id).setNickname(`${name} | ${age}`);
        
        const Erkek = new ButtonBuilder().setLabel("Erkek").setCustomId("erkek").setStyle(ButtonStyle.Primary)
        const Kadın = new ButtonBuilder().setLabel("Kadın").setCustomId("kadin").setStyle(ButtonStyle.Danger)
    
        const row = new ActionRowBuilder()
        .addComponents([Erkek, Kadın])
       
        let embed2 = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription(`${target} Kişisinin İsmi " ${name} | ${age} " Olarak Değiştirildi.`);
        let msg = await message.channel.send({ embeds: [embed2], components: [row] });
        var filter = (button) => button.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on("collect", async (button) => {
            if(button.customId === "erkek") {
                let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription(`${target} Kişisinin İsmi ${name} | ${age} Olarak Değiştirildi.\n\n**ERKEK** olarak kayıt edildi.`);
                row.components[0].setDisabled(true) 
                row.components[1].setDisabled(true) 
                button.update({components: [row], embeds: [embed]})

                target.user.username.includes(tag) ? erkekRol.push(ekipRol) : erkekRol = erkekRol;

                await target.roles.remove(data.UNREGISTER).then(async x => {
                    await target.roles.set(target.roles.cache.has(boost) ? [boost, ...erkekRol] : [...erkekRol])
                    let roles = ["1141003906080583750", "1141003904881000660"]
                    await target.roles.add(roles)
                    
                    await message.guild.members.cache.get(target.id).setNickname(`${name} | ${age}`);
                    
                    if (target.roles.cache.some(rol => kadinRol.some(rol2 => rol.id == rol2))) {
                        kadinRol.forEach(async (res, i) => {
                            setTimeout(async () => {
                                await target.roles.remove(res)
                            }, i * 1000);
                        })
                    };
     
                    teyit.findOne({userID: target.id}, (err, res) => {
                    
                    
                        if(!res) {
                            new teyit({userID: target.id, nicknames: [{isimler: `${name} | ${age}`,rol: `Erkek`, execID: message.author.id, date: Date.now()}]}).save()
                            } else {
                                res.nicknames.push({isimler: `${name} | ${age}`,rol: `Erkek`, execID: message.author.id, date: Date.now()})
                                res.save()}})

                    let isimler = await teyit.findOne({
                        userID: target.id
                    });            
                 
                    client.channels.cache.get(chatKANAL).send(client.ayarlar.chatMesajı.replace("-member-", target)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

                    client.dailyMission(message.author.id, "teyit", 1, 3)
                    client.easyMission(message.author.id, "teyit", 1)
                    Stat.updateMany({
                        userID: message.author.id,
                        guildID: client.ayarlar.sunucuId
                      }, {
                        $inc: {
                          "yedi.Register": 1,
                          "Man": 1,
                          ["coin"]: 0.6666666666666666
                        }
                      }, {
                        upsert: true
                      }).exec((err, res) => {
                        if (err) console.error(err);
                      });
                  
                    let gorev = await randMiss.findOne({userID: message.author.id }) 
                    if(!gorev) return;
                    if(gorev.Mission.MISSION == "teyit" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
                        let embed2 =  new Discord.EmbedBuilder().setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setDescription(`${message.author} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK V (TEYİT GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)
                    client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed2]})
                    xpData.updateOne({userID: message.author.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
                    randMiss.updateOne({userID: message.author.id}, {$set: { Active: false }}, {upsert: true}).exec()
                    }
                })

    
            }
            if(button.customId === "kadin") {
                let embed = 
                new Discord.EmbedBuilder().setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription(`${target} Kişisinin İsmi ${name} | ${age} Olarak Değiştirildi.\n\n**KADIN** olarak kayıt edildi.`);
                row.components[0].setDisabled(true) 
                row.components[1].setDisabled(true) 
                button.update({components: [row], embeds: [embed]})    
                target.user.username.includes(tag) ? kadinRol.push(ekipRol) : kadinRol = kadinRol;
                await target.roles.remove(unRegisterRol).then(async x => {
                    await target.roles.set(target.roles.cache.has(boost) ? [boost, ...kadinRol] : [...kadinRol])
                    let roles = ["1141003906080583750", "1141003904881000660"]
                    await target.roles.add(roles)
                    await message.guild.members.cache.get(target.id).setNickname(`${name} | ${age}`);
                    
                    if (target.roles.cache.some(rol => erkekRol.some(rol2 => rol.id == rol2))) {
                        await erkekRol.forEach(async (res, i) => {
                            setTimeout(async () => {
                                await target.roles.remove(res)
                            }, i * 1000);
                        })
                    };
                    teyit.findOne({userID: target.id}, (err, res) => {
                    
                    
                        if(!res) {
                            new teyit({userID: target.id, nicknames: [{isimler: `${name} | ${age}`,rol: `Kadın`, execID: message.author.id, date: Date.now()}]}).save()
                            } else {
                                res.nicknames.push({isimler: `${name} | ${age}`,rol: `Kadın`, execID: message.author.id, date: Date.now()})
                                res.save()}})
                    
    

                    client.channels.cache.get(chatKANAL).send(client.ayarlar.chatMesajı.replace("-member-", target)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
                    client.dailyMission(message.author.id, "teyit", 1)
                    client.easyMission(message.author.id, "teyit", 1)
                    let gorev = await randMiss.findOne({userID: message.author.id }) 
                    if(!gorev) return;
                    if(gorev.Mission.MISSION == "teyit" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
                       let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})                    
                        .setDescription(`${message.author} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK V (TEYİT GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)
                    client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed]})
                    xpData.updateOne({userID: message.author.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
                    randMiss.updateOne({userID: message.author.id}, {$set: { Active: false }}, {upsert: true}).exec()
                }
                     
                    Stat.updateMany({
                        userID: message.author.id,
                        guildID: client.ayarlar.sunucuId
                      }, {
                        $inc: {
                          "yedi.Register": 1,
                          "Kadin": 1,
                          ["coin"]: 0.6666666666666666
                        }
                      }, {
                        upsert: true
                      }).exec((err, res) => {
                        if (err) console.error(err);
                      });
                    
                })
     

            }
        })    
    }}
        exports.conf = {
            aliases: ["kayit", "erkek", "e", "k", "kadın", "kadin"]
        }
        exports.help = {
            name: 'res'
        }  