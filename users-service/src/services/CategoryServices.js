"use strict";

const { Category } = require("../models");
const { Media } = require("../helpers");

const UPLOAD_FOLDER_PATH = "public/uploads/category/";

const CategoryServices = {
    createRecord: async (categoryData) => {
        return await Category.create(categoryData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    allRecord: async (condition = {}) => {
        return await Category.find(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await Category.findOne(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return Category.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },
    
    getPaginatedData: async function (findPattern, sortPattern, page_no=1, limit=10,select='') {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            populate: [
                {
                  path: "business_category_id",
                  select: "name"
                },
              ],
            page: page_no,
            limit: limit,
            select:select
        };
        
        return await Category.paginate(query, options).then(async (paginatedData) => {
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
    },
    getDataCount: async function (findPattern) {

        return Category.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }
}
module.exports = CategoryServices