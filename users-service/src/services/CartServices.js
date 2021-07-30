'use strict';
const { compareSync } = require('bcryptjs');
const {Carts} = require('../models');

const CartServices = {
    createOrUpdateRecord: async function(Records,quantity) {
        var aggregate  = [
            {$match:Records}
        ];
        return await Carts.aggregate(aggregate).then(async cartData=>{
           // console.log(cartData)
            if(cartData && cartData.length>0){
                var updaterecord = {
                    quantity : quantity
                }
                return await Carts.findOneAndUpdate({_id:cartData[0]._id},updaterecord, { new: true }).select('').then(updateCartData => {
                    return updateCartData;
                }).catch((err)=>{
                    throw err;
                })
            }else{
               Records.quantity = quantity;
                return await Carts.create(Records).then(cartData=>{
                    return cartData;
                }).catch((err)=>{
                    throw err;
                })
            }
        }).catch((err)=>{
            throw err;
        })
    },

    allRecord: async function(condition = {}){
        return await Carts.aggregate(condition).then(cartData => {
            return cartData;
        }).catch((err)=>{
            throw err;
        })
    },

    oneRecord: async function(condition = []){
        return await Carts.aggregate(condition).then(cartData=>{
            return cartData;
        }).catch((err)=>{
            throw err;
        })
    },

    deleteRecord : async function (condition) {
        return Carts.deleteOne(condition).then(deleteRes => {
            return deleteRes;
        }).catch(err => {
            throw err;
        });
    },

    deleteAllRecord : async function (condition) {
        return Carts.deleteMany(condition).then(deleteRes => {
            return deleteRes;
        }).catch(err => {
            throw err;
        });
    },

    getDataCount: async function (findPattern) {

        return Carts.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    },

    

    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
        };
        var myAggregate = Carts.aggregate(findPattern);
        return await Carts.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    findCartItems : async function (condition,options) {
        return await Carts.find(condition,options)
        .populate("product_id").populate("inventory_id").lean().then(cartItems => {
            return cartItems;
        }).catch(err => {
            throw err;
        });
    },

    findCartItemsWarehouse : async function (condition) {
        return await Carts.aggregate([
            {$match:condition},
            { $limit: 1 },
            {
               $lookup:
                 {
                   from: "product_inventories",
                   localField: "inventory_id",
                   foreignField: "_id",
                   as: "inventories"
                 }
            },
            {$unwind:"$inventories"},
            {$unwind:"$inventories.warehouseinventry"},
            {
               $lookup:
                 {
                   from: "warehouses",
                   localField: "inventories.warehouseinventry.warehouse_id",
                   foreignField: "_id",
                   as: "warehouse"
                 }
            },
            {$unwind:"$warehouse"},
            { $limit: 1 }
        ]).then(cartItems => {
            return cartItems;
        }).catch(err => {
            throw err;
        });
    },
    
}
//NotificationServices.createRecord({title:"Hello2",message:"Test message2",user_id:'5f730e04b8ca663ae84a36ce',user_type:3,sender_id:'5f18295dd364c8608604b992',sender_type:1,read_status:0,notification_type:1})
module.exports = CartServices; 