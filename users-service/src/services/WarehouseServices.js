"use strict";

const { Warehouse } = require("../models");

const WarehouseServices = {
    createRecord: async (warehouseData) => {
        return await Warehouse.create(warehouseData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        var select = '-createdAt -updatedAt -__v';
        return await Warehouse.findOne(condition).select(select).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return Warehouse.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },

    getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            select: '-createdAt -updatedAt -__v',
            page: page_no,
            limit: limit,
        };

        return await Warehouse.paginate(query, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
    getDataCount: async function (findPattern) {

        return Warehouse.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    },
    findNearest: async function (location) {
       
        var query = {
            loc:
            {
                $near:
                {
                    $geometry: {
                        type: "Point",
                        coordinates: location
                    },
                    $maxDistance: 50000
                }
            }
        };
        console.log(JSON.stringify(query));
        return await Warehouse.findOne(query).then(async (paginatedData) => {
            console.log(paginatedData)
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
    findNearestExcept: async function (location, except) {

        var query = {
            loc:
            {
                $near:
                {
                    $geometry: {
                        type: "Point",
                        coordinates: location
                    },
                    $maxDistance: 50000
                }
            },
            _id: { $nin: except }
        };
        return await Warehouse.findOne(query).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
}
module.exports = WarehouseServices