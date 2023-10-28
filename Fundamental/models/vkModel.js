
const mongoose = require("mongoose")

const VKModel = mongoose.Schema({

_id: mongoose.Schema.Types.ObjectId,
Host: String,
Roles: Map,
LiveMembers: Array,
DeadMembers: Array,
LobbyID: String,
VoiceID: String,
GameID: Number,
ServerID: String,
State: String,
IGNState: String,
Start: Date,
End: Date,

})

module.exports = mongoose.model("VampirKoylu", VKModel)