const mongoose = require('mongoose');

const inviterSchema = mongoose.Schema({
  guildID: String, 
  userID: String, 
  roles: Array
});
module.exports = mongoose.model("Invites", inviterSchema);

