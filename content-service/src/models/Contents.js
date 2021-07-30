"use strict";
const mongoConn = require('../db');
const mongoose = require("mongoose");

// define schema
const ContentsSchema = new mongoose.Schema({
    option_key: String,
    option_value: mongoose.Mixed

}, {
    timestamps: true
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const Contents = mongoose.model('contents', ContentsSchema);
module.exports = Contents;