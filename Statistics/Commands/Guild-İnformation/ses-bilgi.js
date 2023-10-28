let moment = require("moment");
const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
            if (!message.guild) return;
            if (kanal) return;
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            if (!user) return client.yolla("Ses bilgisine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene!", message.author, message.channel)
            if (!user.voice.channel) return client.yolla("<@" + user.id + "> bir ses kanalına bağlı değil.", message.author, message.channel)
            let mic = user.voice.selfMute == true ? "Kapalı" : "Açık"
            let hop = user.voice.selfDeaf == true ? "Kapalı" : "Açık"
            let süresi = client.channelTime.get(user.id)
            let embed =  new EmbedBuilder()
            .setDescription(`${user} kişisi <#${user.voice.channel.id}> kanalında. **Mikrofonu: ${mic}, Kulaklığı: ${hop}**
${süresi ? `\`\`\`Aktif Bilgiler:\`\`\`
<#${user.voice.channel.id}> kanalına \`${moment.duration(Date.now() - süresi.time).format("H [saat,] m [dk,] s [saniye.]")}\` önce giriş yapmış.` : ""}`)
message.channel.send({embeds: [embed]})
}
exports.conf = {aliases: ["sesbilgi","nerede","n","nerde"]}
exports.help = {name: 'ses-bilgi'}
