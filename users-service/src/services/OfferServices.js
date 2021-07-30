'use strict';

const {Offer} = require('../models');
const config = require('../config');
const UPLOAD_FOLDER_PATH = "public/uploads/offers/";
const {Media,Messages} = require('../helpers')

const OfferServices = {

    applyOffer: async (body) => {
        return await Offer.findOne({coupon_code:body.promo_code}).then(createRes => {
            //console.log("createRes",createRes)
            if(!createRes)
            {
                throw Messages.OFFER_NOT_FOUND;
            }
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    createRecord: async (offerData) => {
        return await Offer.create(offerData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },

    oneRecord: async (condition = {}) => {
        
        return await Offer.aggregate(condition).then(createRes => {
            return createRes[0];
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await Offer.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
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
            if (itemData.image_path != "") {
                Media.deleteFile(destination + "/" + itemData.image_path);
                Media.deleteFile(destination + "/thumb_" + itemData.image_path);
            }
    
            return fileName;

        } else {
            return itemData.image_path;
        }
    },

    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
       
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit
        };
    
        var myAggregate = Offer.aggregate(findPattern);

        return await Offer.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },
    getDataCount: async function (findPattern) {

        return Offer.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }

}

module.exports = OfferServices;
