'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/products";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";




const ProductImagesSchema =  new mongoose.Schema({
    image:{
        type:String,
        required:[true,'Image name is required'],
        trim:true
    },
    product_id: { 
        type: mongoose.ObjectId, ref: 'products'
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
})


// Modify data by using virtuals
ProductImagesSchema.virtual('product_image_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

ProductImagesSchema.virtual('product_image_thumb_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

ProductImagesSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
ProductImagesSchema.plugin(aggregatePaginate);

const ProductImages = mongoose.model('product_images', ProductImagesSchema);
module.exports = ProductImages;