const { MessageEmbed             } = require("discord.js");
const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (!message.member.voice.channel) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Herhangi bir ses kanalına bağlı olman gerekli.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar belirt.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    if (!member.voice.channel) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye herhangi bir ses kanalına **bağlı değil**.`);
    if (message.member.voice.channel.id === member.voice.channel.id) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile zaten aynı ses kanalındasın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))

      const row = new ActionRowBuilder()
      .addComponents(
    
      new ButtonBuilder()
      .setCustomId("onay")
      .setLabel("Kabul Et")
      .setStyle(ButtonStyle.Success),    
      new ButtonBuilder()
      .setCustomId("red")
      .setLabel("Reddet")
      .setStyle(ButtonStyle.Danger)
      );
    
    
   
      
      const row3 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId("onayy")
        .setLabel("Kabul Et")
        .setStyle(ButtonStyle.Success)
        .setDisabled(true),
      new ButtonBuilder()
      .setCustomId("redd") 
      .setLabel("Reddet")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true),

      );
    
    
        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          member.voice.setChannel(message.member.voice.channel.id);
      
          message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`)] });
        } else {
    
          let wexcik = new EmbedBuilder()  
            .setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` odasına seni çekmek istiyor. Kabul ediyor musun?`)
            .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    
          let msg = await message.channel.send({ content: `${member}`, embeds: [wexcik], components: [row] })
    
          var filter = button => button.user.id === member.user.id;
    
          let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    
          collector.on("collect", async (button) => {
    
            if (button.customId === "onay") {
              await button.deferUpdate();
    
              member.voice.setChannel(message.member.voice.channel.id);
              msg.edit({ components: [row3] })
            }
    
            if (button.customId === "red") {
              await button.deferUpdate();
    
              const embedss = new EmbedBuilder()
                .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                .setTimestamp()
                .setDescription(`${message.author}, ${member} yanına taşıma işlemi iptal edildi.`)
              msg.edit({components: [row3] })
            }
    
          });
        }
          
        
          }
exports.conf = {aliases: ["cek", "Cek", "Çek"]}
exports.help = {name: 'çek'}
