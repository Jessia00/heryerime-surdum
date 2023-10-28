const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  let guild = message.guild;
  if (!client.ayarlar.sahip.some(x => x === message.author.id)) return
	if(args[0] === "kur" || args[0] === "kurulum") {
    
    const emojis = [
      { name: "wex_vmute", url: "https://cdn.discordapp.com/attachments/811975658963992647/812894209706950656/sesmuteat.png" },
      { name: "wex_mute", url: "https://cdn.discordapp.com/attachments/811975658963992647/812894244632788992/muteat.png" },
      { name: "wex_unmute", url: "https://cdn.discordapp.com/attachments/811975658963992647/812894234242973716/muteac.png" },
      { name: "wex_tik", url: "https://cdn.discordapp.com/emojis/1014542762915414099.gif?size=96&quality=lossless" },
      { name: "wex_succes", url: "https://cdn.discordapp.com/emojis/995761582984400936.png?v=1" },
      { name: "wex_carpi", url: "https://cdn.discordapp.com/emojis/1014542755722186863.gif?size=96&quality=lossless" },
      { name: "wex_cancel", url: "https://cdn.discordapp.com/emojis/995761605210026094.png?v=1" },
      { name: "wex_baslangicbar", url: "https://cdn.discordapp.com/emojis/1001111610221395988.png?v=1" },
      { name: "wex_bitisbar", url: "https://cdn.discordapp.com/emojis/1001111608367521852.png?v=1" },
      { name: "wex_ortabar", url: "https://cdn.discordapp.com/emojis/1001111605351825408.png?v=1" },
      { name: "wex_imaj", url: "https://cdn.discordapp.com/emojis/991357112083021964.gif?v=1" },
      { name: "wex_ban", url: "https://cdn.discordapp.com/emojis/946070076271001670.png?v=1" },
      { name: "wex_jail", url: "https://cdn.discordapp.com/emojis/939679320551616543.png?v=1" },
      { name: "wex_afk", url: "https://cdn.discordapp.com/emojis/776764964009672704.png?v=1" },
      { name: "wex_info", url: "https://cdn.discordapp.com/emojis/1028355470622216272.webp?size=96&quality=lossless" },
      { name: "wex_cikis", url: "https://cdn.discordapp.com/emojis/1023617059973767279.webp?size=96&quality=lossless" },
      { name: "wex_giris", url: "https://cdn.discordapp.com/emojis/1023581888390119585.webp?size=96&quality=lossless" },
      { name: "wex_security", url: "https://cdn.discordapp.com/emojis/921047804883918858.gif?size=96&quality=lossless" },

    ]
    emojis.forEach(async (x) => {
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
      const emoji = await message.guild.emojis.create({ attachment: x.url, name: x.name });
      message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

    })

  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojis'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'emoji',
    description: "Sunucuda komut denemeye yarar",
    usage: 'eval <kod>',
    kategori: "Bot Yapımcısı"
  };
  