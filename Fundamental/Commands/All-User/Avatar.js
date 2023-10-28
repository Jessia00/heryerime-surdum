const { ComponentType, SlashCommandBuilder, hyperlink, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, IntegrationApplication } = require("discord.js");
const axios = require('axios');
module.exports.run = async (client, message, args, durum, kanal) => {
        if (!message.guild) return;
        if(kanal) return;
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('banner')
            .setPlaceholder('Bannerını görüntülemek için tıklayınız!')
            .addOptions([
                {
                    label: 'Banner',
                    description: 'Bannerını görüntülemek için tıklayınız ama sapıklık yapma!',
                    value: 'banner',
                }
            ]),
        );
      let üye = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
      
      async function bannerXd(user, client) {
        const response = await axios.get(`https://discord.com/api/v10/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
        if(!response.data.banner) return message.reply("Kullanıcının banneri bulunamadı.")
        if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
        else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
      
      }
      
      let msg = await message.channel.send({ content: `${üye.displayAvatarURL({ dynamic: true, size: 4096 })}`, components: [row] })
      var filter = (menu) => menu.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
      
      collector.on("collect", async (menu) => {
          if(menu.values[0] === "banner") {
              let banner = await bannerXd(üye.id, client)
              menu.reply({content: `${banner}`, ephemeral: true })
                }
      })
      },
    
    exports.conf = {aliases: ["Avatar", "pp"]}
    exports.help = {name: 'avatar'}
    