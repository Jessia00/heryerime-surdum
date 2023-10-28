const { Client, Message, EmbedBuilder } = Discord = require("discord.js");
const {AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const conf = client.ayarlar
let jailInterval = require("../../models/jailInterval");
let sunucuayar = require("../../models/sunucuayar");
let moment = require("moment")
moment.locale("tr");
let ms = require("ms");
const ceza = require("../../models/ceza");
const otologin = require("../../models/otokayit");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
	let data = await sunucuayar.findOne({guildID: message.guild.id});
	let jailRol = data.JAIL;
	let jaillog = data.JAILChannel
	let booster = data.BOOST

	let kayitsizUyeRol = data.UNREGISTER
	let tag = data.TAG;
	let tag2 = data.TAG2
	if (await client.permAyar(message.author.id, message.guild.id, "jail") || durum) {
		let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_cancel")} Geçerli bir **Üye Belirt** ve tekrar dene.`);
		if (!target.roles.cache.get(jailRol)) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_cancel")} Belirttiğin üye cezalıda değil.`)
		await target.roles.remove(jailRol)
		await target.roles.add(kayitsizUyeRol)
			message.channel.send(`Başarılı bir şekilde <@${target.id}> adlı kullanıcının jailini kaldırdınız.`)
				let messageLogEmbed = new Discord.EmbedBuilder().setFooter({ text: conf.footer })
				.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
                .setDescription(`${target} (**${target.id}**) üyesinin Jail cezası __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından kaldırıldı.`)     
                await client.channels.cache.get(jaillog).send({embeds: [messageLogEmbed]});
				await ceza.updateMany({ "userID": target.id, "Ceza": "JAIL" }, { Sebep: "AFFEDILDI", Bitis: Date.now() });
				await jailInterval.deleteOne({userID: target.id})
	} else return
}
exports.conf = {
	aliases: ["Unjail", "cezalıkaldır", "kaldırcezalı", "UNJAİL", "UNJAIL","af"]
}
exports.help = {
	name: 'unjail'
}