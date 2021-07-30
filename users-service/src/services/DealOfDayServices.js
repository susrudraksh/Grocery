'use strict';

const {DealOfDay} = require('../models');
const config = require('../config');
const UPLOAD_FOLDER_PATH = "public/uploads/dealofday/";
const {Media} = require('../helpers')

const DealOfDayServices = {

    createRecord: async (DealOfDayData) => {
        return await DealOfDay.create(DealOfDayData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    oneRecord: async (condition = {}) => {
        
        return await DealOfDay.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {
            throw err;
        });
    },

    allRecord: async function(condition = {}){
        return await DealOfDay.aggregate(condition).then(dealofdayData => {
            return dealofdayData;
        }).catch((err)=>{
            throw err;
        })
    },

    updateRecord: async (condition, data) => {
        return await DealOfDay.findOneAndUpdate(condition, data, { new: true }).select('').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
    },

    updateManyRecord: async (condition, data) => {
        return await DealOfDay.updateMany(condition, data, { new: true }).select('').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
    },

    updateUserImage: async function (itemData, imageData, deleteExiting = true) {

        if (imageData) {
    
            var destination = UPLOAD_FOLDER_PATH + itemData._id;
            console.log("reach")
            Media.createDirectory(destination);
            console.log("reach1")
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
    
        var myAggregate = DealOfDay.aggregate(findPattern);

        return await DealOfDay.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
    getDataCount: async function (findPattern) {

        return DealOfDay.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }

}

module.exports = DealOfDayServices;
