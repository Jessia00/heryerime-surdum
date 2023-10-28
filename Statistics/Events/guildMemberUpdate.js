const roller = require("../models/rollog")
let StaffXP = require("../models/stafxp");
let randMiss = require("../models/randomMission");
let sunucuayar = require("../models/sunucuayar");
let muteInterval = require("../models/muteInterval");
const {MessageEmbed, Collection,MessageAttachment} = require("discord.js");
const hanedan = require("../models/hanedanlik");
const Seens = require("../models/seens")
var moment = require('moment-timezone');

const {
    join
} = require("path");
const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
module.exports = async (oldMember, newMember) => {
	await newMember?.guild.fetchAuditLogs({
	  type: AuditLogEvent.MemberRoleUpdate
	}).then(async (audit) => {
	  let ayar = audit.entries.first()
	  let hedef = ayar.target
	  let yapan = ayar.executor
	  if (yapan.bot) return
	  newMember.roles.cache.forEach(async role => {
		if (!oldMember.roles.cache.has(role.id)) {
		  const emed = new EmbedBuilder()
			.setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
			 
			.setDescription(`**Rol Eklenen kişi**\n ${hedef} - **${hedef.id}** `)
			.addFields(
			  { name: `Rolü Ekleyen Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
			  { name: `Eklenen Rol`, value: `${role} - **${role.id}**`, inline: false }
			)
			.setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
			.setTimestamp()
		  roller.findOne({
			user: hedef.id
		  }, async (err, res) => {
			if (!res) {
			  let arr = []
			  arr.push({
				rol: role.id,
				mod: yapan.id,
				user: hedef.id,
				tarih: moment(Date.now()).format("LLL"),
				state: "Ekleme"
			  })
			  let newData = new roller({
				user: hedef.id,
				roller: arr
			  })
			  newData.save().catch(e => console.log(e))
			} else {
			  res.roller.push({
				rol: role.id,
				mod: yapan.id,
				user: hedef.id,
				tarih: moment(Date.now()).format("LLL"),
				state: "Ekleme"
			  })
			  res.save().catch(e => console.log(e))
			}
		  })
		}
	  });
	  oldMember.roles.cache.forEach(async role => {
		if (!newMember.roles.cache.has(role.id)) {
		  const emeed = new EmbedBuilder()
		  .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
		   
			.setDescription(`Kişinin alınan ve eklenen tüm rollerine bakmak için \`!rollog @ozi\` komutunu kullanın \n**Rolü Alınan kişi** \n${hedef} - **${hedef.id}**`)
			.addFields(
			  { name: `Rolü Alan Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
			  { name: `Alınan Rol`, value: `${role} - **${role.id}**`, inline: false }
			)
			.setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
			.setTimestamp()
		  roller.findOne({
			user: hedef.id
		  }, async (err, res) => {
			if (!res) {
			  let arr = []
			  arr.push({
				rol: role.id,
				mod: yapan.id,
				user: hedef.id,
				tarih: moment(Date.now()).format("LLL"),
				state: "Kaldırma"
			  })
			  let newData = new roller({
				user: hedef.id,
				roller: arr
			  })
			  newData.save().catch(e => console.log(e))
			} else {
			  res.roller.push({
				rol: role.id,
				mod: yapan.id,
				user: hedef.id,
				tarih: moment(Date.now()).format("LLL"),
				state: "Kaldırma"
			  })
			  res.save().catch(e => console.log(e))
			}
		  })
		}
	  });
	})
  }
  