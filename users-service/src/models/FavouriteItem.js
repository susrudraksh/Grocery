'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');

const FavouriteItemSchema = mongoose.Schema({
    
    user_id: {
        type:mongoose.ObjectId,
        ref:"users"
      },
    product_id:{
        type:mongoose.ObjectId,
        ref:"products"
    },
    is_active: { type: Number, enum: [1, 0], default: 0 }
},{
    timestamps:true,
    toJSON:{virtuals:true}
});

FavouriteItemSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
FavouriteItemSchema.plugin(aggregatePaginate);

const FavouriteItem = mongoose.model('favourite_item',FavouriteItemSchema);
module.exports = FavouriteItem;