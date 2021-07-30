'use strict';

const { ProductInventry } = require('../models');
const config = require('../config');
const UPLOAD_FOLDER_PATH = "public/uploads/product/";
const { Media, Response } = require('../helpers');

const ProductInventoryServices = {

    oneRecord: async (condition = {}) => {
        return await ProductInventry.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {

            throw err;

        });

    },
    allRecord: async (condition = {}) => {

        return await ProductInventry.aggregate(condition).then(createRes => {

            return createRes;

        }).catch(err => {

            throw err;

        });

    },

    createRecord: async (ProductData) => {
        return await ProductInventry.create(ProductData).then(async createRes => {
            return await ProductInventoryServices.checkAndUpdateQuantity(createRes._id).then(async updateRecord => {
                return updateRecord;
            }).catch(err => {
                throw err;
            });
        }).catch(err => {
            throw err;
        });

    },
    updateRecord: async (condition, record) => {  
        return await ProductInventry.findOneAndUpdate(condition, record, { new: true }).select('').then(async createRes => {  
            if(createRes){         
                return await ProductInventoryServices.checkAndUpdateQuantity(createRes._id).then(async updateRecord => {
                    return updateRecord;
                }).catch(err => {
                    throw err;
                });
            }else{
                return createRes;
            }
            // return createRes;
        }).catch(err => {
            throw err;
        });
    },
    updateManyRecord: async (condition, data) => {
        return await ProductInventry.updateMany(condition, data, { new: true }).select('').then(createRes => {
            return createRes;
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


        var myAggregate = ProductInventry.aggregate(findPattern);



        return await ProductInventry.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    checkAndUpdateQuantity: async function (findPattern) {
        var myAggregate = [
            { $match: { _id: findPattern } },
            {
                $project: {
                    quantityTotal: { $sum: "$warehouseinventry.quantity" },
                }
            }

        ];
        return await ProductInventry.aggregate(myAggregate).then(async (getRecord) => {
            getRecord = getRecord[0];
            var data = {
                product_quantity: getRecord.quantityTotal
            }
            return await ProductInventry.findOneAndUpdate({ _id: findPattern }, data, { new: true }).select('').then(async createRes => {
                return createRes;
            }).catch(err => {
                throw err;
            });
        }).catch(err => {
            throw err;
        })
    },
}

module.exports = ProductInventoryServices;
