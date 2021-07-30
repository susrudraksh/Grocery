'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const RedeemPointSchema = mongoose.Schema({
    
    user_id: {
        type: mongoose.ObjectId,
        ref: "users",
        required:true,
      },
    earned_points:{
        type:Number,
        required:true,
        default: 0
    },
    redeem_points:{
        type:Number,
        required:true,
        default: 0
    },
    expiration_date:{type:Date},
},{
    timestamps:true,
    toJSON:{virtuals:true}
});


RedeemPointSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
RedeemPointSchema.plugin(mongoosePaginate);
RedeemPointSchema.plugin(aggregatePaginate);

const RedeemPoint = mongoose.model('redeem_points',RedeemPointSchema);
module.exports = RedeemPoint;