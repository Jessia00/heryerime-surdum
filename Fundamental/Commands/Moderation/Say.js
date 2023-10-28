const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js");
        const conf = client.ayarlar;
        let mongoose = require("mongoose");
        let sunucuayar = require("../../models/sunucuayar");
        module.exports.run = async (client, message, args, durum, kanal) => {
        if (!message.guild) return;
        
        let server = await sunucuayar.findOne({guildID: message.guild.id});  
        if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
        let data = await sunucuayar.findOne({});
        let sunucuTAG = data.TAG;
        let TaglıKullanıcı = await message.guild.members.cache.filter(member => member.user.username.includes(sunucuTAG)).size;
        var takviye = message.guild.premiumSubscriptionCount
        var takviyesayı = message.guild.premiumTier
        var TotalMember = message.guild.memberCount
        let role = message.guild.roles.cache.get(data.BOOST)
        let sayı = role.members.size
    
        var AktifMember = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size
        var sesli = message.guild.members.cache.filter((x) => x.voice.channel).size
        let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
        let Embed =  new Discord.EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() }).setThumbnail(message.guild.iconURL({ dynamic: true }))
            message.reply({ embeds: [Embed.setDescription(`
    \` ❯ \` Sunucumuz da **${TotalMember}** üye bulunmakta.
    \` ❯ \` Sunucumuz da **${AktifMember}** aktif üye bulunmakta.
    \` ❯ \` Sunucumuzu boostlayan **${sayı}** (\`${takviyesayı} Lvl.\`) üye bulunmakta.
    \` ❯ \` Ses kanallarında **${sesli + bot}** üye bulunmakta.`)] });
        
        }
        exports.conf = {
        aliases: ["sunucusay", "serversay", "Say"]
        };
        exports.help = {
        name: 'say'
        };
     