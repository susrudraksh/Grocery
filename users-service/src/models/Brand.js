'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/brands";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

const BrandSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        sparse: true,
        trim:true,
        unique:true
    },
    image_path:{type:String},
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
});


// Modify data by using virtuals
BrandSchema.virtual('image_path_url').get(function (value) {
    if (this.image_path != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.image_path;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

BrandSchema.virtual('image_path_thumb_url').get(function (value) {
    if (this.image_path != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.image_path;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

BrandSchema.plugin(uniqueValidator,{ message: 'Brand {PATH} is already exist.' });
BrandSchema.plugin(mongoosePaginate);

const Brand = mongoose.model('brand',BrandSchema);
module.exports = Brand;