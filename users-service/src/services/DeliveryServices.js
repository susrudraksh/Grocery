'use strict';

const {DeliverySettings} = require('../models');
const config = require('../config');
const {Media} = require('../helpers')

const DeliveryServices = {

    createRecord: async (settingData) => {
        console.log('ss')
        return await DeliverySettings.create(settingData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    oneRecord: async (condition = {}) => {
        
        return await DeliverySettings.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await DeliverySettings.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
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
            limit: limit
        };
    
        var myAggregate = DeliverySettings.aggregate(findPattern);

        return await DeliverySettings.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    
}
