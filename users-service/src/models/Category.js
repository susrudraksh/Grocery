'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/category";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

const CategorySchema = mongoose.Schema({
    
    business_category_id: {
        type: mongoose.ObjectId,
        ref: "business_category"
      },
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    image_path:{type:String},
    parent_id:{ type: String, default: "" },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
});


// Modify data by using virtuals
CategorySchema.virtual('image_path_url').get(function (value) {
    if (this.image_path != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.image_path;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

CategorySchema.virtual('image_path_thumb_url').get(function (value) {
    if (this.image_path != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.image_path;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

CategorySchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
CategorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('category',CategorySchema);
module.exports = Category;