const mongoose = require("mongoose");

const alarm = mongoose.Schema({
	guildId: String,
	private_voices: {
		mode: { type: Boolean, default: false },
		categoryId: String,
		channelId: String,
		textId: String,
	}
});


module.exports = mongoose.model("scroom", alarm);