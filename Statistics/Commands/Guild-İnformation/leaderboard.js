const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const Stat = require("../../models/stats");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (kanal) return;

    
    /**
     * @param client
     * @param message
     * @param args
     */

    let data = await Stat.find({}, {messageXP: 0, _id: 0, __v: 0,ondort: 0,total: 0, yirmibir: 0, yirmisekiz: 0, otuzbes: 0, messageCategory: 0, voiceChannel: 0, voiceCategory: 0, messageChannel: 0});
    let statemoji = client.emojis.cache.find(x => x.name === "wex_circle");

    let göster = data.map(x => {
        return {
            Id: x.userID,
            mLevel: x.messageLevel,
            sLevel: x.voiceLevel,
            total: x.messageLevel+x.voiceLevel
        }
    }).sort((a, b) => b.total - a.total).map((user, index) => `${statemoji} <@${user.Id}> (\`Mesaj: ${user.mLevel} - Ses: ${user.sLevel}\`)`).splice(0,10)
    message.channel.send({embeds: [new Discord.EmbedBuilder().setThumbnail("https://cdn.discordapp.com/attachments/812041454754201621/813246369435353108/808633786945634314.gif").setDescription(`${göster.join("\n")}`)]})

}
exports.conf = {aliases: ["leveltop"]}
exports.help = {name: 'Leveltop'}
