'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const CartSchema = new mongoose.Schema({
    business_category_id: {
        type: mongoose.ObjectId,
        required:[true,'Business id is required'],
        ref: "business_category"
    },
    product_id:{
        type: mongoose.ObjectId,
        required:[true,'Product id is required'],
        ref: 'products'
    },
    inventory_id:{
        type: mongoose.ObjectId,
        required:[true,'Inventory id is required'],
        ref:"product_inventory"
    },
    user_id:{
        type: mongoose.ObjectId,
        required:[true,'User id is required'],
    },
    quantity: { 
        type:Number,
        default: 0 
    },
},{
    timestamps:true,
    toJSON:{virtuals:true,getters:true,setter:true},
    toObject:{virtuals:true,getters:true,setter:true}
});

CartSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
CartSchema.plugin(aggregatePaginate);

const Cart = mongoose.model('carts', CartSchema);
module.exports = Cart; 