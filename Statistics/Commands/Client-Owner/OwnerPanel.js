const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
    message.channel.send({ data: { 
"content": `${client.emojis.cache.find(x => x.name === "wex_bit")} **Selamlar ${message.guild.name} Kurucuları Ben wex;** 

${client.emojis.cache.find(x => x.name === "wex_info")} \`YETKİLERİ KAPAT\` *Sunucu içerisinde herhangi işlevin açık olduğu rollerin yetkisini kapatır.*
${client.emojis.cache.find(x => x.name === "wex_info")} \`YETKİLERİ AÇ\` *Sunucu içerisinde kapattıgınız yetkilerin yetki işlevlerini geri açar.*
${client.emojis.cache.find(x => x.name === "wex_info")} \`TÜM BANLARI KALDIR\` *Sunucu içerisinde genel ban affı getirir ve tüm yasaklamaları kaldırır.*
${client.emojis.cache.find(x => x.name === "wex_info")} \`TÜM SİCİLLERİ TEMİZLE\` *Sunucu içerisindeki Tüm ceza-i sicil işlemlerini sıfırlar.*
${client.emojis.cache.find(x => x.name === "wex_info")} \`TÜM STATLARI TEMİZLE\` *Sunucu içerisindeki Tüm Ses, Mesaj yani stat verilerini sıfırlar.*


${client.emojis.cache.find(x => x.name === "wex_giris")} Butonlarla Yapılan Bir Hata Geri Çevrilmez İzinsiz Oynamayın. @here`,
  "components": [
    {
"type": 1,
"components": [
    {
"type": 2,
"style": 2,
"custom_id": "bir",
"label": "Yetkileri Kapat!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "iki",
"label": "Yetkileri Aç!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "üç",
"label": "Sunucu Ban Affı!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "dört",
"label": "Sunucu Ceza Affı!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "beş",
"label": "Sunucu Stat Reset!",
    },
]
    }
  ],
  }
  })

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['panel-owner'],
  permLevel: 4
};

exports.help = {
  name: 'owner-panel',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
