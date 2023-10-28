const Discord = require('discord.js');
let sunucuayar = require("../../models/sunucuayar");
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
    message.channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_bit")} Selamlar **${message.guild.name}** Üyesi\nEğerki Üzerine \` Unregister \` Permi Verilmediyse Bu Butona Tıklamalısın!`,"components":[{"type":1,"components":[

      {"type":2,"style":1,"custom_id":"rolsüzüm","label":"Rolsüzüm"},
      
      ]}] })
}

client.on('interactionCreate', async interaction => {
  const member = interaction.user;
  let server = await sunucuayar.findOne({guildID: interaction.guild.id});
    if(interaction.customId === "rolsüzüm")
    {

      if(!interaction.guild.members.cache.get(member.id).roles.cache.has(server.UNREGISTER)){
          await interaction.guild.members.cache.get(member.id).roles.add(server.UNREGISTER)
          await interaction.reply({ content: `${member.toString()}, kayıtsız rolün başarılı bir şekilde verildi.`, ephemeral: true });
      }
    }
        
    
})



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolsüzüm'],
  permLevel: 4
};

exports.help = {
  name: 'rolsüzümknk',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
