const Discord = require('discord.js');
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

  if(GameInfo.Host !== message.author.id)  return message.channel.send(`Rol dağıtımını bir tek oyunu başlatan kullanıcı yapabilir. `)
  if(GameInfo.IGNState !== "awaiting-players")  return message.channel.send(`Rol dağıtımı en fazla bir defa yapılabilir.`)

  let regex = /[1-9]{1,2}[A-ZİŞĞÜÖÇÎÔÛÂÊa-zışğüöçâêîôû]+/

  let FalseRegex = args.filter(arg => regex.test(arg) == false)

  if(FalseRegex.length > 0){
      return message.channel.send(`Rol dağıtımı uygun formatta kullanılmadı. Formata uymayan argümanlar:\n\n${FalseRegex.map(el => `• ${el}`).join("\n")}\n\nÖrnek Kullanım: **.roller 5Büyücü 6Vampir 3Köylü**`)
  }

  let TotalRoleCount = args.map(x => parseInt(x)).reduce((a,b) => a+b)
  let VoiceChannel = await client.channels.cache.get(GameInfo.VoiceID)


  await message.guild.members.fetch()

  let VoiceMembers = VoiceChannel.members.filter(a => a.user.id !== GameInfo.Host && !a.user.bot)

  if((VoiceMembers.size) != TotalRoleCount ){
      return message.channel.send(`Komut kullanımında toplamda **${TotalRoleCount}** adet rol belirttiniz fakat <#${VoiceChannel.id}> kanalında **${VoiceMembers.size}** oyuncu bulunmakta. Ses kanalındaki oyuncu sayısına eşit sayıda rol belirtin ve tekrardan deneyin.`)
  }

  let RoleArray = []
  let RoleMap = new Map([])

  args.map(arg => {
      let roleCount = parseInt(arg)
      if(roleCount > 0 && roleCount < 100){
          for(let i = 0; i < roleCount; i++){
              RoleArray.push(`${arg.slice(`${roleCount}`.length)}`)
          }
      }
  })

  VoiceMembers = VoiceMembers.map(u => u.user.id)

  GameInfo.LiveMembers = VoiceMembers
  GameInfo.IGNState = "roles-given"

  RoleArray = RoleArray
  .map(el => ({
      num: Math.random(),
      element: el
  }))
  .sort((a,b) => b.num - a.num)
  
  RoleArray.map(role => {
      RoleMap.set(VoiceMembers[RoleArray.indexOf(role)], role.element)
  })


  .map(el => ({
      num: Math.random(),
      element: el
  }))
  .sort((a,b) => b.num - a.num).map(x => x.el)

  GameInfo.Roles = RoleMap

  await GameInfo.save()
  await updateGame(client, GameInfo)

  let embed = new EmbedBuilder()
  .setDescription(`\`#${GameInfo.GameID}\` ID'li oyun için ${TotalRoleCount} adet rol üyelere dağıtılmakta. Dağıtılan Roller:\n\n${args.map(arg => `• ${parseInt(arg)} adet **${arg.slice(`${parseInt(arg)}`.length)}**`).join("\n")}\n\n:warning: **Kullanıcılara ve size rollerini DM yoluyla ileteceğim, DM'i sunucuya kapalı olan kullanıcılar rol bilgisini alamayacaktır.**`)
  await message.channel.send({embeds: [embed]})
  
  let AllUserRoles = [...GameInfo.Roles].map(([user, role]) => ({ user, role }))

  await message.author.send(`\`#${GameInfo.GameID}\` ID'li oyunun kullanıcı rolleri:\n${AllUserRoles.map(role => `<@${role.user}> (\`${message.guild.members.cache.get(role.user).displayName}\`): ${role.role}`).join("\n")}`)
  
  return Promise.all(AllUserRoles.map(async(role) => {
      await message.guild.members.cache.get(role.user).send(`\`#${GameInfo.GameID}\` ID'li oyun için rolünüz: **${role.role}**`).catch(e => e)
  }))






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
  aliases: ['vk-roller'],
  permLevel: 4
};

exports.help = {
  name: 'vk-roller',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
