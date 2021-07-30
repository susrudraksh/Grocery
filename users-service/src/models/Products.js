'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

 
const ProductSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name is required'],
        maxlength:120,
        trim:true
    },
    business_category_id:{
        type: mongoose.ObjectId, ref: 'business_category',
        required:[true,'Business category is required'],
        sparse: true,
        
    },
    brand_id:{
        type: mongoose.ObjectId, ref: 'brand',
        required:[true,'brand is required'],
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
    images: [{ 
        type: mongoose.ObjectId, ref: 'product_images'
    }],
    description:{
        type:String,
        required:[true,'Description is required'],
       // maxlength:500
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   

},{
    timestamps:true,
    toJSON:{virtuals:true}

})


// Modify data by using virtuals
ProductSchema.virtual('product_image_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

ProductSchema.virtual('product_image_thumb_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

ProductSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
ProductSchema.plugin(aggregatePaginate);
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;