'use strict';

const {ProductCustomization} = require('../models');
const config = require('../config');
const UPLOAD_FOLDER_PATH = "public/uploads/product/";
const {Media,Response} = require('../helpers');

const ProductCustomizationServices = {

    oneRecord: async (condition = {}) => {
        
        return await ProductCustomization.aggregate(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    createRecord: async (ProductData) => {
        return await ProductCustomization.create(ProductData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    allRecord: async (condition = {}) => {
        return await ProductCustomization.aggregate(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await ProductCustomization.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
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
        var myAggregate = ProductCustomization.aggregate(findPattern);
        return await ProductCustomization.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
  

}

module.exports = ProductCustomizationServices;
