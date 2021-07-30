'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');

const DeliverySettingsSchema =  new mongoose.Schema({
    min_distance:{
        type:Number,
        required:[true,'Min distance is required']
    },
    max_distance:{
        type:Number,
        required:[true,'Max distance is required']
    },
    delivery_fees:{
        type:Number,
        required:[true,'Delivery fees is required']
    },
    max_normal_delivery_time:{
        type:Number,
    },
    max_special_order_delivery_time:{
        type: Number
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
})

DeliverySettingsSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
DeliverySettingsSchema.plugin(aggregatePaginate);

const DeliverySettings = mongoose.model('delivery_settings', DeliverySettingsSchema);
module.exports = DeliverySettings;