"use strict";

const mongoose = require("mongoose");

// define schema
const SettingsSchema = new mongoose.Schema({
    option_key: String,
    option_value: mongoose.Mixed

}, {
    timestamps: true
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const Settings = mongoose.model('settings', SettingsSchema);
module.exports = Settings;