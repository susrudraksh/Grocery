'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/admins";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";



const AdminSchema =  new mongoose.Schema({
    first_name:{
        type:String,
       // required:[true,'First name is required'],
        maxlength:50,
        trim:true
    },
    last_name:{
        type:String,
       // required:[true,'Last name is required'],
        maxlength:50,
        trim:true
    },
    username:{
        type:String,
        sparse: true,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        sparse: true,
        trim:true,
        validate(value) {
            if (value && !validator.isEmail(value)) {
                throw new Error("Email have invalid format.")
            }
        }
    },
    country_code:{
        type:String,
        //required:[true,'Phone no is required'],
    },
    phone_no:{
        type:String,
        required:[true,'Phone no is required'],
        sparse: true,
        trim:true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password can't be empty."],
        
    },
    warehouse_id:{ type: String },
    user_role: {
        type: Number,
        enum: [1,2,3,4],
    },
    user_image: { type: String },
    user_permissions: { type: String },
    auth_token: { type: String, default: "" },
    last_login_time: { type: Date },
    wallet:{type:String,default:"0.00"},
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}

})


// Modify data by using virtuals
AdminSchema.virtual('user_image_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

AdminSchema.virtual('user_image_thumb_url').get(function (value) {
    if (this.user_image != "") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

AdminSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
AdminSchema.plugin(aggregatePaginate);

const Admins = mongoose.model('admins', AdminSchema);
module.exports = Admins;