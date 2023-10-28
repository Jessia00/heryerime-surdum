
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { PermissionsBitField, ChannelType } = require("discord.js");

const moment = require("moment");
const conf = require("../../settings");
require("moment-duration-format")
moment.locale("tr")
const client = global.client;
const CategoryChannels = require("../models/CategoryChannels");
const TextChannels = require("../models/TextChannels");
const VoiceChannels = require("../models/VoiceChannels");
const RoleModel = require("../models/Role");
const Bots = require("../../ShieldBackups")
module.exports = async (channel) => {
  let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
  if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  await client.cezaVer(client, entry.executor.id, "kick");
  const tdata = await TextChannels.findOne({ channelID: channel.id });
  const vdata = await VoiceChannels.findOne({ channelID: channel.id });
  const cdata = await CategoryChannels.findOne({ channelID: channel.id });
  let newChannel;
if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
  const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setDescription(`
\`•\` Uygulanan İşlem: **Channel_Delete**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, Kanal Oluşturulup izinleri entegre ediliyor..**
`)
  channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });  
if (!channel.id) return;
if (!tdata) return;
newChannel = await channel.guild.channels.create( { name:channel.name, 
type: channel.type,
topic: channel.topic,
nsfw: channel.nsfw,
parent: channel.parent,
rateLimitPerUser: channel.rateLimitPerUser,
position: tdata.position,
});
newChannel.setPosition(tdata.position)
await TextChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === ChannelType.GuildVoice) {
if (!channel.id) return;
if (!vdata) return;
newChannel = await channel.guild.channels.create({ name: channel.name,
type: channel.type,
bitrate: channel.bitrate,
userLimit: channel.userLimit,
parent: channel.parent,
position: vdata.position
});
newChannel.setPosition(vdata.position)
await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === ChannelType.GuildCategory) {
  const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  
  .setDescription(`
  \`•\` Uygulanan İşlem: **Category_Delete**
  \`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
  \`•\` İşlem Detayı: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
  \`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, Kategori Oluşturulup kanallar entegre ediliyor..**
  `)
channel.guild.channels.cache.find(x => x.name == "shield-log").send({ embeds: [Embed2] });

if (!channel.id) return;
 if (!cdata) return;
    const newChannel2 = await channel.guild.channels.create({ name: cdata.name, 
      type: ChannelType.GuildCategory,
      position: cdata.position,
    });
    newChannel2.setPosition(cdata.position)
    const textChannels = await TextChannels.find({ parentID: channel.id });
    await TextChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
    textChannels.forEach(c => {
      const textChannel = channel.guild.channels.cache.get(c.channelID);
      if (textChannel) textChannel.setParent(newChannel2, { lockPermissions: false });
    });
    const voiceChannels = await VoiceChannels.find({ parentID: channel.id });
    await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
    voiceChannels.forEach(c => {
      const voiceChannel = channel.guild.channels.cache.get(c.channelID);
      if (voiceChannel) voiceChannel.setParent(newChannel2, { lockPermissions: false });
    });
    const newOverwrite = [];
    for (let index = 0; index < cdata.overwrites.length; index++) {
      const veri = cdata.overwrites[index];
      newOverwrite.push({
        id: veri.id,
        allow: new PermissionsBitField(veri.allow).toArray(),
        deny: new PermissionsBitField(veri.deny).toArray()
      });
    }
    await newChannel2.permissionOverwrites.set(newOverwrite);
    await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel2.id });

return };

channel.permissionOverwrites.cache.forEach(perm => {
let thisPermOverwrites = {};
perm.allow.toArray().forEach(p => {
  thisPermOverwrites[p] = true;
});
perm.deny.toArray().forEach(p => {
  thisPermOverwrites[p] = false;
});
newChannel.permissionOverwrites.create(perm.id, thisPermOverwrites);
});

     
};