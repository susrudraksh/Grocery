"use strict";

const { CustomizationType } = require("../models");
const { Media } = require("../helpers");

const UPLOAD_FOLDER_PATH = "public/uploads/category/";

const CustomizationTypeServices = {
    createRecord: async (categoryData) => {
        return await CustomizationType.create(categoryData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    allRecord: async (condition = {}) => {
        
        return await CustomizationType.aggregate(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },


    oneRecord: async (condition = {}) => {
        return await CustomizationType.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return CustomizationType.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },
    
    getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
        };
        var aggregate = CustomizationType.aggregate(query);
        return await CustomizationType.aggregatePaginate(aggregate, options).then(async (paginatedData) => {
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
                Media.deleteFile(destination + "/" + itemData.image_path);
                Media.deleteFile(destination + "/thumb_" + itemData.image_path);
            }
    
            return fileName;

        } else {
            return itemData.category_image;
        }
    }
}
module.exports = CustomizationTypeServices