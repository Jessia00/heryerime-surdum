let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let authoritySchema = Schema({
    Name: String,
    Roles: Array,
    Text: String,
    Secret: String,
    Date: Date,
    Author: String,
})

module.exports = mongoose.model("menü", authoritySchema)