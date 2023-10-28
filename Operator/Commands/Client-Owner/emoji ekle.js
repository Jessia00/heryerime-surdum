const Discord = require('discord.js');
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let Database = require("../../models/invite");
module.exports.run = async (client, message, args, durum, kanal) => {
  if (!client.ayarlar.sahip.includes(message.author.id)) return;
  let emoji = args[0];
  let emojiName = args[1];
  if (!emoji) return message.reply({ content: `Bir Emoji belirtmelisin.`})
  if (!emojiName) return message.reply({ content: `Emojiye isim seçmelisin.`})
 
  const parseCustomEmoji = Discord.parseEmoji(emoji);
  if (parseCustomEmoji.id) {
    const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
      parseCustomEmoji.animated ? 'gif' : 'png'
    }`;
    const createEmoji = await message.guild.emojis.create({ attachment: emojiLink, name: emojiName || parseCustomEmoji.name});
    message.reply({
      content: `${createEmoji} emojisi sunucuya eklendi.`,
    });
  } else {
   message.reply({
      content: ':x: Emoji bulunamadı.',
      ephemeral: true,
    });
  }
 
      
}
function EmojiYükle(link, ad, message) {
  message.guild.emojis.create(link, ad)
  .then(emoji => message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}).then(x => {
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)  
    setTimeout(() => {
          x.delete()

      }, 7500);
  }))

  .catch(console.error);
}
exports.conf = {aliases: ["emojiekle"]};
exports.help = {name: 'addemoji'};