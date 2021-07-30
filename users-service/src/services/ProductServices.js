'use strict';

const {Product} = require('../models');
const config = require('../config');
const {ObjectID} = require('mongodb');
const UPLOAD_FOLDER_PATH = "public/uploads/product/";
const {Media,Response,Common} = require('../helpers')
const ProductImageServices = require('./ProductImageServices');

const ProductServices = {

    createRecord: async (ProductData) => {
        return await Product.create(ProductData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
        
    },
    
    oneRecord: async (condition = {}) => {
        
        return await Product.aggregate(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },
    allRecord: async (condition = {}) => {

        return await Product.aggregate(condition).then(createRes => {

            return createRes;

        }).catch(err => {

            throw err;

        });

    },
    updateRecord: async (data, condition) => {
        return await Product.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
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
                Media.deleteFile(destination + "/" + itemData.category_image);
                Media.deleteFile(destination + "/thumb_" + itemData.category_image);
            }
            var createRecord = {
                product_id : itemData._id,
                image:fileName
            };
            return await ProductImageServices.createRecord(createRecord).then(result=>{
                return result._id;
            })
            

        } else {
            return itemData.category_image;
        }
    }, 

    getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            populate: [
                {
                    path: "category_id",
                    select: "name",
                    match: {
                        $or: [
                            { name: { $regex: "fghfgh" } },
                        ]
                    }
                },
                {
                    path: "business_category_id",
                    select: "name"
                },
                {
                    path: "sub_category_id",
                    select: "name"
                },
            ],
            page: page_no,
            limit: limit,
        };

        return await Product.paginate(query, options).then(async (paginatedData) => {

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

    
        var myAggregate = Product.aggregate(findPattern);



        return await Product.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {

            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    genrateproductcode: async function(productId){
        
        var  aggregateCondition = [
            {$match:{_id:ObjectID(productId)}},
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$category_id"},
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: {  'name': 1 } }],
                    as: 'CategoryData'
                }

            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$sub_category_id"},
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: {  'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },   
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$business_category_id"},
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: {  "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }

            },
            { $unwind: "$businessCategoryData" },
        ];
       
      return await ProductServices.oneRecord(aggregateCondition).then(async result=>{
            result = result[0];
            var random = Common.generateRandomNumber(4);
            return result.businessCategoryData.name.substring(0, 3)+'-'+result.CategoryData.name.substring(0, 3)+'-'+result.SubCategoryData.name.substring(0, 3)+'-'+ random +'-'+result.name.substring(0, 3);
        }).catch(err => {
            throw err; 
        });
    },
    getDataCount: async function (findPattern) {

        return Product.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    }

}

module.exports = ProductServices;
