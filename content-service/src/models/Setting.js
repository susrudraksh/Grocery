'use strict';

const mongoConn = require('../db');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const SettingSchema = mongoose.Schema({

    office_address: {
        type: String,
        trim: true
    },
    contact_us_email: {
        type: String,
        trim: true
    },
    vat: {
        type: Number,
        trim: true
    },
    premium_order_amount: {
        type: Number,
        trim: true
    },
    premium_start_delivery_time: {
        type: String,
        trim: true
    },
    premium_end_delivery_time: {
        type: String,
        trim: true
    },
    normal_order_amount: {
        type: Number,
        trim: true
    },
    normal_start_delivery_time: {
        type: String,
        trim: true
    },
    normal_end_delivery_time: {
        type: String,
        trim: true
    },
    total_sale: {
        type: Number,
        trim: true
    },
    reward_points: {
        type: Number,
        trim: true
    },
    expiration_time: {
        type: Number,
        trim: true
    },
    pan_number: {
        type: String,
        trim: true
    },
    gst_number: {
        type: String,
        trim: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

const Setting = mongoose.model('setting', SettingSchema);
module.exports = Setting;