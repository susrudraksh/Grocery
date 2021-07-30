"use strict";

const { BusinessCategory } = require("../models");
const { Media } = require("../helpers");

const UPLOAD_FOLDER_PATH = "public/uploads/business_category/";

const BusinessCategoryServices = {
    createRecord: async (businessData) => {
        return await BusinessCategory.create(businessData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    allRecord: async (condition = {}) => {
        return await BusinessCategory.findAll(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await BusinessCategory.findOne(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return BusinessCategory.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },
    
    getPaginatedData: async function (findPattern, sortPattern, page_no=1, limit=10,select='') {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
            select:select
        };
        
        return await BusinessCategory.paginate(query, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
        };
        var myAggregate = BusinessCategory.aggregate(findPattern);
        return await BusinessCategory.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    updateUserImage: async function (itemData, imageData, deleteExiting = true) {

        if (imageData) {
    
            var destination = UPLOAD_FOLDER_PATH + itemData._id;
            Media.createDirectory(destination);
    
            // Upload file
            var fileName = Media.uploadFile(imageData, destination);
    
            // Create thumbnail
            var filePath = destination + "/" + fileName;
            var thumbPath = destination + "/thumb_" + fileName;
            Media.createThumbnail(filePath, thumbPath, 200, 200);
    
            // Delete existing files
            if (itemData.category_image != "") {
                Media.deleteFile(destination + "/" + itemData.category_image);
                Media.deleteFile(destination + "/thumb_" + itemData.category_image);
            }
    
            return fileName;

        } else {
            return itemData.category_image;
        }
    },
    getDataCount: async function (findPattern) {

        return BusinessCategory.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }
}
module.exports = BusinessCategoryServices