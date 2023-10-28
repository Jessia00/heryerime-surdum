const {Collection} = require('discord.js');
const sunucuayar = require("../models/sunucuayar")
const messageUser = require("../models/weeklymessage");
const voiceUser = require("../models/weeklyvoice");
const { CronJob } = require("cron");
/**
 * @param { Client } ready
 */
const { joinVoiceChannel } = require("@discordjs/voice");
module.exports = async client => {
  let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
  const sunucu = client.guilds.cache.get(client.ayarlar.sunucuId);

  const daily = new CronJob("0 0 * * *", () => {
    sunucu.members.cache.forEach(async (member) => {
      await messageUser.updateMany({ guildID: sunucu.id, userID: member.user.id }, { $set: { dailyStat: 0 } });
      await voiceUser.updateMany({ guildID: sunucu.id, userID: member.user.id }, { $set: { dailyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("0 0 * * 0", () => {
    sunucu.members.cache.forEach(async (member) => {
      await messageUser.updateMany({ guildID: sunucu.id, userID: member.user.id }, { $set: { weeklyStat: 0 } });
      await voiceUser.updateMany({ guildID: sunucu.id, userID: member.user.id }, { $set: { weeklyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul");
  weekly.start();
  

};