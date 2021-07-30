'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/products";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const ProductCustomizeSchema =  new mongoose.Schema({
    
    product_inventry_id:{
        type: mongoose.ObjectId, ref: 'product_inventory'
    },
    product_id:{
        type: mongoose.ObjectId, ref: 'products'
    },
    customization_type:{
        type: mongoose.ObjectId, ref: 'customization_type'
    },
    customization_value: { 
        type: mongoose.ObjectId, ref: 'customization_type'
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}

});



ProductCustomizeSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
ProductCustomizeSchema.plugin(aggregatePaginate);

const ProductCustomize = mongoose.model('product_customization', ProductCustomizeSchema);
module.exports = ProductCustomize;