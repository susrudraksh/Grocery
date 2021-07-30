'use strict';
const mongoConn =  require('../db');
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");


const NotificationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required'],
    },
    message:{
        type:String,
        required:[true,'message is required'],
    },
    user_id:{
        type: mongoose.ObjectId,
        required:[true,'User id is required'],
        sparse: true,
    },
    user_type:{type: Number, enum: [1, 2,3,4], default: 0 },
    sender_id:{
        type: mongoose.ObjectId,
       // required:[true,'Sender id is required'],
        sparse: true,
    },
    sender_type:{type: Number, enum: [1,2,3,4], default: null },
    read_status:{type: Number, enum: [1,0], default: 0 },
    order_id:{
        type: mongoose.ObjectId, ref: 'orders',
        sparse: true,
    },
    product_id:{
        type: mongoose.ObjectId, ref: 'products',
        sparse: true,
    },
    notification_type:{type: Number, enum: [1,2], default: 0 },
},{
    timestamps:true,
    toJSON:{virtuals:true,getters:true,setter:true},
    toObject:{virtuals:true,getters:true,setter:true}
});

NotificationSchema.plugin(uniqueValidator,{message:'Provided {PATH} is already exist.'});
NotificationSchema.plugin(aggregatePaginate);

const Notifications = mongoose.model('notifications', NotificationSchema);
module.exports = Notifications; 

