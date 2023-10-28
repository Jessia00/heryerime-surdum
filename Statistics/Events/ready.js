const moment = require('moment');
let {MessageEmbed} = require('discord.js');
require("moment-duration-format");
let sunucuayar = require("../models/sunucuayar");
const client = global.client;
let conf = client.ayarlar
const { EmbedBuilder, ActivityType } = require("discord.js")

module.exports = async client => {
  try {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  
    const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

    const connection = getVoiceConnection(client.ayarlar.guildID);
    if (connection) return;
    setInterval(async () => { 
    const VoiceChannel = client.channels.cache.get(client.ayarlar.botSesID);
    if (VoiceChannel) { joinVoiceChannel({
      channelId: VoiceChannel.id,
      guildId: VoiceChannel.guild.id,
      adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
      selfDeaf: true
    })}},
    5000);
  
    let activities = client.ayarlar.readyFooter, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/wex"}), 10000);
       } catch (err) { }
  

setInterval(async() => {
  let alarmModel = require("../models/alarm.js");
  let alarmlar = await alarmModel.find({ bitis: { $lte: Date.now() } });
  for (let alarm of alarmlar) {
    let uye = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(alarm.uye);
    if (!uye) continue;
    let embed = new MessageEmbed().setColor("RANDOM").setDescription(alarm.aciklama).setTimestamp();
    uye.send(`**${uye} sana hatırlatmamı istediğin şeyin vakti geldi!**`, { embed: embed }).catch(err => {return undefined});
    let kanal = client.channels.cache.get(alarm.kanal);
    if (kanal) kanal.send(`**${uye} sana hatırlatmamı istediğin şeyin vakti geldi!**`, { embed: embed });
    await alarm.remove();
  };
}, 10000);

};