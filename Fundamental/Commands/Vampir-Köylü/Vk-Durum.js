const moment = require("moment-timezone")
const Discord = require("discord.js")
let sunucuayar = require("../../models/sunucuayar");
const talkedRecently3 = new Set();
const conf = require("../../../settings")
const conf2 = require("../../../vkSettings")
const mongoose = require("mongoose")

const database = require("../../models/vkModel");

const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
exports.run = async function(client, message, args) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
        

  let GameInfo = await GetCurrentGame(message, client)
  if(GameInfo == 404) return message.channel.send(`Vampir Köylü için başlatılmış bir oyun bulunamadı. \`.başlat\` komutu ile bir oyun başlatınız. `)

  let seperator = "─────────────────────"
  let States = new Map([
      ["awaiting-players","Oyuncular bekleniyor"],
      ["roles-given","Gece"],
      ["gece","Gece"],
      ["sabah","Sabah"],
  ])

  let embed = new EmbedBuilder()
  .setDescription(` **#${GameInfo.GameID}** ID li oyun için durum bilgisi:
  ${seperator}
  • Oyun Yöneticisi: <@${GameInfo.Host}>
  • Oyun Durumu: ${States.get(GameInfo.IGNState) || GameInfo.IGNState}
  • Başlatılma: ${moment(GameInfo.Start).format('Do MMMM HH:mm:ss')}
  • Oyuncu Sayısı: ${GameInfo.Roles.size}

  • Hayattaki Oyuncular: (${GameInfo.LiveMembers.length})
  ${GameInfo.LiveMembers.map(x => `:small_orange_diamond: <@${x}>`).join("\n")}
  
  • Ölü Oyuncular: (${GameInfo.DeadMembers.length})
  ${GameInfo.DeadMembers.map(x => `:small_orange_diamond: <@${x}>`).join("\n")}
  `)

  return message.channel.send({embeds: [embed]})

  






}
/**
 * 
 * @param message Discord Message objesi, metin kanalı kontrolü. 
 * @param client Discord Client'i
 * @returns Devam eden oyun durumu.
 */
async function GetCurrentGame(message, client){

  let gameCache = client.cache.GAME_CACHE
  let CurrentGame = gameCache.find(a => a.ServerID === message.guild.id && a.State === "on")
  if(!CurrentGame) return 404
  return CurrentGame
}


async function updateGame(client, game){
  let CurrentGame = client.cache.GAME_CACHE.find(a => a.GameID === game.GameID)
  client.cache.GAME_CACHE.splice(client.cache.GAME_CACHE.indexOf(CurrentGame), 1)
  client.cache.GAME_CACHE.push(game)

}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vk-durum'],
  permLevel: 4
};

exports.help = {
  name: 'vk-durum',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
