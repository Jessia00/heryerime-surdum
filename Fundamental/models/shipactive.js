const { Schema, model } = require("mongoose");

const schema = Schema({
	userId: String,
    cift: String,
    channelID: String,
    timestamp: Date,
    isMessageSent: {
        type: Boolean,
        default: false
    }
});

module.exports = model("shipactive", schema);
 
