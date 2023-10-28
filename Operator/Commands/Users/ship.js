const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let Database = require("../../models/invite");
const Canvas = require('canvas')
const { ButtonStyle, SlashCommandBuilder, IntegrationApplication, AttachmentBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ShipSettings = require("../../models/shipSettings");
const settings = require("../../../settings");
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
let cooldown = new Map()
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if(!message.channel.name.includes("ship")) return message.reply(`Sadece ${message.guild.channels.cache.filter(x => x.name.includes("ship")).map(x => x).join(", ")} kanallarında kullanabilirsiniz.`).then(x => {
        setTimeout(() => {x.delete()}, 5000)
        })
        let server = await sunucuayar.findOne({guildID: message.guild.id});  

    if(cooldown.get(message.member.id)) return message.reply({content: `Bu komutu **5** saniyede bir kullanabilirsiniz.`}).then(x => setTimeout(() => {
        x.delete().catch(err => {})
    }, 7500));
    let person = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!person || message.author.id === person.id) {
        person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !server.UNREGISTER.some(x => m.roles.cache.get(x))) 
       .random();
       if(server.MAN.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !server.UNREGISTER.some(x => m.roles.cache.get(x)) && server.WOMAN.some(x => m.roles.cache.get(x))) 
       .random();
       if(server.WOMAN.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !server.UNREGISTER.some(x => m.roles.cache.get(x)) && server.MAN.some(x => m.roles.cache.get(x))) 
       .random();
       
    }

    person = message.guild.members.cache.get(person.id)
    let özel = [
        "719117042904727635"
    ]
 
    if(özel.includes(person.id)) return message.reply({content: `Tabi Efendim Ship Atarsın.`}).then(x => {
        message.delete().catch(err => {})
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 5000)
    });
    
    let replies = [
        '5',     '3',
        '10',    '14',
        '17',    '20',
        '22',    '25',
        '24',    '27',
        '32',    '36',
        '34',    '39',
        '42',    '45',
        '47',    '51',
        '54',    '56',
        '59',    '58',
        '60', '63',
        '65', '64',
        '68',  '70',
        '74',  '78',
        '79',  '80',
        '83',  '86',
        '84',  '89',
        '91',  '93',
        '95',  '97',
        '98',  '99',
        '100', 'Evlenmeye mahkumsunuz.'
    ]
    
    let emoti = Math.floor((Math.random()*replies.length))
    let love = replies[emoti]
    let emoticon;
    if(emoti <= 44 && emoti >= 23) {
       emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
    } else if(emoti < 23 && emoti >= 12) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
    } else if(emoti < 11) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
    }

    canvas = Canvas.createCanvas(384, 128);
    const ctx = canvas.getContext('2d');
    const emotes = await Canvas.loadImage(emoticon);
    const avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ extension: "jpg"  }));
    const avatar2 = await Canvas.loadImage(person.displayAvatarURL({ extension: "jpg"  }));
    ctx.beginPath();
    ctx.moveTo(0 + Number(10), 0);
    ctx.lineTo(0 + 384 - Number(10), 0);
    ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
    ctx.lineTo(0 + 384, 0 + 128 - Number(10));
    ctx.quadraticCurveTo(
    0 + 384,
    0 + 128,
    0 + 384 - Number(10),
    0 + 128
    );
    ctx.lineTo(0 + Number(10), 0 + 128);
    ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
    ctx.lineTo(0, 0 + Number(10));
    ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 384, 128);
    let background = await Canvas.loadImage(client.guilds.cache.get(settings.sunucuId).bannerURL({dynamic: true, extension: "jpg" }) ? client.guilds.cache.get(settings.sunucuId).bannerURL({dynamic: true, extension: "jpg" }) + `?size=4096` : "https://cdn.discordapp.com/attachments/1019290688136958028/1023941333716566046/thumb-1920-1146731.jpg");
    ctx.drawImage(background, 0, 0, 384, 129);
    ctx.beginPath();
    ctx.globalAlpha = 0.5
    ctx.fillStyle = "#000000";
    
    //ctx.fillRect(50, 30, 980, 350);
    
    ctx.fillStyle = "#000000";
ctx.globalAlpha = 0.5;
ctx.fillRect(55, 5, 275, 115);
ctx.globalAlpha = 1;
    
    ctx.drawImage(avatar1, 70, 12, 100, 100);
    ctx.drawImage(avatar2, 215, 12, 100, 100);
    ctx.drawImage(emotes, 150, 20, 75, 75);

  let Row = new ActionRowBuilder().addComponents(
new ButtonBuilder ()
.setCustomId("amkramali")
.setLabel("Tanış")
.setStyle(ButtonStyle.Primary),


  )
  let attach = new AttachmentBuilder(canvas.toBuffer(), {name: "img.png"});
  let embed = new Discord.EmbedBuilder()
  .setFooter({ text: conf.footer })
  embed.setImage("attachment://img.png")
  embed.setAuthor({ name: person.displayName, iconURL: person.user.displayAvatarURL({ dynamic: true }) })
embed.setDescription(`${person} ile sevgi durumun **%${love}**`)
    message.reply({components: [Row], content:
        null, embeds: [embed], files: [attach]}).then(async (msg) => {
var filter = (i) => i.user.id == message.member.id
let collector = msg.createMessageComponentCollector({filter: filter, max: 1})
collector.on('collect', async (i) => {
    if(i.customId == "amkramali") {
        i.reply({content: `Şuanlık **Tanışma Sistemi** Devre-dışı olduğundan dolayı sadece **DM** üzerinden iletişime geçebilirsin.`, ephemeral: true})
       
    }
})
});
    cooldown.set(message.author.id, true)
    setTimeout(() => {
        if(cooldown.get(message.member.id)) cooldown.delete(message.author.id)
    }, 5000);
    


}
exports.conf = {aliases: ["ship"]}
exports.help = {name: 'aşkölcer'}