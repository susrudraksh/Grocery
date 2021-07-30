'use strict';

const { Admins } = require('../models');
const { Media } = require('../helpers');
const config = require('../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/admins";

const AdminServices = {

    createRecord: async (adminData) => {
        return await Admins.create(adminData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    allRecord: async (condition = {}) => {
        return await Admins.findAll(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await Admins.findOne(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await Admins.findOneAndUpdate(data, condition, { new: true }).select('-password').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    getPaginatedAdminsData: async function (findPattern, sortPattern, page_no, limit) {

        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit
        };

        var aggregate = Admins.aggregate([
            { $match: findPattern },
            {
                $project: {
                    "username": 1, "email": 1, "phone_no": 1,"user_permissions":1,"is_active":1,"warehouse_id":1,createdAt:1,
                    'user_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$user_image"] },
                    "user_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$user_image"] },
                    
                }
            }
        ]);
        return Admins.aggregatePaginate(aggregate, options).then((paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        });
    },

    getAdminData: async function (findPattern) {
        return Admins.findOne(findPattern).then(userData => {
            return userData;
        }).catch(err => {
            throw err;
        });
    },

    updateUserImage: async function (itemData, imageData, deleteExiting = true) {

        if (imageData) {

            var destination = "public/uploads/admins/" + itemData._id;

            Media.createDirectory(destination);

            // Upload file

            var fileName = Media.uploadFile(imageData, destination);

            // Create thumbnail

            var filePath = destination + "/" + fileName;

            var thumbPath = destination + "/thumb_" + fileName;

            Media.createThumbnail(filePath, thumbPath, 200, 200);

            // Delete existing files

            if (itemData.user_image != "") {

                Media.deleteFile(destination + "/" + itemData.user_image);

                Media.deleteFile(destination + "/thumb_" + itemData.user_image);

            }

            return fileName;

        } else {

            return itemData.user_image;

        }

    },
    getDataCount: async function (findPattern) {

        return Admins.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }

}

module.exports = AdminServices;