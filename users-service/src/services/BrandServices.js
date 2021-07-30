"use strict";

const { Brand } = require("../models");
const { Media } = require("../helpers");

const UPLOAD_FOLDER_PATH = "public/uploads/brands/";

const BrandServices = {
    createRecord: async (brandData) => {
        return await Brand.create(brandData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await Brand.findOne(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return Brand.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
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

        return await Brand.paginate(query, options).then(async (paginatedData) => {
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
            if (itemData.image_path != "") {
                Media.deleteFile(destination + "/" + itemData.image_path);
                Media.deleteFile(destination + "/thumb_" + itemData.image_path);
            }
            return fileName;
        } else {
            return itemData.image_path;
        }
    },
    getDataCount: async function (findPattern) {

        return Brand.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }
}
module.exports = BrandServices