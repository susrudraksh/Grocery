'use strict';

const mongoConn = require('../db');
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

const warehouseinventry = new mongoose.Schema({
    warehouse_id: {
        type: mongoose.ObjectId, ref: 'warehouse'
    },
    quantity: {
        type: Number,
    },
    hold_quantity: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true, setter: true },
    toObject: { virtuals: true, getters: true, setter: true }
});

const ratingSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.ObjectId, ref: 'orders'
    },
    product_id: {
        type: mongoose.ObjectId, ref: 'products'
    },
    user_id: {
        type: mongoose.ObjectId, ref: 'users'
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    status: { type: Number, enum: [2, 1, 0], default: 0 },
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true, setter: true },
    toObject: { virtuals: true, getters: true, setter: true }
});

const ProductInventrySchema = new mongoose.Schema({
    inventory_name: {
        type: String,
    },
    product_code: {
        type: String,
        required: [true, 'Product code is required'],
    },
    product_id: {
        type: mongoose.ObjectId, ref: 'products'
    },
    product_quantity: {
        type: Number,
        // required: [true, 'product quantity is required'],
    },
    hold_quantity: {
        type: Number,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    is_discount:{ type: Number, enum: [1, 0],  },
    discount_type: { type: Number, enum: [1, 2], default: 1 },
    discount_value: { type: Number },
    discounted_product_price: { type: Number },

    tax_type:{ type: Number, enum: [1, 2], default: 1 },
    hsn_code:{ type: String },
    inventory_product_code:{ type: String },
    tax_rate:{ type: Number },
    taxable_amount:{ type: Number },
    gst_amount:{ type: Number },
    cgst_rate:{ type: Number },
    cgst_amount:{ type: Number },
    sgst_rate:{ type: Number },
    sgst_amount:{ type: Number },
    igst_rate:{ type: Number },
    igst_amount:{ type: Number },
    min_inventory:{ type:Number,default: 0 },
    sku_code: { type: String },
    sku_name: { type: String },
    batch: { type: String },
    last_notification_time:{type:String},
    notify_me: [new mongoose.Schema({
        user_id: {
            type: mongoose.ObjectId, ref: 'users'
        },
    }, {
        timestamps: true,
        toJSON: { virtuals: true, getters: true, setter: true },
        toObject: { virtuals: true, getters: true, setter: true }

    })],
    warehouseinventry: [warehouseinventry],
    ratings: [ratingSchema],
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});


ProductInventrySchema.plugin(uniqueValidator, { message: 'Provided {PATH} is already exist.' });
ProductInventrySchema.plugin(aggregatePaginate);

const ProductInventry = mongoose.model('product_inventory', ProductInventrySchema);
module.exports = ProductInventry;