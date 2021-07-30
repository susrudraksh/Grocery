'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const { paginate } = require('./Users');
// const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/products";
// const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";



const CustomizationTypeSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Customization field is required'],
        maxlength:50,
        // sparse: true,
        // trim:true,
        // unique:true
    },
    parent_id:{
        type: mongoose.ObjectId, ref: 'customization_type'
    },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
})


CustomizationTypeSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
CustomizationTypeSchema.plugin(aggregatePaginate);

const CustomizationType = mongoose.model('customization_type', CustomizationTypeSchema);
module.exports = CustomizationType;