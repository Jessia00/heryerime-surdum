const Discord = require('discord.js');
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently3 = new Set();
const conf = require("../../../settings")
const conf2 = require("../../../vkSettings")
const mongoose = require("mongoose")

const database = require("../../models/vkModel");

const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
        

  let GameInfo = await StartGame(message, client)
  if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

  let embed = new EmbedBuilder()
  .setDescription(`Vampir Köylü için yeni bir oyun \`#${GameInfo.game.GameID}\` ID'si ile başlatıldı. Roller dağıtılınca oyun başlayacaktır.`)
  return message.channel.send({embeds: [embed]})
  




}



/**
 * 
 * @param message Discord Message objesi, metin kanalı kontrolü. 
 * @param client Discord Client'i
 * @returns Oyun başlatma durumu.
 */
async function StartGame(message, client){
  let channel = conf2.GAME.Lobbies.find(el => el.TextChannel == message.channel.id)

  let gameCache = client.cache.GAME_CACHE
  if(gameCache.find(a => a.ServerID === message.guild.id && a.State === "on")){
      return {
          status: 201,
          message: "Bu lobi için devam eden bir oyun bulunmakta. Oyunu bitirip tekrardan başlatmayı deneyiniz."
      }
  }
  let Buffer = new database({
    _id: new mongoose.Types.ObjectId,
    Host: message.author.id,
    Roles: new Map([]),
    LiveMembers: [],
    DeadMembers: [],
    LobbyID: channel.TextChannel,
    VoiceID: channel.VoiceChannel,
    GameID: client.cache.GAME_CACHE.length + 1,
    ServerID: message.guild.id,
    State: "on",
    IGNState: "awaiting-players",
    Start: new Date(),
    End: new Date()
})

await Buffer.save()

client.cache.GAME_CACHE.push(Buffer)

return {
    status: 200,
    game: Buffer
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vk-başlat'],
  permLevel: 4
};

exports.help = {
  name: 'vk-başlat',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
