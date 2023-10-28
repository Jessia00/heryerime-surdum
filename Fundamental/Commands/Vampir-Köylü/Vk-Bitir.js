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
        

  let GameInfo = await endGame(message, client)
  if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

  let embed = new EmbedBuilder()
  .setDescription(`Vampir Köylü oyunu \`#${GameInfo.game.GameID}\` bitirildi. ${GameInfo.message}`)
return message.channel.send({embeds: [embed]})
  









}
async function GetCurrentGame(message, client){

  let gameCache = client.cache.GAME_CACHE
  let CurrentGame = gameCache.find(a => a.ServerID === message.guild.id && a.State === "on")
  if(!CurrentGame) return 404
  return CurrentGame
}

/**
 * 
 * @returns Oyun bitirme kontrol noktası
 */
async function endGame(message, client){

  let current = await GetCurrentGame(message, client)
  if(current == 404){
      return {
          status: 201,
          message: "Bu lobi için devam eden bir oyun bulunmamakta."
      }
  }

  current.State = "off"
  current.IGNState = "game-ended"
  await current.save()

  let returntext = "Oyun Rolleri:\n\n"
  for(let [k,v] of current.Roles){returntext += `🔸 <@${k}> (${v})\n`}
  return {
      status: 200,
      message: returntext,
      game: current
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vk-bitir'],
  permLevel: 4
};

exports.help = {
  name: 'vk-end',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
