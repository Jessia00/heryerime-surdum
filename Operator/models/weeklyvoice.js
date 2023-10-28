const { Schema, model } = require("mongoose");

const şema = Schema({
	guildID: String,
	userID: String,
    channelID: String,
	channelData: { type: Number, default: 0 },
    parenId: String,
	topStat: { type: Number, default: 0 },
	dailyStat: { type: Number, default: 0 },
	weeklyStat: { type: Number, default: 0 },
});

module.exports = model("voiceUser", şema);