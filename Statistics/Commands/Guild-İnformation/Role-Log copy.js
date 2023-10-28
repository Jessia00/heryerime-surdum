const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
require("moment-timezone");
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
const Discord = require("discord.js")
const roller = require("../../models/rollog")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.REGISTERAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Veri = await roller.findOne({ user: Member.id });
        if (!Veri) return message.channel.send("<@" + Member.id + "> kişisinin rol bilgisi veritabanında bulunmadı.", message.author, message.channel)
        let page = 1;
        let rol = Veri.roller.sort((a, b) => b.tarih - a.tarih)
       // let liste = rol.map(x => `${x.state == "Ekleme" ? this.client.ok : this.client.no} Rol: <@&${x.rol}> Yetkili: <@${x.mod}>\nTarih: ${moment(x.tarih).format("LLL")}`)
       let liste = rol.map(x => `\`[${x.tarih}, ${x.state}]\` <@${x.mod}>: <@&${x.rol}>`)
       const cancık = new EmbedBuilder().setDescription(`
${Member} kişisinin toplam da verilmiş-alınmış ${Veri.roller.length} rollere ait bilgisi bulunmakta, rollerin bilgileri aşağıda belirttim.
${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL({ dynamic: true }), url: `https://discord.com/users/${Member.id}` }) 
const onceki = new ButtonBuilder()
.setCustomId("ÖncekiSayfa")
.setStyle(ButtonStyle.Secondary)
.setEmoji("995761593122037892") 

const ileri = new ButtonBuilder()
.setCustomId("SonrakiSayfa")
.setStyle(ButtonStyle.Secondary)
.setEmoji("992492306752081941") 

const kapat = new ButtonBuilder()
.setCustomId("CANCEL")
.setStyle(ButtonStyle.Secondary)
.setEmoji("995761605210026094") 
const row = new ActionRowBuilder()
.addComponents([onceki, ileri, kapat])
   
       var msg = await message.channel.send({ embeds: [cancık]})
       var filter = (button) => button.user.id === message.author.id;
       const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

if (liste.length > 10) {

    msg.edit({components: [row]})
    collector.on('collect', async (button) => {
        if (button.customId === "SonrakiSayfa") {
            if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
            msg.edit({ components: [row] }); 
       
            page += 1;
            let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
            msg.edit({ embeds: [new EmbedBuilder().setDescription(`
${Member} kişisinin toplam da verilmiş-alınmış ${Veri.roller.length} rollere ait bilgisi bulunmakta, rollerin bilgileri aşağıda belirttim.
            
${rollogVeri}`).setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL({ dynamic: true }), url: `https://discord.com/users/${Member.id}` })]})
   
button.deferUpdate();

} else if (button.customId === "ÖncekiSayfa") {

        if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
        page -= 1;
        let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
        msg.edit({ embeds: [new EmbedBuilder().setDescription(`${Member} kişisinin toplam da verilmiş-alınmış ${Veri.roller.length} rollere ait bilgisi bulunmakta, rollerin bilgileri aşağıda belirttim.
        
${rollogVeri}`).setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL({ dynamic: true }), url: `https://discord.com/users/${Member.id}` })]})

button.deferUpdate();

    } else if (button.customId === "CANCEL") {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] }); 
        button.reply("İşlem iptal edildi.")

    }
})

collector.on("end", async (button) => {
    row.components[0].setDisabled(true) 
    row.components[1].setDisabled(true) 
    row.components[2].setDisabled(true) 
    msg.edit({ components: [row] }); 
})
}
}
exports.conf = {aliases: ["role-log","roleslog","rlog"]}
exports.help = {name: 'rollog'}


