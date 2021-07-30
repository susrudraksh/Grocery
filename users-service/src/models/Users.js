'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/users";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";

const geoLocationSchema = new mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: {
        type: [Number]
    }
});

function setUrl(v){
}

const UserSchema =  new mongoose.Schema({
    
    first_name:{
        type:String,
        maxlength:50,
        trim:true
    },
    register_id:{
        type:String,
    },
    last_name:{
        type:String,
        maxlength:50,
        trim:true
    }, 
    username:{
        type:String,
        //lowercase: true,
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
        required:[true,'Phone no is required'],
    },
    phone:{
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
    user_role: {
        type: Number,
        enum: [1,2,3,4],
    },
    //1 for admin , 2 for sub admin , 3 for customer , 4 for driver
    address: { type: String, default: "" },
    delivery_address: [new mongoose.Schema({
        type: { type: String, default: 'Point' },
        user_id: {
            type: String,
          },
          location_name:{
            type: String,
          },mobile:{
            type: String,
          },
          floor:{
            type: String,
          },
          way:{
            type: String,
          },
          building:{
            type: String,
          },
          address_type:{
            type:String,
            trim:true
        },
        flat:{
            type:String,
            trim:true
        },
        landmark:{
            type:String,
            trim:true
        },
        full_address: {
            type: String,
            trim: true
        },
        zip_code: {
            type: String,
            trim: true
        },
        default_address: { type: Number, enum: [1, 0], default: 0 },
        is_deleted: { type: Number, enum: [1, 0], default: 0 },
        geoLocation: { type: geoLocationSchema, default: null },
    },{
        timestamps:true,
        toJSON:{virtuals:true,getters:true,setter:true},
        toObject:{virtuals:true,getters:true,setter:true}
    
    })],
    geoLocation: { type: geoLocationSchema, default: null },
    latitude: { type: String },
    longitude: { type: String },
    otp: { type: Number },
    user_image: { type: String },
    online_status : { type: Number, enum: [1, 0], default: 0 },
    vehicle_no : { type: String },
    // user_image_thumb_url : {type:String,get:setUrl},
    wallet:{type:Number,default:0},
    earned_point:{type:Number,default:0},
    last_earned_point_date:{type:Date},
    is_user_verified:{ type: Number, enum: [1, 0], default: 0 },
    new_email:{type:String},
    new_phone:{type:String},
    email_token:{type:String},
    is_email_verified: { type: Number, enum: [1, 0], default: 0 },
    is_phone_verified: { type: Number, enum: [1, 0], default: 0 },
    show_notification: { type: Number, enum: [1, 0], default: 0 },
    is_available: { type: Number, enum: [1, 0], default: 0 },
    device_id: { type: String },
    device_type: { type: Number, enum: [1,2,0], default: 0 },
    auth_token: { type: String, default: "" },
    device_token: { type: String, default: "" },
    user_permissions: { type: String },
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_busy: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },
    last_login_time: { type: Date },   
},{
    timestamps:true,
    toJSON:{virtuals:true,getters:true,setter:true},
    toObject:{virtuals:true,getters:true,setter:true}

})

// UserSchema.virtual('register_id').get(function (value) {
   
//     if (this._id != "") {
//         return Math.floor(10000 + Math.random() * 90000) + this._id ;
//     }
// });


// // custom conditions based validations
// UserSchema.path('password').validate(function (value) {
//     return value && value.length >= 7;
// }, 'Password should have atleast 7 characters.');

// // Modify data by using virtuals
UserSchema.virtual('user_image_url').get(function (value) {
    if (this.user_image != "" && typeof this.user_image !== "undefined") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

UserSchema.virtual('user_image_thumb_url').get(function (value) {
    if (this.user_image != "" && typeof this.user_image !== "undefined") {
        return UPLOAD_FOLDER_URL + "/" + this._id + "/thumb_" + this.user_image;
    } else {
        return DEFAULT_FOLDER_URL + "/placeholder-user.jpg";
    }
});

UserSchema.index({ geoLocation: '2dsphere' });

UserSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
UserSchema.plugin(aggregatePaginate);

const Users = mongoose.model('users', UserSchema);
module.exports = Users; 