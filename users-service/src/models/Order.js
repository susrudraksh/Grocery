'use strict';

const mongoConn = require('../db');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const OrderSchema = new mongoose.Schema({
    order_id: { type: Number },
    delivery_address: {
        type: mongoose.ObjectId,
        required: [true, 'Delivery address is required'],
    },
    products: [
        {
            business_category_id: {
                type: mongoose.ObjectId,
                required: [true, 'Business id is required'],
                ref: "business_category"
            },
            product_id: {
                type: mongoose.ObjectId,
                required: [true, 'Product id is required'],
                ref: "products"
            },
            inventory_id: {
                type: mongoose.ObjectId,
                required: [true, 'Inventory id is required'],
            },
            quantity: {
                type: Number,
                default: 0
            },
            price: {
                type: Number
            },
            offer_price: {
                type: Number
            },
            is_discount: {
                type: Number
            },
            tax_type: {
                type: Number
            },
            tax_rate: {
                type: Number
            },
            cgst_rate: {
                type: Number
            },
            igst_rate: {
                type: Number
            },
            sgst_rate: {
                type: Number
            },
            status: { type: Number, enum: [4, 3, 2, 1, 0], default: 0 }, // 1(request)/2(accept)/3(reject)/4 cancel
            cancellation_date: { type: Date },
            return_date: { type: Date },
            reason: { type: String }
        }
    ],
    user_id: {
        type: mongoose.ObjectId,
        required: [true, 'User id is required'],
    },
    total_amount: {
        type: Number
    },
    discount: {
        type: Number
    },
    net_amount: {
        type: Number
    },
    redeem_points: {
        type: Number,default:0
    },
    //0 pending ,1 for (accept or assign driver) ,2 for complete ,3 for rejected ,4 cancel, 5 for some cancel some rejected, 6 for payment pending ,7 cancel order due to payemnt
    order_status: { type: Number, enum: [7,6,5,4,3, 2, 1, 0], default: 0 },
    tracking_status:{
        "Acknowledged":{  
            time:{type:Date},
            status:{ type: Number, enum: [1, 0], default: 0 },
            status_title:{type:String,default:"Acknowledged"},
        },
        "Packed":{  
            time:{type:Date},
            status:{ type: Number, enum: [1, 0], default: 0 },
            status_title:{type:String,default:"Packed"},
        },
        "In_Transit":{  
            time:{type:Date},
            status:{ type: Number, enum: [1, 0], default: 0 },
            status_title:{type:String,default:"In_Transit"},
        },
        "Delivered": {  
            time:{type:Date},
            status:{ type: Number, enum: [1, 0], default: 0 },
            status_title:{type:String,default:"Delivered"},
        }
    },
    current_tracking_status:{type:String,default:'Acknowledged'},
    warehouse_id:{
        type: mongoose.ObjectId
    },
    delivery_fee:{
        type: Number
    },
    vat_amount:{
        type: Number
    },
    driver_id: { type: mongoose.ObjectId },
    promo_code: { type: String },
    promo_code_id: { type: mongoose.ObjectId  },
    offers: [{ type: mongoose.Mixed }],
    transaction_id: { type: String },
    expected_start_date: {type:Date},
    expected_end_date: {type:Date},
    delivered_date: {type:Date},
    invoice_no: { type: String},

    customer_phone: { type: String },
    customer_name: { type: String },

    payment_mode: { type: String, enum: ['Cash', 'Credit','Wallet','Online'], default: 'Cash' },
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true, setter: true },
    toObject: { virtuals: true, getters: true, setter: true }
});


OrderSchema.plugin(aggregatePaginate);
OrderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order; 