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
    const One = new ButtonBuilder().setLabel("Ceza Bilgi").setCustomId("one").setStyle(ButtonStyle.Danger).setEmoji("1032704131841921105")
    const Two = new ButtonBuilder().setLabel("Level/Xp").setCustomId("two").setStyle(ButtonStyle.Secondary).setEmoji("1028345164755910738")
    const Three = new ButtonBuilder().setLabel("Bilgilerin").setCustomId("three").setStyle(ButtonStyle.Secondary).setEmoji("1028353947943051374")
    const Four = new ButtonBuilder().setLabel("Yetkili Başvurusu").setCustomId("ybasvuru").setStyle(ButtonStyle.Secondary).setEmoji("1028350952769605713")
    const Five = new ButtonBuilder().setLabel("Verilerim").setCustomId("five").setStyle(ButtonStyle.Secondary).setEmoji("1028353656665415700")
    const row = new ActionRowBuilder()
    .addComponents([One , Two , Three , Four , Five])


    let msg = await message.channel.send({ content:  `
**${message.guild.name}** Sunucusunda Kullanacağınız Kategorinin Butonununa Basarak İşleminizi Gerçekleştirebilirsiniz
 

${client.emojis.cache.find(x => x.name === "wex_circle")} \` 1 \` *Yetkililerimiz Tarafından Size Uygulanan Ceza-i İşlemleri Gösterir.*
${client.emojis.cache.find(x => x.name === "wex_circle")} \` 2 \` *Kazandığın Level/Xp Puanını Öğrenirsin.*
${client.emojis.cache.find(x => x.name === "wex_circle")} \` 3 \` *Detaylı Sunucu İçindeki Bilgilerini Gösterir.*
${client.emojis.cache.find(x => x.name === "wex_circle")} \` 4 \` *Yetkili Başvurusu yapmanı sağlar.*
${client.emojis.cache.find(x => x.name === "wex_circle")} \` 5 \` *Sunucu verilerini İncelersin.*
`, components: [row] });

  }
exports.conf = {aliases: []};
exports.help = {name: 'yardımpanel'};