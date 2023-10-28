const { Schema, model } = require("mongoose");

const schema = Schema({
  userID: String,
  date: Number,
  parent: String,
  channel: String,


});

module.exports = model("voiceJoinedAt", schema);
