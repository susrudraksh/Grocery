'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');

const DealOfDaySchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Deal of day  name is required'],
        maxlength:50,
        trim:true
    },
    description:{
        type:String,
        required:[true,'Deal of day  description is required'],
        maxlength:200,
        trim:true
    },
    business_category_id:{
        type: mongoose.ObjectId, ref: 'business_category',
        required:[true,'Business category is required'],
        sparse: true,
        
    },
    category_id:{
        type: mongoose.ObjectId, ref: 'category',
        required:[true,'Category is required'],
        sparse: true,
    },
    sub_category_id:{
        type: mongoose.ObjectId, ref: 'category',
        required:[true,'Sub Category is required'],
        sparse: true,
    },
    product_id:{
        type: [{ type: mongoose.ObjectId, ref: 'products' }],
        default: null
    },
    image:{
        type:String,
        //required:[true,'Deal of day  image is required'],
        trim:true
    },
    statusactiveDate:{type:Date},
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
})

DealOfDaySchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
DealOfDaySchema.plugin(aggregatePaginate);

const DealOfDay = mongoose.model('deal_of_day', DealOfDaySchema);
module.exports = DealOfDay;