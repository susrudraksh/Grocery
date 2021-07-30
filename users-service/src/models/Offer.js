'use strict';

const mongoConn = require('../db');
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');

const OfferSchema = new mongoose.Schema({
    offer_type: {
        type: String,
        required: [true, 'Offer Type is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: 50,
        trim: true
    },
    coupon_code: {
        type: String,
        maxlength: 15,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: 200,
        trim: true
    },
    business_category_id: {
        type: mongoose.ObjectId, ref: 'business_category',
        //type: String,
        sparse: true,
    },
    category_id: {
        type: mongoose.ObjectId, ref: 'category',
        // type: String,
        sparse: true,
    },
    sub_category_id: {
        type: mongoose.ObjectId, ref: 'category',
        // type: String,
        sparse: true,
    },
    product_id: {
        type: [{ type: mongoose.ObjectId, ref: 'products' }],
        default: null
    },
    card_type: {
        type: String,
    },
    bank_type: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    offer_amount_type: {
        type: Number,
    },
    offer_price: {
        type: Number,
    },
    offer_amount: {
        type: Number,
    },
    offer_max_amount: {
        type: Number,
    },
    offer_product: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    offer_quantity: {
        type: Number,
    },
    image_path: {
        type: String,
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

OfferSchema.plugin(uniqueValidator, { message: 'Provided {PATH} is already exist.' });
OfferSchema.plugin(aggregatePaginate);

const Offer = mongoose.model('offer', OfferSchema);
module.exports = Offer;