'use strict';

const mongoConn =  require('../db');
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const config = require('../config');

const geoLocationSchema = new mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: {
        type: [Number]
    }
});

const WarehouseSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },
    address:{type:String},
    latitude: { type: String },
    longitude: { type: String },
    warehouse_code: { type: String },
    loc:geoLocationSchema,
    is_active: { type: Number, enum: [1, 0], default: 0 },
    is_deleted: { type: Number, enum: [1, 0], default: 0 },   
},{
    timestamps:true,
    toJSON:{virtuals:true}
});

WarehouseSchema.index({ loc: '2dsphere' });
WarehouseSchema.plugin(uniqueValidator,{ message: 'Provided {PATH} is already exist.' });
WarehouseSchema.plugin(mongoosePaginate);

const Warehouse = mongoose.model('warehouse',WarehouseSchema);
module.exports = Warehouse;