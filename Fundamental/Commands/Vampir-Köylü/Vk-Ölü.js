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
        

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send("Bir üye etiketle ve tekrardan dene!") 

  let GameInfo = await kill(message, client, member)
  if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

  let embed = new EmbedBuilder()
  .setDescription(GameInfo.message)
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
/**
 * 
 * @returns Oyun bitirme kontrol noktası
 */
async function kill(message, client, member){

  let current = await GetCurrentGame(message, client)
  if(current == 404){
      return {
          status: 201,
          message: "Bu lobi için devam eden bir oyun bulunmamakta."
      }
  }

  if(!current.Roles.has(member.user.id)){
      return {
          status: 201,
          message: "Bu üye oyuna dahil değil. Üyeyi oyuna dahil etmek için `ekle` komutunu kullanın."
      }
  }

  if(current.IGNState !== "roles-given"){
      return {
          status: 201,
          message: "Bu oyunda henüz roller dağıtılmamış. Roller dağıtılmadan bu işlemi gerçekleştiremezsiniz."
      }
  }

  if(!current.LiveMembers.includes(member.user.id)){
      return {
          status: 201,
          message: "Bu oyuncu hayatta değil."
      }
  }

  current.LiveMembers.splice(current.LiveMembers.indexOf(member.user.id), 1)
  current.DeadMembers.push(member.user.id)
  await current.save()


  return {
      status: 200,
      message: `<@${member.user.id}> başarıyla öldürüldü!`,
      game: current
  }




}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vk-ölü'],
  permLevel: 4
};

exports.help = {
  name: 'vk-olu',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
