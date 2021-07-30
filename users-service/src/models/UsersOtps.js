"use strict";

const mongoConn = require("../db");
const mongoose = require("mongoose");

// define schema
const UsersOtpsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: [true, "User id must be provided."]
    },
    country_code: {
        type: String,
        trim: true,
        default: null
    },
    phone: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null,
    },
    otp_number: {
        type: Number
    },
    otp_for: {
        type: String,
        enum: ["register", "forgot_password","email_verify",'phone_verify'],
    },
    user_role: {
        type: Number,
        enum: [1,2,3,4],
    },

}, {
    timestamps: true
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const UsersOtps = mongoose.model('users_otps', UsersOtpsSchema);
module.exports = UsersOtps;

