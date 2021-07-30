'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const SettingSchema = mongoose.Schema({
    
    office_address:{
        type:String,
        trim:true
    },
    contact_us_email:{
        type:String,
        trim:true
    },
    admin_commission:{
        type:Number,
        trim:true
    },
},{
    timestamps:true,
    toJSON:{virtuals:true}
});

const Setting = mongoose.model('setting',SettingSchema);
module.exports = Setting;