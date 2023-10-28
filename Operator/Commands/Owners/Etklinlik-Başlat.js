const {
    MessageEmbed
} = require("discord.js");
require("moment-timezone");
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
let uyarıData = require("../../models/uyarı");
let puansystem = require("../../models/puansystem");
let taglıData = require("../../models/taglıUye");
let ozelKomut = require("../../models/özelkomut");
let missionSystem = require("../../models/randomMission");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
	if (durum) {
		let sec = args[0];
		if (sec == "başlat") {
		await sunucuayar.updateOne({guildID: message.guild.id},{$set: {Etkinlik: true}}, {upsert: true}).exec();
		message.reply("Etklinlik Başladı, Ek Puanlı puanlama sistemime geçiş yapıldı.")
		}
		if (sec == "bitir") {
		await sunucuayar.updateOne({guildID: message.guild.id},{$set: {Etkinlik: false}}, {upsert: true}).exec();
		message.reply("Etkinlik Bitti, Eski puanlama sistemine geri dönüldü.")
		}
	}
}
exports.conf = {
    aliases: ["Etkinlik"]
}
exports.help = {
    name: 'etkinlik'
}