'use strict';

const {Banner} = require('../models');
const config = require('../config');
const UPLOAD_FOLDER_PATH = "public/uploads/banners/";
const {Media} = require('../helpers')

const BannerServices = {

    createRecord: async (BannerData) => {
        return await Banner.create(BannerData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    oneRecord: async (condition = {}) => {
        
        return await Banner.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await Banner.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
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
                Media.deleteFile(destination + "/" + itemData.image_path);
                Media.deleteFile(destination + "/thumb_" + itemData.image_path);
            }
    
            return fileName;

        } else {
            return itemData.category_image;
        }
    },

    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
       
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit
        };
    
        var myAggregate = Banner.aggregate(findPattern);

        return await Banner.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
    getDataCount: async function (findPattern) {

        return Banner.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }

}

module.exports = BannerServices;
