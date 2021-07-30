"use strict";

const { FavouriteItem } = require("../models");
const { Media } = require("../helpers");

const FavouriteItemServices = {
    createRecord: async (favData) => {
        return await FavouriteItem.create(favData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await FavouriteItem.findOne(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return FavouriteItem.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },

    getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            populate: [
                {
                    path: "user_id",
                    select: "username"
                },
                {
                    path: "product_id",
                    select: "name"
                },
            ],
            page: page_no,
            limit: limit,
        };

        return await FavouriteItem.paginate(query, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
        };
        var myAggregate = FavouriteItem.aggregate(findPattern);
        return await FavouriteItem.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    deleteRecord: async function (deletePattern) {

        return FavouriteItem.findOneAndDelete(deletePattern)
            .then(deleteRes => {
                return deleteRes;
            }).catch(err => {
                throw err;
            });
    }
}
module.exports = FavouriteItemServices