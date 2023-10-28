  const { MessageEmbed, Discord } = require("discord.js");
  const conf = client.ayarlar
  const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
  let mongoose = require("mongoose");
  let sunucuayar = require("../../models/sunucuayar");
  const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
  let Database = require("../../models/invite");
  module.exports.run = async (client, message, args, durum, kanal) => {
      if (!message.guild) return;
      if (!client.ayarlar.sahip.includes(message.author.id)) return;

const Görev1 = new ButtonBuilder().setLabel("I (Ses Görevi)").setCustomId("taskOne").setStyle(ButtonStyle.Secondary)
const Görev2 = new ButtonBuilder().setLabel("II (Mesaj Görevi)").setCustomId("taskTwo").setStyle(ButtonStyle.Secondary)
const Görev3 = new ButtonBuilder().setLabel("III (Davet Görevi)").setCustomId("taskTheree").setStyle(ButtonStyle.Secondary)
const Görev4 = new ButtonBuilder().setLabel("IV (Taglı Görevi)").setCustomId("taskFour").setStyle(ButtonStyle.Secondary).setDisabled(true)
const Görev5 = new ButtonBuilder().setLabel("V (Teyit Görevi)").setCustomId("taskFive").setStyle(ButtonStyle.Secondary)

const row = new ActionRowBuilder()
.addComponents([Görev1, Görev2, Görev3, Görev4, Görev5])

      let embed2 = new EmbedBuilder().setDescription(`
  ${client.emojis.cache.find(x => x.name === "wex_bit")} Merhaba Görev Seçme Kanalına Hoşgeldin

  ${client.emojis.cache.find(x => x.name === "wex_info")} __**Seçebileceğiniz Görevler**__

  ${client.emojis.cache.find(x => x.name === "wex_circle")} \` I (Ses Görevi) \`Sunucu ses kanallarında saat kasma görevidir. Bu görevde ses kanallarında belirtilen saat ses kasmanız gerekli.

  ${client.emojis.cache.find(x => x.name === "wex_circle")} \` II (Mesaj Görevi) \`Mesaj görevi sadece Genel-Chat kanalında atılan mesajlar içindir. Spam,flood veya kurallara aykırı atılan mesajlar için yaptırım uygulanabilir.

  ${client.emojis.cache.find(x => x.name === "wex_circle")} \` III (Davet Görevi) \`Sunucumuza üye davet etme görevidir. Davet ettiğiniz üyelerin yan hesap olmaması gerekmektedir.

  ${client.emojis.cache.find(x => x.name === "wex_circle")} (**DEVRE DIŞI**)\` VI (Taglı Çekme Görevi) \`Sunucumuza taglı çekme görevidir. Çektiğiniz taglıların yan hesap olmaması gerekmektedir. Çektiğiniz taglıları "**.taglı @etiket**" veya "**.taglı ID**" komutu ile takımınıza almanız gerekir. Yan hesap tespiti halinde yaptırım uygulanabilir.

  ${client.emojis.cache.find(x => x.name === "wex_circle")} \` V (Teyit Görevi) \`Sunucumuzda kayıt yapma görevidir.Sunucumuzdaki kayıtsız üyeleri ses teyit alarak sunucumuza kaydetmelisiniz.
  
 \`\`\`-• Örneğin; Ses I görevinde belirli bir süre ses kasman gerekli.\n-•Yetkini arttırmak istiyosan görevlerden birisini seçebilirsin.\n\`\`\``);
      let msg = await message.channel.send({ embeds: [embed2], components: [row] });

    }
  exports.conf = {aliases: []};
  exports.help = {name: 'görev'};
 