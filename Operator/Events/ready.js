const {Collection} = require('discord.js');
const sunucuayar = require("../models/sunucuayar")
/**
 * @param { Client } ready
 */
const { joinVoiceChannel } = require("@discordjs/voice");
module.exports = async client => {
  let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
  if (!data) console.log("Sunucu ayarları başarıyla yüklendi! artık kurulum yapabilirsiniz!"),await sunucuayar.updateOne({}, {guildID: client.ayarlar.sunucuId}, {upsert: true, setDefaultsOnInsert: true}).exec();
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


     const guild = client.guilds.cache.get(client.ayarlar.sunucuId)
  guild.invites.fetch().then((guildInvites) => {
    const cacheInvites = new Collection();
    guildInvites.map((inv) => {
      cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
    });
    client.invites.set(guild.id, cacheInvites);
  });
  

};