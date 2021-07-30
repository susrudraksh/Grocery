'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/business_category";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

const BusinessCategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    order_number: {
        type: Number,
        required: true,
        trim: true
    },
    category_image: {
        type: String,
        //required:true,
    },
    cancelation_time:{
        type:Number,
        require:true
    },
    return_time:{
        type:Number,
        require:true
    },
    all_return: { type: Number, enum: [1, 0], default: 0 },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}

});


// Modify data by using virtuals
BusinessCategorySchema.virtual('category_image_url').get(function (value) {
    if (this.category_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.category_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

BusinessCategorySchema.virtual('category_image_thumb_url').get(function (value) {
    if (this.category_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.category_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

BusinessCategorySchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
BusinessCategorySchema.plugin(aggregatePaginate);
BusinessCategorySchema.plugin(mongoosePaginate);

const BusinessCategory = mongoose.model('business_category',BusinessCategorySchema);
module.exports = BusinessCategory; 