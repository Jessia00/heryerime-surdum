let sunucuayar = require("../../models/sunucuayar");
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
let vmuteInterval = require("../../models/vmuteInterval");
let muteInterval = require("../../models/muteInterval");
let moment = require("moment")
moment.locale("tr");
let ms = require("ms");
const ceza = require("../../models/ceza");


module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let data = await sunucuayar.findOne({});
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return message.reply("Geçerli bir üye belirt");
    let cezalar = await ceza.find({userID: target.id});
    if (cezalar.length == 0) {cezalar = [{Puan: 0}, {Puan: 0}];};
    let mutelog = data.MUTEChannel
    let vmutelog = data.VMUTEChannel

   

    const button =  new ButtonBuilder()
    .setCustomId('uncmute')
    .setLabel('UnChatMute')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("1144989536456294542")
    .setDisabled(true)
    const button2 = new ButtonBuilder()
    .setCustomId('unvmute')
    .setLabel('UnVoiceMute')
    .setEmoji("1013585230600343672")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    const rowButton = new ActionRowBuilder().addComponents(button, button2)
    let kontrolcmute = await muteInterval.find({userID: target.id});
    let kontrolvmute = await vmuteInterval.find({userID: target.id}); 
  
    kontrolcmute.forEach(async memberData => {
        let mission = memberData.muted;
            if (mission == true) {
                button.setDisabled(false)
            }})                
            kontrolvmute.forEach(async memberData => {
                let mission = memberData.muted;
                    if (mission == true) {
                        button2.setDisabled(false)
                    }})                
        
                    vmuteInterval.find({userID: target.id}, async (err,res) => {
                        res = res.reverse();
                        let sesveri = res.map((x, index) => `Üyenin Voice-Mute cezasının bitmesine \`${moment(x.endDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kalmış kaldırmak için butonu kullan.`).slice(0,1) 
                      
                        muteInterval.find({userID: target.id}, async (err,res) => {
                          res = res.reverse();
                          let chatveri = res.map((x, index) => `Üyenin Chat-Mute cezasının bitmesine \`${moment(x.endDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kalmış kaldırmak için butonu kullan.`).slice(0,1) 
                    
              
const embed2 = new Discord.EmbedBuilder().setFooter({ text: "60 Saniye içerisinde karar vermelisin 60 saniye sonunda butonlar de-aktif olmaktadır." }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
.setDescription(`${target} (**${target.id}**) adlı üyenin kaldırmak istediğin ceza-i işlemini butonları kullanarak belirt.

${chatveri.join(", \n") || "Üyenin Ses-Mute cezası olmadığı için buton De-Aktiftir."}

${sesveri.join(", \n") || "Üyenin Ses-Mute cezası olmadığı için buton De-Aktiftir."}
`)
let msg = await message.channel.send({ components: [rowButton], embeds: [embed2] })
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 1000 * 60  })
collector.on("collect", async (button) => {
        if (button.customId === "uncmute") {
            const cmuteembed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }).setDescription(`${target} (**${target.id}**) adlı üyenin Chat-Mute cezasını başarılı bir şekilde kaldırdın.`)
            let muteRol = data.MUTED;
            let server = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.MUTEAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return; 
                        if (!target.roles.cache.get(muteRol)) return message.reply("Etiketlediğiniz kullanıcı zaten mutesiz ?");
                await muteInterval.deleteOne({userID: target.id}).exec();
                rowButton.components[0].setDisabled(true) 
                rowButton.components[1].setDisabled(true) 
                await target.roles.remove(muteRol).then(async (user) => { await button.update({components: [rowButton], embeds: [cmuteembed]});
                let messageLogEmbed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
                .setDescription(`${target} (**${target.id}**) üyesinin Chat-Mute cezası __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından kaldırıldı.`)     
                await client.channels.cache.get(mutelog).send({embeds: [messageLogEmbed]});
       
            });
        };
        if (button.customId === "unvmute") {
            let muteRol = data.VMUTED;
            let server2 = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server2.EnAltYetkiliRol) && !server2.VMUTEAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server2.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
                const vmuteembed = new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) }).setDescription(`${target} (**${target.id}**) adlı üyenin Voice-Mute cezasını başarılı bir şekilde kaldırdın.`)
                rowButton.components[0].setDisabled(true) 
                rowButton.components[1].setDisabled(true) 
                button.update({components: [rowButton], embeds: [vmuteembed]})
                await target.roles.remove(muteRol).catch(() => {});
                await vmuteInterval.deleteOne({userID: target.id}).exec();
                await target.voice.setMute(false).catch(() => {});
                let messageLogEmbed =  new Discord.EmbedBuilder().setFooter({ text: conf.footer }).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
                .setDescription(`${target} (**${target.id}**) üyesinin Voice-Mute cezası __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından kaldırıldı.`)     
                await client.channels.cache.get(vmutelog).send({embeds: [messageLogEmbed]});


        };
    })
    collector.on("end", async (button) => {
        rowButton.components[0].setDisabled(true) 
        rowButton.components[1].setDisabled(true) 
        msg.edit({ components: [rowButton] }); 
    })
    
})

    })
                        
}
exports.conf = {aliases: ["unmute","unsesmute", "sesmute-kaldır", "unvoicemute", "voicemutekaldır", "unsmute"]}
exports.help = {name: 'unvmute'}
