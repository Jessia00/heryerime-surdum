const { Schema, model } = require("mongoose");

const schema = Schema({
    userId: { type: String, required: true },
    wantsToBeShipped: { type: Boolean, default: true }
});

module.exports = model('ShipSettings', schema);