const {
    MessageEmbed
} = require("discord.js");
require("moment-timezone");
let Stat = require("../../models/stats");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, StringSelectMenuBuilder } = require("discord.js");
const { Interaction,  ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits, ChannelType } = require('discord.js')
module.exports.run = async (client, message, args, durum, kanal) => {
	if (durum) {
let embed = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
const row = new ActionRowBuilder()
.addComponents(
  new StringSelectMenuBuilder()
	.setCustomId('yardım')
	.setPlaceholder('Yardım kategorisini listeden seçin!')
	.addOptions([
	  {
label: 'Kullanıcı Komutları',
description: 'Kullanıcı Komutlar',
value: 'kullanıcıcommandss',
	  },
	  {
label: 'Yetkli Komutları',
description: 'Yetkili Komutlar',
value: 'yetkilikomutları',
	  },
	  {
label: 'Cezalandırma Komutları',
description: 'Cezalandırma Komutlar',
value: 'cezakomutlar',
	  },
	  {
label: 'Vampir-Köylü',
description: 'Vampir-Köylü Komutlar',
value: 'vkkomuts',
	  },
	  {
label: 'Kayıt Komutları',
description: 'Kayıt Komutlar',
value: 'rfegkomuts',
	  },
]),
);
let msg = await message.reply({ content: `
Sunucuda kullanıma açık komutlar aşağıda sıralanmıştır.`, components: [row] })
var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {

	if(menu.values[0] === "kullanıcıcommandss") {
await  menu.reply({ content:  `\`\`\`
- .afk (afk <Sebep (Opsiyonel)>)
- .avatar (avatar <USER>)
- .banner (banner <USER>)
- .link (link)
- .git (git [@üye])
- .bilgi (bilgi / [@üye])
- .snipe (snipe)
- .tag (tag)
- .çek (çek [@üye])
- .mutebilgi
- .invite (stat [user])
- .topdavet (topdavet)
- .stat (stat)\`\`\``, ephemeral: true})
}
if(menu.values[0] === "yetkilikomutları") {
	await  menu.reply({ content:  `\`\`\`
- .sesbilgi (sesbilgi)
- .taglı (taglı [user])
- .taglılarım (taglılarım / [@üye])
- .yetkililerim (yetkililerim / [@üye])
- .sicil (sicil [user])
- .say (say)
- .kes (kes [user])
- .cezapuan (cezapuan [user])
- .ystat (yetkili-stat)\`\`\``, ephemeral: true})
  }
  if(menu.values[0] === "cezakomutlar") {
	await  menu.reply({ content:  `\`\`\`
- .ban (ban [user] [reason])
- .jail (jail [user])
- .voice-mute (voice [user] [time] [reason])
- .mute (mute [user] [time] [reason])
- .unban (unban [userID])
- .uncezalı (unjail [user] / [userID])
- .unmute (unmute [user] / [userID])
- .yargı (yargı [user] [reason])
- .ban-bilgi (ban-bilgi [user])
- .ceza-bilgi (ceza-bilgi [user])
- .ceza (ceza [ID])
- .cezalar (cezalar [user])\`\`\``, ephemeral: true})
}
if(menu.values[0] === "vkkomuts") {
	await  menu.reply({ content:  `\`\`\`
- .vk-balat
- .vk-roller
- .vk-durum
- .vk-ölü
- .vk-canlandır\`\`\``, ephemeral: true})
  }
  if(menu.values[0] === "rfegkomuts") {  
await  menu.reply({ content:  `\`\`\`
- .[erkek,kayıt,kadın] (.kayıt [user] [İsim] [Yaş])
- .[isim] (.isim [user] [İsim] [Yaş])
- .[kayıtsız] (.kayıtsız [user)
- .[isimler] (.isimler [user)
- .[Teyitbilgi] (.Teyitbilgi)\`\`\``, ephemeral: true})
}
	  
})
	}
}
exports.conf = {
    aliases: ["help"]
}
exports.help = {
    name: 'yardım'
}