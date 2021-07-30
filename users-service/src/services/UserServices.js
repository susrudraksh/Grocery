"use strict";

const { Users } = require("../models");
const { Media ,SendSMS} = require("../helpers");


const UPLOAD_FOLDER_PATH = "public/uploads/users/";

const UserServices = {
    createRecord: async (userData) => {
        userData.register_id = await UserServices.genrateRegisterId(8);
        return await Users.create(userData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    allRecord: async (condition = {}) => {
        return await Users.aggregate(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = []) => {
        return await Users.aggregate(condition).then(createRes => {
            if(createRes.length>0){
                return createRes[0];
            }else{
                return '';
            }
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern ,customselect='') {

        var options = { 
            new: true,
            select: (customselect!='') ? customselect:'user_image_url user_image email _id phone email country_code username auth_token is_user_verified is_email_verified is_phone_verified allow_notifications delivery_address online_status user_role'
         };
        return Users.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
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

            limit: limit

        };

        var myAggregate = Users.aggregate(findPattern);

        return await Users.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

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
            limit: limit
        };
    
        var myAggregate = Users.aggregate();
        myAggregate.match(findPattern);
        return await Users.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
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

        return Users.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    },
    genrateRegisterId: async function(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    getUserDetailById: async function (findPattern) {

        return Users.findOne(findPattern).then((userDetail) => {
            return userDetail;
        }).catch(err => {
            throw err;
        });
    },
    updateManyRecord: async (condition, data) => {
        return await Users.update(condition, data).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
    },


    
  
}
module.exports = UserServices