'use strict';

const { BusinessCategoryServices, UserServices, NotificationServices, CategoryServices, FavouriteItemServices, ProductServices, BrandServices, ProductInventoryServices, BannerServices, ProductCustomizationServices, OrderServices,DealOfDayServices } = require('../../services/')
const { Response, Messages, Validation, Encryption, Common, PushNotification } = require('../../helpers');
const { Product, ProductCustomization, Order } = require('../../models');
const { ObjectId } = require('mongodb');
const config = require('../../config');
const CustomizationTypeServices = require('../../services/CustomizationTypeServices');
const { result } = require('lodash');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const UPLOAD_BANNER_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/banners";
const UPLOAD_DEALOFDAY_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/dealofday";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const ProductController = {


/**
 * @api {get} /user_service/customer/product/get_business_category Customer - Product - Business Category
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
    "Content-Type": "multipart/form-data",
    "x-access-token": "your token"
}
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
    "message": "Data fetch successfully",
    "data": {
        "docs": [
            {
                "all_return": 0, 
                "_id": "5fe97c9112d5874bdd5db00f",
                "name": "Electronics",
                "order_number": 0,
                "createdAt": "2020-12-28T06:34:57.826Z",
                "updatedAt": "2021-03-09T11:31:28.150Z",
                "category_image": "1615284438326electronics.png",
                "category_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/1615284438326electronics.png",
                "category_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/thumb_1615284438326electronics.png",
                "id": "5fe97c9112d5874bdd5db00f"
            },
        ],
        "totalDocs": 1,
        "limit": 100,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/get_business_category",
    "message": "error.",
    "data": {}
}
*/

getBusinesscategory: (req, res) => {
    try {
        var findBusinessCategory = {
            is_deleted: 0,
            is_active: 1,
        };
        var select = "-cancelation_time -return_time -is_deleted -is_active -__v";
        var sortPattern = { order_number: 1 };
        BusinessCategoryServices.getPaginatedData(findBusinessCategory, sortPattern, 1, 100, select).then(BusinessCategoryResult => {
            var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
            Response.send(req, res, 200, successMsg, BusinessCategoryResult);
        }).catch(err => {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        })


    } catch (err) {
        var errorMess = Validation.getErrorMessage(err);
        Response.send(req, res, 500, errorMess);
    }
},




/**
 * @api {post} /user_service/customer/product/get_category Customer - Product - Category
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
     {
         "Content-Type": "multipart/form-data",
    }
*
* @apiParam {String} business_category_id Business Category Id
*
* @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Data fetch successfully",
        "data": {
            "docs": [
            {
                "parent_id": "",
                "_id": "5fe97db612d5874bdd5db012",
                "name": "Mobiles",
                "business_category_id": {
                "_id": "5fe97c9112d5874bdd5db00f",
                "name": "Electronics",
                "category_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/undefined",
                "category_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/thumb_undefined",
                "id": "5fe97c9112d5874bdd5db00f"
                },
                "createdAt": "2020-12-28T06:39:50.699Z",
                "updatedAt": "2021-03-08T04:09:01.683Z",
                "image_path": "1615176541681maxresdefault.jpg",
                "image_path_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/category/5fe97db612d5874bdd5db012/1615176541681maxresdefault.jpg",
                "image_path_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/category/5fe97db612d5874bdd5db012/thumb_1615176541681maxresdefault.jpg",
                "id": "5fe97db612d5874bdd5db012"
            }
            ],
            "totalDocs": 1,
            "limit": 100,
            "totalPages": 1,
            "page": 1,
            "pagingCounter": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
        }
    }
*
* @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/get_category",
        "message": "error.",
        "data": {}
    }
*/

getCategory: (req, res) => {

    try {
        var business_category_id = req.body.business_category_id || '';
        var findCategory = {
            is_deleted: 0,
            is_active: 1,
            business_category_id: business_category_id,
            parent_id: ""
        };

        var select = "-is_deleted -is_active -__v";
        var sortPattern = { name: 1 };
        CategoryServices.getPaginatedData(findCategory, sortPattern, 1, 100, select).then(CategoryResult => {

            var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
            Response.send(req, res, 200, successMsg, CategoryResult);
        }).catch(err => {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        })


    } catch (err) {
        var errorMess = Validation.getErrorMessage(err);
        Response.send(req, res, 500, errorMess);
    }
},

/**
 * @api {post} /user_service/customer/product/get_subcategory Customer - Product - Sub Category
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
     {
         "Content-Type": "multipart/form-data",
    }
*
* @apiParam {String} business_category_id Business Category Id
* @apiParam {String} category_id  Category Id
*
* @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Data fetch successfully",
    "data": {
        "docs": [
        {
            "parent_id": "5fe97db612d5874bdd5db012",
            "_id": "6045a7064485c00b0e36534b",
            "name": "SmartPhones",
            "business_category_id": {
            "_id": "5fe97c9112d5874bdd5db00f",
            "name": "Electronics",
            "category_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/undefined",
            "category_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/business_category/5fe97c9112d5874bdd5db00f/thumb_undefined",
            "id": "5fe97c9112d5874bdd5db00f"
            },
            "createdAt": "2021-03-08T04:24:38.052Z",
            "updatedAt": "2021-03-08T04:24:38.054Z",
            "image_path": "1615177478054smartphonewithicons232147497533.jpg",
            "image_path_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/category/6045a7064485c00b0e36534b/1615177478054smartphonewithicons232147497533.jpg",
            "image_path_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/category/6045a7064485c00b0e36534b/thumb_1615177478054smartphonewithicons232147497533.jpg",
            "id": "6045a7064485c00b0e36534b"
        }
        ],
        "totalDocs": 1,
        "limit": 100,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
*
* @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/get_subcategory",
        "message": "error.",
        "data": {}
    }
*/

getSubCategory: (req, res) => {

    try {
        var business_category_id = req.body.business_category_id || '';
        var category_id = req.body.category_id || '';
        var findCategory = {
            is_deleted: 0,
            is_active: 1,
            business_category_id: business_category_id,
            parent_id: category_id
        };

        var select = "-is_deleted -is_active -__v";
        var sortPattern = { name: 1 };
        CategoryServices.getPaginatedData(findCategory, sortPattern, 1, 100, select).then(CategoryResult => {

            var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
            Response.send(req, res, 200, successMsg, CategoryResult);
        }).catch(err => {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        })


    } catch (err) {
        var errorMess = Validation.getErrorMessage(err);
        Response.send(req, res, 500, errorMess);
    }
},


/**
    * @api {get} /user_service/customer/product/get_favourite_items Product-Favourite-Listing
    * @apiGroup App - Customer - Product
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} page_no Page No.
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
        "docs": [
        {
            "_id": "6059a5f2897f01704c82ec12",
            "name": "OPPO Reno5 Pro 5G",
            "product_id": "6045a7e04485c00b0e36535c",
            "inventory_id": "6045a7e04485c00b0e36535d",
            "inventory_name": "Smartphones",
            "price": 20000,
            "available_quantity": 37,
            "product_code": "Ele-Mob-Sma-2603-OPP",
            "images": [
            {
                "_id": "6045a7e04485c00b0e36535e",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769682571OLBwyCg0L.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769682571OLBwyCg0L.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e36535f",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769683571sDX2RCbGL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769683571sDX2RCbGL.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365361",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769684581ikLxT6PL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769684581ikLxT6PL.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365363",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769687081rDtQh9xFL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769687081rDtQh9xFL.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365365",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696879714WOEKK1vL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696879714WOEKK1vL.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365366",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696905718T5Txm4dL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696905718T5Txm4dL.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365368",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696975813EayRQE8L.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696975813EayRQE8L.SL1500.jpg"
            },
            {
                "_id": "6045a7e04485c00b0e365369",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/16151776969828145DElqceL.SL1500.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_16151776969828145DElqceL.SL1500.jpg"
            }
            ],
            "business_category": {
            "_id": "5fe97c9112d5874bdd5db00f",
            "name": "Electronics"
            },
            "category": {
            "_id": "5fe97db612d5874bdd5db012",
            "name": "Mobiles"
            },
            "subcategory": {
            "_id": "6045a7064485c00b0e36534b",
            "name": "SmartPhones"
            },
            "discount_type": 2,
            "discount_value": 0,
            "is_discount": 0,
            "offer_price": 20000
        },
        {
            "_id": "6059a7b1897f01704c82ec38",
            "name": "Olay Natural White Instant Glowing Fairness Cream",
            "product_id": "604204694485c00b0e365218",
            "inventory_id": "604204694485c00b0e365219",
            "inventory_name": "Beauty and Health",
            "price": 99,
            "available_quantity": 98,
            "product_code": "Bea-Cos-Cre-5896-Ola",
            "images": [
            {
                "_id": "604204694485c00b0e36521a",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/1614939241407olayNW20gm.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/thumb_1614939241407olayNW20gm.jpg"
            },
            {
                "_id": "604204694485c00b0e36521b",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/1614939241417OlayNWIGF20gm2.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/thumb_1614939241417OlayNWIGF20gm2.jpg"
            },
            {
                "_id": "604204694485c00b0e36521c",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/1614939241425OlayNWIGF20gm3.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/604204694485c00b0e365218/thumb_1614939241425OlayNWIGF20gm3.jpg"
            }
            ],
            "business_category": {
            "_id": "602cc062bd77a05171d5b1f5",
            "name": "Beauty, Health and Personal Care"
            },
            "category": {
            "_id": "602cc0d9bd77a05171d5b1f6",
            "name": "Cosmetics"
            },
            "subcategory": {
            "_id": "604203144485c00b0e365200",
            "name": "Skin Care Creams"
            },
            "discount_type": 2,
            "discount_value": 0,
            "is_discount": 0,
            "offer_price": 99
        }
        ],
        "totalDocs": 2,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product/get_favourite_items",
    "message": "error.",
    "data": {}
    }
    */

getFavouriteItems: (req, res) => {

    try {

        var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || "";
        var keyword = req.query.keyword || "";
        var status = req.query.status;
        var page = parseInt(req.query.page_no) || 1;
        var limit = 10;

        var findPattern = { user_id: ObjectId(user_id), is_active: 1 };
        var aggregateCondition = [
            { $match: findPattern },
            {
                $lookup: {
                    from: 'product_inventories',
                    let: { "id": "$product_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $lookup: {
                                from: 'products',
                                let: { "id": "$product_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $unset: ['createdAt', 'updatedAt', '__v'] },
                                ],
                                as: 'Products'
                            }

                        },
                        { $unwind: "$Products" },
                        {
                            $lookup: {
                                from: 'business_categories',
                                let: { "id": "$Products.business_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { "name": 1 } }
                                ],
                                as: 'businessCategoryData'
                            }

                        },
                        { $unwind: "$businessCategoryData" },
                        {
                            $lookup: {
                                from: 'product_images',
                                let: { "images": "$Products.images" },
                                pipeline: [
                                    { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                                    {
                                        $project: {
                                            'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                            "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                                        }
                                    }
                                ],
                                as: 'ProductImages'
                            }

                        },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$Products.category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1 } }],
                                as: 'CategoryData'
                            }

                        },
                        { $unwind: "$CategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$Products.sub_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1 } }],
                                as: 'SubCategoryData'
                            }

                        },
                        { $unwind: "$SubCategoryData" },
                        { $unset: ['createdAt', 'updatedAt', '__v'] },
                    ],
                    as: 'inventoryproducts'
                }
            },
            { $unwind: '$inventoryproducts' },

            {
                $project: {
                    name: '$inventoryproducts.Products.name',
                    product_id: '$inventoryproducts.Products._id',
                    inventory_id: '$inventoryproducts._id',
                    inventory_name: '$inventoryproducts.inventory_name',
                    price: '$inventoryproducts.price',
                    min_inventory: '$inventoryproducts.min_inventory',
                    available_quantity: '$inventoryproducts.product_quantity',
                    product_code: '$inventoryproducts.product_code',
                    images: '$inventoryproducts.ProductImages',
                    business_category: '$inventoryproducts.businessCategoryData',
                    category: '$inventoryproducts.CategoryData',
                    subcategory: '$inventoryproducts.SubCategoryData',
                    discount_type: "$inventoryproducts.discount_type",
                    discount_value: "$inventoryproducts.discount_value",
                    is_discount: "$inventoryproducts.is_discount",
                    offer_price: "$inventoryproducts.discounted_product_price",

                }
            },
        ];

        var sortPattern = { createdAt: -1 };

        FavouriteItemServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(favItemdata => {
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, favItemdata);
        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });

    } catch (err) {
        Response.send(req, res, 500, err.message)
    }
},

/**
 * @api {post} /user_service/customer/product/add_favourite_item Product - Favourite - Add
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} product_id Product Id
* @apiParam {String} status Status
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
  "message": "Item successfully added to your favourite list.",
  "data": {
    "is_active": 1,
    "_id": "6059a5f2897f01704c82ec12",
    "user_id": "6052f3833a20d57e9738223b",
    "product_id": "6045a7e04485c00b0e36535d",
    "createdAt": "2021-03-23T08:25:22.329Z",
    "updatedAt": "2021-03-24T08:44:08.510Z",
    "__v": 0,
    "id": "6059a5f2897f01704c82ec12"
  }
}

*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/add_favourite_item",
"message": "Error",
"data": {}
}
*/
addFavouriteItem: async (req, res) => {

    try {

        var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || "";
        var product_id = req.body.product_id || "";
        var status = req.body.status || 0;

        var errors = [];

        // return errors
        if (errors.length > 0) {
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });

        } else {

            var createPattern = {
                user_id: user_id,
                product_id: product_id,
            };
            FavouriteItemServices.oneRecord(createPattern).then(favResult => {
                if (favResult) {
                    var updateRecord = {
                        is_active: status
                    };
                    FavouriteItemServices.updateRecord({ _id: favResult._id }, updateRecord).then(async updatedRes => {
                        if (status == 1) {
                            var resMsg = Messages.FAV_CREATE_SUCCESS;
                        } else {
                            var resMsg = Messages.FAV_REMOVE_SUCCESS;
                        }
                        Response.send(req, res, 200, resMsg, updatedRes);
                    }).catch(err => {
                        var errorsArr = Validation.getValidationErrors(err);
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg, {
                            errors: errorsArr
                        });
                    });
                } else {
                    var createPattern = {
                        user_id: user_id,
                        product_id: product_id,
                        is_active: 1,
                    };

                    FavouriteItemServices.createRecord(createPattern).then(async createRes => {

                        var findPattern = { _id: createRes._id };
                        var updatePattern = {};

                        FavouriteItemServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                            // success
                            let resMsg = Messages.FAV_CREATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });
                    }).catch(err => {
                        var errorsArr = Validation.getValidationErrors(err);
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg, {
                            errors: errorsArr
                        });
                    });
                }

            }).catch(err => {
                var errorsArr = Validation.getValidationErrors(err);
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg, {
                    errors: errorsArr
                });
            });


        }
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},

/**
 * @api {post} /user_service/customer/product/get_products Product - Listing
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} business_category_id  Business Category Id.
* @apiParam {String} category_id  Category Id.
* @apiParam {String} sub_category_id Sub Category Id.
* @apiParam {String} page_no Page No.
* @apiParam {String} keyword keyword for search
* @apiParam {String} brand_id  for Brand id for filter
* @apiParam {Number} rating  for rating
* @apiParam {String} price_start  Price start range 
* @apiParam {String} price_end  Price end range
* @apiParam {String} sortby  for sort by for sorting values(newest/price_high_to_low/price_low_to_high)
* @apiParam {String} filter  [{"5f8974d737fa3ff222404686":["5f8974d737fa3ff4046862ff","5f8974d737fa3ff404686308"]},{"5f8974d737ff222404686222":["5fb3c6e54eba4a38ac7f5aea","5fbe2eaedac2e837fc130c05"]}]
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
  "message": "Success",
  "data": {
    "docs": [
      {
        "_id": "6045a7e04485c00b0e36535d",
        "main_product_id": "6045a7e04485c00b0e36535c",
        "name": "OPPO Reno5 Pro 5G",
        "inventory_name": "Smartphones",
        "images": [
          {
            "_id": "6045a7e04485c00b0e36535e",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769682571OLBwyCg0L.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769682571OLBwyCg0L.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e36535f",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769683571sDX2RCbGL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769683571sDX2RCbGL.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365361",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769684581ikLxT6PL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769684581ikLxT6PL.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365363",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769687081rDtQh9xFL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769687081rDtQh9xFL.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365365",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696879714WOEKK1vL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696879714WOEKK1vL.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365366",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696905718T5Txm4dL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696905718T5Txm4dL.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365368",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1615177696975813EayRQE8L.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1615177696975813EayRQE8L.SL1500.jpg"
          },
          {
            "_id": "6045a7e04485c00b0e365369",
            "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/16151776969828145DElqceL.SL1500.jpg",
            "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_16151776969828145DElqceL.SL1500.jpg"
          }
        ],
        "business_category": {
          "_id": "5fe97c9112d5874bdd5db00f",
          "name": "Electronics"
        },
        "category": {
          "_id": "5fe97db612d5874bdd5db012",
          "name": "Mobiles"
        },
        "subcategory": {
          "_id": "6045a7064485c00b0e36534b",
          "name": "SmartPhones"
        },
        "available_quantity": 37,
        "price": 20000,
        "is_favourite": 1,
        "description": "3D Borderless Sense Screen | AI Highlight Video (Ultra Night Video + Live HDR) | Super AMOLED Display\n64MP + 8MP + 2MP + 2MP | 32MP Front Camera\nInnovative 65W SuperVOOC 2.0 flash charging brings the 4350 mAh battery,5 minutes charging & 4hours of video playback, fully charging in 30 minutes.\n16.64 cm (6.55 inch) Full HD+ Display with 2400x1080 resolution.\nColor OS 11.1 based on Android v11.0 operating system with 2.6GHz MediaTek Dimensity 1000+ (MT6889) Processor, ARM G77 MC9 836 MHz",
        "discount_type": 2,
        "discount_value": 0,
        "is_discount": 0,
        "offer_price": 20000,
        "rating": "5",
        "newprice": 20000
      }
    ],
    "totalDocs": 1,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/get_products",
"message": "error.",
"data": {}
}
*/
getProducts: async (req, res) => {

    try {
        if (req.headers.authorization && req.headers.authorization != '') {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
        } else {
            var login_user_id = '';
        }

        var business_category_id = req.body.business_category_id || "";
        var category_id = req.body.category_id || "";
        var sub_category_id = req.body.sub_category_id || "";
        var brand_id = req.body.brand_id || "";
        var keyword = req.body.keyword || "";
        var sortby = req.body.sortby;
        var price_start = req.body.price_start || "";
        var price_end = req.body.price_end || "";
        var page = parseInt(req.body.page_no) || 1;
        var productfilter = req.body.filter || [];
        var rating = req.body.rating || "";

        var limit = 10;


        //////// for sort/////////////////////////////
        var sortPattern = {};
        if (sortby && sortby != "") {
            if (sortby == 'newest') {
                sortPattern = { 'createdAt': -1 };
            }
            if (sortby == 'price_high_to_low') {
                sortPattern = { 'newprice': -1 };
            }
            if (sortby == 'price_low_to_high') {
                sortPattern = { 'newprice': 1 };
            }

        } else {
            sortPattern = { 'createdAt': 1 };
        }
        ////////////////////////////// end sort/////////////////////////////


        //////////////////////////// For  Filter/////////////////////////////
        var filter = {
            is_active: 1,
            is_deleted: 0,
        };

        var otherfilter = {};

        if (keyword == "") {
            otherfilter = {
                'Products.sub_category_id': ObjectId(sub_category_id),
                'Products.business_category_id': ObjectId(business_category_id),
                'Products.category_id': ObjectId(category_id)
            }
        }

        if (brand_id && brand_id != '') {
            otherfilter["$and"] = [
                { 'Products.brand_id': ObjectId(brand_id) },
            ];
        }
        var pricefilter = {};
        if (price_start != '' && price_end != '') {
            pricefilter["$and"] = [
                { 'newprice': { "$gte": parseInt(price_start) } },
                { 'newprice': { "$lte": parseInt(price_end) } }
            ]
        }else if (price_start != '' ) {
            pricefilter["$and"] = [
                { 'newprice': { "$gte": parseInt(price_start) } },
            ]
        }else if(price_end != '') {
            pricefilter["$and"] = [
                { 'newprice': { "$lte": parseInt(price_end) } }
            ]
        }


        productfilter = JSON.parse(productfilter);
        var newfilter = [];

        productfilter.forEach(el => {
            newfilter = [...newfilter, ...Object.values(el)]
        });
        newfilter = [].concat.apply([], newfilter);
        newfilter = newfilter.map(s => ObjectId(s));
        var aggregateConditionForproduct = [
            { $match: { $expr: { $in: ["$customization_value", newfilter] } } },
            {
                $group: { _id: "$product_inventry_id" }
            }
        ]
        let allProductIds = await ProductCustomizationServices.allRecord(aggregateConditionForproduct);
        allProductIds = allProductIds.map(v => v._id);


        var filterbyids = {};
        if (allProductIds.length > 0) {
            filterbyids = { $expr: { $in: ["$_id", allProductIds] } }
        }

        var filterbyRating = {}
        if (rating != "") {
            filterbyRating["$and"] = [
                { 'rating': { "$gte": parseInt(rating) } },
                { 'rating': { "$lt": parseInt(rating) + 1 } },
            ]
        }
        

        let aggregateCondition = [
            { $match: filter },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id" },
                    pipeline: [
                        {
                            $match: {
                                $and: [{ $expr: { $eq: ["$_id", "$$id"] } }, { $expr: { $eq: ["$is_active", 1] } }, { $expr: { $eq: ["$is_deleted", 0] } }]
                            }
                        },
                        { $unset: ['createdAt', 'updatedAt', '__v'] },
                    ],
                    as: 'Products'
                }
            },
            { $unwind: "$Products" },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$Products.business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $match:{
                                  $and: [
                                    { $expr: { $eq: ["$is_active", 1] } },
                                    { $expr: { $eq: ["$is_deleted", 0] } }
                                ]
                            }
                        },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }

            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'product_images',
                    let: { "images": "$Products.images" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                        {
                            $project: {
                                'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                            }
                        }
                    ],
                    as: 'ProductImages'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $match:{
                                  $and: [
                                    { $expr: { $eq: ["$is_active", 1] } },
                                    { $expr: { $eq: ["$is_deleted", 0] } }
                                ]
                            }
                        },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }

            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $match:{
                                  $and: [
                                    { $expr: { $eq: ["$is_active", 1] } },
                                    { $expr: { $eq: ["$is_deleted", 0] } }
                                ]
                            }
                        },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },
            {
                $lookup: {
                    from: 'favourite_items',
                    let: { "product_id": "$_id", 'id': login_user_id },
                    pipeline: [
                        {
                            $match:
                            {
                                $and: [
                                    { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                    { $expr: { $eq: ["$user_id", "$$id"] } },
                                    { $expr: { $eq: ["$is_active", 1] } }
                                ]
                            }
                        },
                    ],
                    as: 'favouriteDate'
                }
            },
            {
                $addFields:
                {
                    newprice:
                    {
                        $cond: {
                            if: { $eq: ["$is_discount", 0] },
                            then: "$price",
                            else: "$discounted_product_price"
                        }
                    },
                    //   totalrating: { $avg: "$ratings.rating" },
                    rating:  { $toString: { $avg: "$ratings.rating" } },
                }
            },
            {
                $match:
                {
                    $or: [
                        { "businessCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        { "CategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        { "SubCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        { "Products.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                    ]
                }
            },
            { $match: filterbyids },
            { $match: otherfilter },
            { $match: pricefilter },
            { $match: filterbyRating },
            { $sort: sortPattern },
            {
                $project: {
                    _id: "$_id",
                    main_product_id: '$Products._id',
                    name: "$Products.name",
                    inventory_name: '$inventory_name',
                    images: "$ProductImages",
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    available_quantity: '$product_quantity',
                    min_inventory: '$min_inventory',
                    price: "$price",
                    is_favourite: { $size: "$favouriteDate" },
                    description: '$Products.description',
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    is_discount: "$is_discount",
                    offer_price: "$discounted_product_price",
                    rating: { $toString: "$rating" },
                    newprice: "$newprice",
                    createdAt:1
                }
            },

        ];
        console.log(JSON.stringify(aggregateCondition));

        //  const activeMatches = await Product.aggregate(aggregateCondition);
        //     res.status(200).json(activeMatches);

        ProductInventoryServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, userdata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},
/**
 * @api {get} /user_service/customer/product/get_product_detail/:product_id Product - Details 
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product/get_product_detail/5f883814eb8b082d3404edc9",
    "message": "Success",
    "data": [
        {
            "_id": "5f883814eb8b082d3404edc9",
            "name": "Redmi note 10",
            "inventry_name": "Red ,64 GB",
            "price": 500.5,
            "quantity": 2,
            "product_code": "Ele-Mob-Sam-4222-Red",
            "images": [
                {
                    "_id": "5f883815eb8b082d3404edca",
                    "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                    "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
                }
            ],
            "business_category": {
                "_id": "5f74508abd58a077d3db6329",
                "name": "Electronics"
            },
            "product_category": {
                "_id": "5f75b6292fa6b92669f3a7fb",
                "name": "Mobiles"
            },
            "product_subcategory": [
                {
                    "_id": "5f75b811a0236828b231fd68",
                    "name": "Samsung"
                }
            ],
            "customizations": [
                {
                    "_id": "5f883815eb8b082d3404edcb",
                    "title": {
                        "_id": "5f8974d737fa3ff404686305",
                        "name": "RAMS",
                        "value": {
                            "_id": "5f8974d737fa3ff404686308",
                            "name": "5"
                        }
                    }
                },
                {
                    "_id": "5f883815eb8b082d3404edcd",
                    "title": {
                        "_id": "5f87e04ab695872c68a55ba9",
                        "name": "Color",
                        "value": {
                            "_id": "5f8974d737fa3ff4046862ff",
                            "name": "Red"
                        }
                    }
                }
            ]
        }
    ]
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/product/get_product_detail/5f7c42ce754bf32e54cb458a",
        "message": "Error.",
        "data": {}
    }
*/
getProductDetail: async (req, res) => {
    try {

        var product_id = req.body.product_id;
        if (req.headers.authorization && req.headers.authorization != '') {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
        } else {
            var login_user_id = '';
        }
        var findPattern = { _id: ObjectId(product_id) };
        var aggregatefilter = [
            { $match: findPattern },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id", },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $lookup: {
                                from: 'product_images',
                                let: { "images": "$images", },
                                pipeline: [
                                    { $match: { $expr: { $in: ["$_id", "$$images"] } } },
                                    {
                                        $project: {
                                            'product_image_url': {
                                                $cond: [
                                                    { $eq: ['$image', ''] },
                                                    { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                                    { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] }, // then
                                                ]
                                            },
                                            "product_image_thumb_url": {
                                                $cond: [
                                                    { $eq: ['$image', ''] },
                                                    { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                                    { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }, // then
                                                ]
                                            },
                                        }
                                    }
                                ],
                                as: 'ProductImagesData'
                            }
                        },
                        {
                            $lookup: {
                                from: 'business_categories',
                                let: { "id": "$business_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { "name": 1 ,"is_active":1,"is_deleted":1} }
                                ],
                                as: 'businessCategoryData'
                            }

                        },
                        { $unwind: "$businessCategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1,"is_active":1,"is_deleted":1 } }],
                                as: 'CategoryData'
                            }

                        },
                        { $unwind: "$CategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$sub_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1,"is_active":1,"is_deleted":1 } }],
                                as: 'SubCategoryData'
                            }

                        },
                        { $unwind: "$SubCategoryData" },
                        {
                            $lookup: {
                                from: 'favourite_items',
                                let: { "product_id": ObjectId(product_id), 'id': login_user_id },
                                pipeline: [
                                    {
                                        $match:
                                        {
                                            $and: [
                                                { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                                { $expr: { $eq: ["$user_id", "$$id"] } },
                                                { $expr: { $eq: ["$is_active", 1] } }
                                            ]
                                        }
                                    },
                                ],
                                as: 'favouriteDate'
                            }
                        },
                    ],
                    as: 'ProductsData'
                }
            },
            { $unwind: '$ProductsData' },
            {
                $lookup: {
                    from: 'product_customizations',
                    let: { "id": "$_id", },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$product_inventry_id", "$$id"] } } },
                        { $match: { $expr: { $eq: ["$is_deleted", 0] } } },
                        {
                            $lookup: {
                                from: 'customization_types',
                                let: { "id": "$customization_type", "typevalue": "$customization_value" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $match: { $expr: { $eq: ["$is_deleted", 0] } } },
                                    { $project: { name: 1, 'typevalue': "$$typevalue" } },
                                    {
                                        $lookup: {
                                            from: 'customization_types',
                                            let: { "tid": "$$typevalue" },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ["$_id", "$$tid"] } } },
                                                { $project: { "name": 1 } }
                                            ],
                                            as: 'ProductCustomizationValueData'
                                        }
                                    },
                                    { $unwind: '$ProductCustomizationValueData' },
                                    { $project: { "name": 1, "value": '$ProductCustomizationValueData', 'parent_id': 1 } }
                                ],
                                as: 'ProductCustomizationTypeData'
                            }
                        },
                        { $unwind: '$ProductCustomizationTypeData' },
                        {
                            $project: {
                                title: '$ProductCustomizationTypeData',
                            }
                        }
                    ],
                    as: 'ProductCustomizationData'
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    let: { "id": "$ProductsData.brand_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'BrandData'
                }
            },
            { $unwind: "$BrandData" },
            {
                $addFields:
                {
                    newprice:
                    {
                        $cond: {
                            if: { $eq: ["$is_discount", 0] },
                            then: "$price",
                            else: "$discounted_product_price"
                        }
                    },

                    totalrating: { $toString: { $avg: "$ratings.rating" } },
                    ratingCount: { $toString: { $size: "$ratings" } },
                }
            },
            {
                $project: {
                    name: '$ProductsData.name',
                    main_product_id: '$ProductsData._id',
                    inventory_name: '$inventory_name',
                    price: '$price',
                    quantity: '$product_quantity',
                    min_inventory: '$min_inventory',
                    product_code: '$product_code',
                    images: '$ProductsData.ProductImagesData',
                    business_category: '$ProductsData.businessCategoryData',
                    category: '$ProductsData.CategoryData',
                    subcategory: '$ProductsData.SubCategoryData',
                    customizations: '$ProductCustomizationData',
                    description: '$ProductsData.description',
                    is_favourite: { $size: "$ProductsData.favouriteDate" },
                  //  brand: "test",
                    is_discount: "$is_discount",
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    offer_price: "$discounted_product_price",
                    rating: "$totalrating",
                    ratingCount : "$ratingCount",
                    brand: '$BrandData',
                    availble:{
                        $cond: { 
                            if: { 
                                $and:[
                                    { $and:[ {$eq: [ "$ProductsData.is_active", 1 ] },{$eq: [ "$ProductsData.is_deleted", 0 ] }]},
                                    { $and:[ {$eq: [ "$ProductsData.businessCategoryData.is_active", 1 ] },{$eq: [ "$ProductsData.businessCategoryData.is_deleted", 0 ] }]},
                                    { $and:[ {$eq: [ "$ProductsData.CategoryData.is_active", 1 ] },{$eq: [ "$ProductsData.CategoryData.is_deleted", 0 ] }]},
                                    { $and:[ {$eq: [ "$ProductsData.SubCategoryData.is_active", 1 ] },{$eq: [ "$ProductsData.SubCategoryData.is_deleted", 0 ] }]}
                                    ]
                            },
                            then: 1, else: 0 }
                    }
                }
            }
            // {$unwind: '$ProductCustomizationData'}
        ];

        ProductInventoryServices.oneRecord(aggregatefilter).then(productData => {
            if (productData) {
                let resMsg = "Success";
                var newproductData = {
                    product: productData
                };
                Response.send(req, res, 200, resMsg, newproductData);
            } else {
                let resMsg = Messages.PRODUCT_NOT_EXIST;
                Response.send(req, res, 400, resMsg);
            }
        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        })
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},


/**
    * @api {get} /user_service/customer/product/brand/get_brands Product Brand - Listing
    * @apiGroup App - Customer - Product
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} page_no Page No.
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
        "docs": [
        {
            "is_active": 1,
            "is_deleted": 0,
            "_id": "5ff2cc953033ab78c3cc7e92",
            "name": "Ambipur",
            "createdAt": "2021-01-04T08:06:45.132Z",
            "updatedAt": "2021-01-04T08:06:45.143Z",
            "__v": 0,
            "image_path": "1609747605134Ambipur.png",
            "image_path_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/brands/5ff2cc953033ab78c3cc7e92/1609747605134Ambipur.png",
            "image_path_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/brands/5ff2cc953033ab78c3cc7e92/thumb_1609747605134Ambipur.png",
            "id": "5ff2cc953033ab78c3cc7e92"
        }
        ],
        "totalDocs": 40,
        "limit": 100,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/brand/get_brands",
    "message": "error.",
    "data": {}
    }
    */
getBrands: (req, res) => {

    try {

        var status = req.query.status;
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 100;

        var findPattern = { 'is_deleted': 0, 'is_active': 1 };

        if (status && status != "") {
            findPattern.is_active = parseInt(status);
        }
        var sortPattern = { name: 1 };

        BrandServices.getPaginatedData(findPattern, sortPattern, page, limit).then(branddata => {

            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, branddata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });

    } catch (err) {
        Response.send(req, res, 500, err.message)
    }
},


/**
* @api {get} /user_service/customer/product/banner/get_banners Product Banners - Listing
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} page_no Page No.
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
"message": "Success",
"data": {
    "docs": [
    {
        "description": "Grab the biggest beauty sale. Limited time hurry up Flat 30% Discount",
        "_id": "602cce94bd77a05171d5b266",
        "title": "Athwas Launch Offer Promo Code (launch30)",
        "banner_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/banners/602cce94bd77a05171d5b266/161503218351630percentoffpromotion2227146.jpg",
        "banner_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/banners/602cce94bd77a05171d5b266/thumb_161503218351630percentoffpromotion2227146.jpg",
        "business_category": {
        "_id": "602cc062bd77a05171d5b1f5",
        "name": "Beauty, Health and Personal Care"
        },
        "category": {
        "_id": "604203484485c00b0e365201",
        "name": "Makeup"
        },
        "subcategory": {
        "_id": "60436ba34485c00b0e36529f",
    "name": "Makeup Kits"
        },
        "is_active": 1
    },
    ],
    "totalDocs": 2,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
    }
}

*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/brand/get_brands",
"message": "error.",
"data": {}
}
*/
getBannerList: async (req, res) => {
    try {

        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;

        var findPattern = {
            is_deleted: 0,
            is_active: 1,
        };

        var sortPattern = { createdAt: -1 };

        let aggregateCondition = [
            { $match: findPattern },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }
            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }
            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }
            },
            { $unwind: "$SubCategoryData" },
            {
                $lookup: {
                    from: 'product_inventories',
                    let: { "id": "$product_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'inventory_name': 1 } }
                    ],
                    as: 'productInventoriesData'
                }
            },
            { $unwind: "$productInventoriesData" },
            // {
            //     $match:
            //     {
            //         $or: [
            //             { "businessCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
            //             { "CategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
            //             { "SubCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
            //             { "productData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
            //             { "title": { $regex: '.*' + keyword + '.*', $options: 'i' } },
            //         ]
            //     }
            // },
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    description: 1,
                    'banner_image_url': { $concat: [UPLOAD_BANNER_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$banner_image"] },
                    "banner_image_thumb_url": { $concat: [UPLOAD_BANNER_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$banner_image"] },
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    //product: "$productInventoriesData.inventory_name",
                    is_active: '$is_active',
                }
            },
        ];

        BannerServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, userdata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},


/**
     * @api {post} /user_service/customer/product/similar_products Product - Similar Product - Listing
     * @apiGroup App - Customer - Product
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
     {
     "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} sub_category_id Sub Category Id 
    * @apiParam {String} product_id Sub Category Id product_id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product/similar_products",
    "message": "Success",
    "data": {
    "docs": [
            {
                "_id": "5f883814eb8b082d3404edc9",
                "name": "Redmi note 10",
                "inventry_name": "Red ,64 GB",
                "images": [
                    {
                        "_id": "5f883815eb8b082d3404edca",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
                    },
                    {
                        "_id": "5f883815eb8b082d3404edcc",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png"
                    }
                ],
                "business_category": {
                    "_id": "5f74508abd58a077d3db6329",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5f75b6292fa6b92669f3a7fb",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "5f75b811a0236828b231fd68",
                    "name": "Samsung"
                },
                "price": 500.5
            },
            {
                "_id": "5f8e73f08a613f62470f6e20",
                "name": "Redmi note 10",
                "inventry_name": "Black ,64 GB",
                "images": [
                    {
                        "_id": "5f883815eb8b082d3404edca",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
                    },
                    {
                        "_id": "5f883815eb8b082d3404edcc",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png"
                    }
                ],
                "business_category": {
                    "_id": "5f74508abd58a077d3db6329",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5f75b6292fa6b92669f3a7fb",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "5f75b811a0236828b231fd68",
                    "name": "Samsung"
                },
                "price": 600.5
            }
        ],
        "totalDocs": 2,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product/similar_products",
    "message": "error.",
    "data": {}
    }
    */
similarProductList: async (req, res) => {
    try {

        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;
        var sub_category_id = req.body.sub_category_id || '';
        var product_id = req.body.product_id || '';


        var findPattern = {
            is_deleted: 0,
            is_active: 1,
            _id: { $nin: [ObjectId(product_id)] },
        };

        var sortPattern = { createdAt: -1 };

        let aggregateCondition = [
            { $match: findPattern },

            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id", 'searchid': ObjectId(sub_category_id) },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and: [
                                        { $eq: ["$_id", "$$id"] },
                                        { $eq: ["$sub_category_id", "$$searchid"] },
                                    ]
                                }, "is_deleted": 0
                            }
                        },
                        {
                            $lookup: {
                                from: 'product_images',
                                let: { "images": "$images" },
                                pipeline: [
                                    { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                                    {
                                        $project: {
                                            'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                            "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                                        }
                                    }
                                ],
                                as: 'ProductImages'
                            }
                        },
                        {
                            $lookup: {
                                from: 'business_categories',
                                let: { "id": "$business_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { "name": 1 } }
                                ],
                                as: 'businessCategoryData'
                            }
                        },
                        { $unwind: "$businessCategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1 } }],
                                as: 'CategoryData'
                            }
                        },
                        { $unwind: "$CategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$sub_category_id", },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id",] } } },
                                    { $project: { 'name': 1, } }],
                                as: 'SubCategoryData'
                            }
                        },
                        { $unwind: "$SubCategoryData" },
                        // { $project: { 'name': 1 } }
                    ],
                    as: 'productData'
                }
            },
            { $unwind: "$productData" },

            {
                $project: {
                    _id: "$_id",
                    name: "$productData.name",
                    inventory_name: "$inventory_name",
                    images: "$productData.ProductImages",
                    business_category: "$productData.businessCategoryData",
                    category: "$productData.CategoryData",
                    subcategory: "$productData.SubCategoryData",
                    price: "$price",
                    description: "$description",
                    is_discount: "$is_discount",
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    offer_price: "$discounted_product_price",
                    rating: "5",
                }
            },
        ];

        ProductInventoryServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, userdata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},



/**
     * @api {post} /user_service/customer/product/other_customization_products Product - Other Customization Product - Listing
     * @apiGroup App - Customer - Product
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
     {
     "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} main_product_id Main Product Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product/other_customization_products",
    "message": "Success",
    "data": {
    "docs": [
            {
                "_id": "5f883814eb8b082d3404edc9",
                "name": "Redmi note 10",
                "inventry_name": "Red ,64 GB",
                "images": [
                    {
                        "_id": "5f883815eb8b082d3404edca",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
                    },
                    {
                        "_id": "5f883815eb8b082d3404edcc",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png"
                    }
                ],
                "business_category": {
                    "_id": "5f74508abd58a077d3db6329",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5f75b6292fa6b92669f3a7fb",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "5f75b811a0236828b231fd68",
                    "name": "Samsung"
                },
                "price": 500.5
            },
            {
                "_id": "5f8e73f08a613f62470f6e20",
                "name": "Redmi note 10",
                "inventry_name": "Black ,64 GB",
                "images": [
                    {
                        "_id": "5f883815eb8b082d3404edca",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
                    },
                    {
                        "_id": "5f883815eb8b082d3404edcc",
                        "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png",
                        "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png"
                    }
                ],
                "business_category": {
                    "_id": "5f74508abd58a077d3db6329",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5f75b6292fa6b92669f3a7fb",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "5f75b811a0236828b231fd68",
                    "name": "Samsung"
                },
                "price": 600.5
            }
        ],
        "totalDocs": 2,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product/other_customization_products",
    "message": "error.",
    "data": {}
    }
    */

OtherProductList: async (req, res) => {
    try {
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;
        var main_product_id = req.body.main_product_id || '';

        var findPattern = {
            is_deleted: 0,
            is_active: 1,
            product_id: ObjectId(main_product_id)
        };

        var sortPattern = { createdAt: -1 };

        let aggregateCondition = [
            { $match: findPattern },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and: [
                                        { $eq: ["$_id", "$$id"] },
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'product_images',
                                let: { "images": "$images" },
                                pipeline: [
                                    { $match: { $expr: { $in: ["$_id", "$$images"] } } },
                                    { $limit: 1 },
                                    {
                                        $project: {
                                            // 'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                            "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                                        }
                                    },
                                    { $project: { product_image_thumb_url: 1 } }
                                ],
                                as: 'ProductImages'
                            }
                        },
                        { $unwind: '$ProductImages' },
                        {
                            $lookup: {
                                from: 'business_categories',
                                let: { "id": "$business_category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { "name": 1 } }
                                ],
                                as: 'businessCategoryData'
                            }
                        },
                        { $unwind: "$businessCategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$category_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { 'name': 1 } }],
                                as: 'CategoryData'
                            }
                        },
                        { $unwind: "$CategoryData" },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { "id": "$sub_category_id", },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id",] } } },
                                    { $project: { 'name': 1, } }],
                                as: 'SubCategoryData'
                            }
                        },
                        { $unwind: "$SubCategoryData" },
                        // { $project: { 'name': 1 } }
                    ],
                    as: 'productData'
                }
            },
            { $unwind: "$productData" },
            {
                $lookup: {
                    from: 'product_customizations',
                    let: { "id": "$_id", },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$product_inventry_id", "$$id"] } } },
                        {
                            $lookup: {
                                from: 'customization_types',
                                let: { "id": "$customization_type", "typevalue": "$customization_value" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                    { $project: { name: 1, 'typevalue': "$$typevalue" } },
                                    {
                                        $lookup: {
                                            from: 'customization_types',
                                            let: { "tid": "$$typevalue" },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ["$_id", "$$tid"] } } },
                                                { $project: { "name": 1 } }
                                            ],
                                            as: 'ProductCustomizationValueData'
                                        }
                                    },
                                    { $unwind: '$ProductCustomizationValueData' },
                                    { $project: { "name": 1, "value": '$ProductCustomizationValueData', 'parent_id': 1 } }
                                ],
                                as: 'ProductCustomizationTypeData'
                            }
                        },
                        { $unwind: '$ProductCustomizationTypeData' },
                        // {
                        //     $project: {
                        //         title: '$ProductCustomizationTypeData',
                        //     }
                        // }
                    ],
                    as: 'ProductCustomizationData'
                },
            },
            {
                $project: {
                    _id: "$_id",
                    name: "$productData.name",
                    inventory_name: "$inventory_name",
                    customize: "$ProductCustomizationData.ProductCustomizationTypeData",
                    images: "$productData.ProductImages.product_image_thumb_url",
                    price: "$price",
                    description: "$description",
                    is_discount: "$is_discount",
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    offer_price: "$discounted_product_price",
                    rating: "5",
                }
            },
        ];
        ProductInventoryServices.allRecord(aggregateCondition, sortPattern, page, limit).then(userdata => {
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, userdata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},


/**
* @api {post} /user_service/customer/product/notifyme Product - Notify ME
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} product_id Product Id
* 
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
"status": "success",
"api_name": "/product/notifyme",
"message": "You have been notify , when product is available",
"data": {}
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/notifyme",
"message": "error.",
"data": {}
}
*/
notifyMe: async (req, res) => {
    //try {
    var product_id = req.body.product_id;
    var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

    var findPattern = { _id: ObjectId(product_id) };
    var aggregate = [
        { $match: findPattern }
    ];


    ProductInventoryServices.oneRecord(aggregate).then(cartResult => {

        if (cartResult) {
            var createPatteren = {
                user_id: ObjectId(login_user_id)
            }
            var newfindPattern = { _id: ObjectId(product_id), "notify_me.user_id": { $ne: ObjectId(login_user_id) } };

            ProductInventoryServices.updateRecord(newfindPattern, { $push: { notify_me: createPatteren } }).then(updatedRes => {

                var sussMessage = Messages.NOTIFY_ME;
                Response.send(req, res, 200, sussMessage);
            }).catch(err => {
                var errMessage = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errMessage);
            })
        } else {
            var succMessage = Messages.PRODUCT_NOT_EXIST;
            Response.send(req, res, 200, succMessage);
        }
    }).catch(err => {
        var errMessage = Validation.getErrorMessage(err);
        Response.send(req, res, 500, errMessage);
    })

    // } catch (err) {
    //     var errMessage = Validation.getErrorMessage(err);
    //     Response.send(req, res, 500, errMessage);
    // }
},


/**
* @api {get} /user_service/customer/product/customizationtype/:category_id Product - Customization Type
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} category_id Category Id
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
  "message": "Customization type list fetch successfully.",
  "data": {
        "docs": [
        {
            "_id": "5ff042ee3033ab78c3cc7dd8",
            "name": "Storage"
        },
        {
            "_id": "5ff6f2bc00c9c043c8c97a59",
            "name": "ML"
        },
        {
            "_id": "5fe998be12d5874bdd5db019",
            "name": "Ram"
        }
        ],
    "totalDocs": 3,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/customizationtype/:category_id",
"message": "error.",
"data": {}
}
*/

getCustomizationType: async (req, res) => {
    try {
        var category_id = req.params.category_id || "";
        var errors = [];

        if (category_id && category_id == "") {
            errors.push({ errField: "category_id", errText: Messages.INVALID_IMAGE_FORMAT });
        }

        // return errors
        if (errors.length > 0) {
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });
        } else {
            var aggregateCondition = [
                {
                    $lookup: {
                        from: 'products',
                        let: { "id": "$product_id", "category_id": category_id },
                        pipeline: [
                            {
                                $match:
                                {
                                    $and: [
                                        { $expr: { $eq: ["$_id", "$$id"] } },
                                    ]
                                }
                            },
                            { $project: { 'name': 1, 'category_id': 1 } }],
                        as: 'ProductData'
                    }
                },
                {
                    $lookup: {
                        from: 'customization_types',
                        let: { "id": "$customization_type", "typevalue": "$customization_value" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { name: 1, 'typevalue': "$$typevalue" } },
                        ],
                        as: 'ProductCustomizationTypeData'
                    }
                },
                { $unwind: '$ProductCustomizationTypeData' },
                {
                    $match: { 'ProductData.category_id': ObjectId(category_id) }
                },
                {
                    $group: {
                        _id: '$ProductCustomizationTypeData._id',
                        name: { $first: '$ProductCustomizationTypeData.name' },
                    }
                }

            ];
            var sortPattern = { createdAt: -1 };
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            ProductCustomizationServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(resultProduct => {
                let resMsg = Messages.CUSTOMIZE_TYPE_FETCH_SUCCESSFULLY;
                Response.send(req, res, 200, resMsg, resultProduct);
            }).catch(error => {
                let resMsg = Validation.getErrorMessage(error);
                Response.send(req, res, 500, resMsg);
            })
        }
    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},


/**
* @api {get} /user_service/customer/product/customizationsubtype/:customizationtype_id Product - Customization Sub Type
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} customizationtype_id Customization Type Id
* 
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
  "message": "Customization sub type list fetch successfully.",
  "data": {
    "customizationsub_type": [
      {
        "_id": "5ff042fa3033ab78c3cc7dd9",
        "name": "32GB",
        "createdAt": "2021-01-02T09:55:06.820Z"
      },
      {
        "_id": "5ff043033033ab78c3cc7dda",
        "name": "64GB",
        "createdAt": "2021-01-02T09:55:15.676Z"
      },
      {
        "_id": "5ff0430c3033ab78c3cc7ddb",
        "name": "128GB",
        "createdAt": "2021-01-02T09:55:24.495Z"
      }
    ]
  }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/customizationsubtype/:category_id",
"message": "error.",
"data": {}
}
*/

getCustomizationSubType: async (req, res) => {
    try {
        var customizationtype_id = req.params.customizationtype_id || "";
        var errors = [];

        if (customizationtype_id && customizationtype_id == "") {
            errors.push({ errField: "customizationtype_id", errText: Messages.INVALID_IMAGE_FORMAT });
        }

        // return errors
        if (errors.length > 0) {
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });
        } else {
            var aggregateCondition = [
                {
                    $lookup: {
                        from: 'customization_types',
                        let: { "tid": ObjectId(customizationtype_id) },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$parent_id", "$$tid"] } } },
                            { $project: { "name": 1, createdAt: 1 } }
                        ],
                        as: 'ProductCustomizationValueData'
                    }
                },
                { $unwind: '$ProductCustomizationValueData' },
                {
                    $group: {
                        _id: '$ProductCustomizationValueData._id',
                        name: { $first: '$ProductCustomizationValueData.name' },
                        createdAt: { $first: '$ProductCustomizationValueData.createdAt' },
                    }
                },
                { $sort: { "createdAt": 1 } }

            ];
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            ProductCustomizationServices.allRecord(aggregateCondition).then(resultProduct => {
                var result = {
                    customizationsub_type: resultProduct
                }
                let resMsg = Messages.CUSTOMIZE_SUBTYPE_FETCH_SUCCESSFULLY;
                Response.send(req, res, 200, resMsg, result);
            }).catch(error => {
                let resMsg = Validation.getErrorMessage(error);
                Response.send(req, res, 500, resMsg);
            })
        }
    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},


/**
* @api {post} /user_service/customer/product/listbyfilter Product - Listing By Filter
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} business_category_id  Business Category Id.
* @apiParam {String} filter  [{"5f8974d737fa3ff222404686":["5f8974d737fa3ff4046862ff","5f8974d737fa3ff404686308"]},{"5f8974d737ff222404686222":["5fb3c6e54eba4a38ac7f5aea","5fbe2eaedac2e837fc130c05"]}]
* @apiParam {String} category_id  Category Id.
* @apiParam {String} sub_category_id Sub Category Id.
* @apiParam {String} sub_category_id Sub Category Id.
* @apiParam {String} page_no Page No.

* @apiParam {String} brand_id  for Brand id for filter
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
    "status": "success",
    "api_name": "/product/listbyfilter",
    "message": "Success",
    "data": {
        "docs": [
            {
                "_id": "5f7dc621b5849b1c50de79ae",
                "name": "Maggi",
                "images": [
                    {
                        "_id": "5f7dc621b5849b1c50de79b2",
                        "product_image_url": "http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png",
                        "product_image_thumb_url": "http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png"
                    },
                    {
                        "_id": "5f7dc621b5849b1c50de79b3",
                        "product_image_url": "http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png",
                        "product_image_thumb_url": "http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png"
                    }
                ],
                "business_category": {
                    "_id": "5f7449b1769cc375d2f49929",
                    "name": "Clothes"
                },
                "category": {
                    "_id": "5f75b6292fa6b92669f3a7fb",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "5f75b6e80b0e2127b1361e3d",
                    "name": "Prod subcat 1"
                },
                "price": "200"
            }
        ],
        "totalDocs": 1,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/listbyfilter",
"message": "error.",
"data": {}
}
*/
getProductsByFilter: async (req, res) => {
    try {

        if (req.headers.authorization && req.headers.authorization != '') {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
        } else {
            var login_user_id = '';
        }
        var sortby = req.body.sortby;
        var business_category_id = req.body.business_category_id || "";
        var category_id = req.body.category_id || "";
        var sub_category_id = req.body.sub_category_id || "";
        var page = parseInt(req.body.page_no) || 1;
        var limit = 10;


        //////// for sort/////////////////////////////
        var sortPattern = {};
        if (sortby && sortby != "") {
            if (sortby == 'newest') {
                sortPattern = { 'createdAt': -1 };
            }
            if (sortby == 'price_high_to_low') {
                sortPattern = { 'price': -1 };
            }
            if (sortby == 'price_low_to_high') {
                sortPattern = { 'price': 1 };
            }

        } else {
            sortPattern = { 'createdAt': 1 };
        }
        ////////////////////////////// end sort/////////////////////////////


        //////////////////////////// For  Filter/////////////////////////////
        var productfilter = {
            is_active: 1,
            is_deleted: 0,
        };

        var filter = req.body.filter || [];
        filter = JSON.parse(filter);
        var newfilter = [];

        filter.forEach(el => {
            newfilter = [...newfilter, ...Object.values(el)]
        });
        newfilter = [].concat.apply([], newfilter);
        newfilter = newfilter.map(s => ObjectId(s));
        var aggregateConditionForproduct = [
            { $match: { $expr: { $in: ["$customization_value", newfilter] } } },
            {
                $group: { _id: "$product_inventry_id" }
            }
        ]
        let allProductIds = await ProductCustomizationServices.allRecord(aggregateConditionForproduct);
        allProductIds = allProductIds.map(v => v._id);


        var filterbyids = {};
        if (allProductIds.length > 0) {
            filterbyids = { $expr: { $in: ["$_id", allProductIds] } }
        }

        var otherfilter = {};
        otherfilter = {
            'Products.sub_category_id': ObjectId(sub_category_id),
            'Products.business_category_id': ObjectId(business_category_id),
            'Products.category_id': ObjectId(category_id)
        }



        let aggregateCondition = [
            { $match: productfilter },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $unset: ['createdAt', 'updatedAt', '__v'] },
                    ],
                    as: 'Products'
                }

            },
            { $unwind: "$Products" },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$Products.business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }

            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'product_images',
                    let: { "images": "$Products.images" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                        {
                            $project: {
                                'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                            }
                        }
                    ],
                    as: 'ProductImages'
                }

            },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }

            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },
            {
                $lookup: {
                    from: 'favourite_items',
                    let: { "product_id": "$_id", 'id': login_user_id },
                    pipeline: [
                        {
                            $match:
                            {
                                $and: [
                                    { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                    { $expr: { $eq: ["$user_id", "$$id"] } },
                                    { $expr: { $eq: ["$is_active", 1] } }
                                ]
                            }
                        },
                    ],
                    as: 'favouriteDate'
                }

            },
            { $match: filterbyids },
            { $match: otherfilter },
            { $sort: sortPattern },
            {
                $project: {
                    _id: "$_id",
                    main_product_id: '$Products._id',
                    name: "$Products.name",
                    inventory_name: '$inventory_name',
                    images: "$ProductImages",
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    available_quantity: '$product_quantity',
                    min_inventory: '$min_inventory',
                    price: "$price",
                    is_favourite: { $size: "$favouriteDate" },
                    description: '$Products.description',
                    offer_price: "500",
                    rating: "5",
                }
            },
        ];

        var sortPattern = { createdAt: -1 };
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;


        ProductInventoryServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(resultProduct => {
            // var result = {
            //     customizationsub_type : resultProduct
            // }
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, resultProduct);
        }).catch(error => {
            let resMsg = Validation.getErrorMessage(error);
            Response.send(req, res, 500, resMsg);
        })

    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},




/**
* @api {get} /user_service/customer/product/popularproduct Product - Popular
* @apiGroup App - Customer - Product
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
"message": "Success",
    "data": {
        "docs": [
        {
            "_id": "5ff9845963a02770e1e797fc",
            "main_product_id": "5ff9845963a02770e1e797fb",
            "name": "Mama earth face wash",
            "inventory_name": "facewash1",
            "images": [
            {
                "_id": "5ff9845963a02770e1e797fd",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/1610187865532CharcoalFaceWash100ml2.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/thumb_1610187865532CharcoalFaceWash100ml2.jpg"
            },
            {
                "_id": "5ff9845963a02770e1e797fe",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/1610187865546CharcoalFaceWash100ml3.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/thumb_1610187865546CharcoalFaceWash100ml3.jpg"
            },
            {
                "_id": "5ff9845963a02770e1e79800",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/1610187865574CharcoalFaceWash100ml.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/5ff9845963a02770e1e797fb/thumb_1610187865574CharcoalFaceWash100ml.jpg"
            }
            ],
            "business_category": {
            "_id": "5ff833ab42f4ff56f8e1c605",
            "name": "Groceries"
            },
            "category": {
            "_id": "5ff983bc63a02770e1e797f7",
            "name": "Skin Care"
            },
            "subcategory": {
            "_id": "5ff983e263a02770e1e797f8",
            "name": "Face Wash"
            },
            "available_quantity": 2,
            "price": 300,
            "is_favourite": 0,
            "description": "The best Face wash",
            "discount_type": 1,
            "discount_value": 20,
            "is_discount": 1,
            "offer_price": 240,
            "rating": "4"
        }
        ],
    "totalDocs": 33,
    "limit": 6,
    "page": 1,
    "totalPages": 6,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/popularproduct",
"message": "error.",
"data": {}
}
*/
getPopularProduct: async (req, res) => {
    try {

        if (req.headers.authorization && req.headers.authorization != '') {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
        } else {
            var login_user_id = '';
        }
        // var sortby = req.body.sortby;
        // var business_category_id = req.body.business_category_id || "";
        // var category_id = req.body.category_id || "";
        var sub_category_id = req.body.sub_category_id || "";
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;


        //////// for sort/////////////////////////////
        var sortPattern = { 'createdAt': 1 };


        // var aggregateConditionForproduct = [
        //     {
        //         $match: { order_status: 2 }
        //     },
        //     {
        //         $project: {
        //             products: "$products.inventory_id"
        //         }
        //     },
        //     { $unwind: "$products" },
        //     {
        //         $group: {
        //             _id: "$products",
        //             myCount: { $sum: 1 }
        //         }
        //     },
        //     { $sort: { myCount: -1 } },
        //     {
        //         $group: {
        //             _id: null,
        //             product: { "$push": "$_id" }
        //         }
        //     },
        // ];

        // var allProductIds = [];
        // await OrderServices.allRecord(aggregateConditionForproduct).then(async result => {
        //     if (result && result[0].product.length > 0) {
        //         allProductIds = result[0].product.map(s => ObjectId(s));
        //     }
        // })
        ////////////////////////////// end sort/////////////////////////////


        //////////////////////////// For  Filter/////////////////////////////
        var productfilter = {
            is_active: 1,
            is_deleted: 0,
        };


        // var filterbyids = {};
        // if (allProductIds.length > 0) {
        //     filterbyids = { $expr: { $in: ["$_id", allProductIds] } }
        // }
        

        let aggregateCondition = [
            { $match: productfilter },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] }, "is_deleted": 0,"is_active":1 } },
                        { $unset: ['createdAt', 'updatedAt', '__v'] },
                    ],
                    as: 'Products'
                }
            },
            { $unwind: "$Products" },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$Products.business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] },"is_deleted": 0,"is_active":1  } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }

            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'product_images',
                    let: { "images": "$Products.images" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                        {
                            $project: {
                                'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                            }
                        }
                    ],
                    as: 'ProductImages'
                }

            },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] },"is_deleted": 0,"is_active":1  } },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }

            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] },"is_deleted": 0 ,"is_active":1 } },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },
            {
                $lookup: {
                    from: 'favourite_items',
                    let: { "product_id": "$_id", 'id': login_user_id },
                    pipeline: [
                        {
                            $match:
                            {
                                $and: [
                                    { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                    { $expr: { $eq: ["$user_id", "$$id"] } },
                                    { $expr: { $eq: ["$is_active", 1] } }
                                ]
                            }
                        },
                    ],
                    as: 'favouriteDate'
                }

            },
            {
                "$lookup":{
                    "from":"orders",
                    "let":{"order_status":2,"id":"$_id"},
                    "pipeline":[
                            {
                                $unwind:"$products"},
                            {
                                "$match":{order_status:2}
                            },
                            {
                            "$match": {$expr: {$eq: ["$products.inventory_id", "$$id"]}}
                            },
                            {
                                $project: {
                                    products: "$products.inventory_id"
                                }
                            },
                            {
                                $group: {
                                    _id: "$products",
                                    myCount: { $sum: 1 }
                                }
                            },
                        ],
                    as:"orderData"
                }   
            },
            {$unwind:"$orderData"},
            {
                $addFields:
                {
                    newprice:
                    {
                        $cond: {
                            if: { $eq: ["$is_discount", 0] },
                            then: "$price",
                            else: "$discounted_product_price"
                        }
                    },
                    totalrating: { $toString: { $avg: "$ratings.rating" } },
                }
            },
           // { $match: filterbyids },
            {
                $project: {
                    _id: "$_id",
                    main_product_id: '$Products._id',
                    name: "$Products.name",
                    inventory_name: '$inventory_name',
                    images: "$ProductImages",
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    available_quantity: '$product_quantity',
                    min_inventory: '$min_inventory',
                    price: "$price",
                    is_favourite: { $size: "$favouriteDate" },
                    description: '$Products.description',
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    is_discount: "$is_discount",
                    offer_price: "$discounted_product_price",
                    rating: "$totalrating",
                    orderData:"$orderData"
                }
            },
        ];

        var sortPattern = {"orderData.myCount":-1};
        ProductInventoryServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(resultProduct => {
            // var result = {
            //     customizationsub_type : resultProduct
            // }
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, resultProduct);
        }).catch(error => {
            let resMsg = Validation.getErrorMessage(error);
            Response.send(req, res, 500, resMsg);
        })

    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},



/**
 * @api {get} /user_service/customer/product/discountproduct Product - Discount
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
        "docs": [
        {
            "_id": "6007b64153f53a7b32942093",
            "main_product_id": "6007b61153f53a7b32942084",
            "name": "facepack",
            "inventory_name": "facepack -almond",
            "images": [
            {
                "_id": "6007b61153f53a7b32942086",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6007b61153f53a7b32942084/1611118097242receipt87911608620226.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6007b61153f53a7b32942084/thumb_1611118097242receipt87911608620226.jpg"
            }
            ],
            "business_category": {
            "_id": "5ff833ab42f4ff56f8e1c605",
            "name": "Groceries"
            },
            "category": {
            "_id": "5ff983bc63a02770e1e797f7",
            "name": "Skin Care"
            },
            "subcategory": {
            "_id": "5ffd4b752297366f0630e418",
            "name": "Face pack"
            },
            "available_quantity": 0,
            "price": 200,
            "is_favourite": 0,
            "description": "facepack",
            "discount_type": 1,
            "discount_value": 2,
            "is_discount": 1,
            "offer_price": 196,
            "rating": null
        }
        ],
        "totalDocs": 17,
        "limit": 6,
        "page": 1,
        "totalPages": 3,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": true,
        "prevPage": null,
        "nextPage": 2
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/discountproduct",
"message": "error.",
"data": {}
}
*/
getDiscountProduct: async (req, res) => {
    try {

        if (req.headers.authorization && req.headers.authorization != '') {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
        } else {
            var login_user_id = '';
        }
        // var sortby = req.body.sortby;
        // var business_category_id = req.body.business_category_id || "";
        // var category_id = req.body.category_id || "";
        var sub_category_id = req.body.sub_category_id || "";
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;


        //////// for sort/////////////////////////////
        var sortPattern = { 'createdAt': 1 };


        ////////////////////////////// end sort/////////////////////////////


        //////////////////////////// For  Filter/////////////////////////////
        var productfilter = {
            is_active: 1,
            is_deleted: 0,
            is_discount: 1
        };

        let aggregateCondition = [
            { $match: productfilter },
            {
                $lookup: {
                    from: 'products',
                    let: { "id": "$product_id" },
                    pipeline: [
                        // { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $match: { $expr: { $eq: ["$_id", "$$id"] }, "is_active": 1,"is_deleted": 0 } },
                        { $unset: ['createdAt', 'updatedAt', '__v'] },
                    ],
                    as: 'Products'
                }

            },
            { $unwind: "$Products" },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$Products.business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] },"is_deleted": 0,"is_active": 1 } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }

            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'product_images',
                    let: { "images": "$Products.images" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                        {
                            $project: {
                                'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                            }
                        }
                    ],
                    as: 'ProductImages'
                }

            },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $match:{
                                  $and: [
                                    { $expr: { $eq: ["$is_active", 1] } },
                                    { $expr: { $eq: ["$is_deleted", 0] } }
                                ]
                            }
                        },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }

            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$Products.sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $match:{
                                  $and: [
                                    { $expr: { $eq: ["$is_active", 1] } },
                                    { $expr: { $eq: ["$is_deleted", 0] } }
                                ]
                            }
                        },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },
            {
                $lookup: {
                    from: 'favourite_items',
                    let: { "product_id": "$_id", 'id': login_user_id },
                    pipeline: [
                        {
                            $match:
                            {
                                $and: [
                                    { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                    { $expr: { $eq: ["$user_id", "$$id"] } },
                                    { $expr: { $eq: ["$is_active", 1] } }
                                ]
                            }
                        },
                    ],
                    as: 'favouriteDate'
                }

            },
            {
                $addFields:
                {
                    newprice:
                    {
                        $cond: {
                            if: { $eq: ["$is_discount", 0] },
                            then: "$price",
                            else: "$discounted_product_price"
                        }
                    },

                    totalrating: { $toString: { $avg: "$ratings.rating" } },
                }
            },
            {
                $project: {
                    _id: "$_id",
                    main_product_id: '$Products._id',
                    name: "$Products.name",
                    inventory_name: '$inventory_name',
                    images: "$ProductImages",
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    available_quantity: '$product_quantity',
                    min_inventory: '$min_inventory',
                    price: "$price",
                    is_favourite: { $size: "$favouriteDate" },
                    description: '$Products.description',
                    discount_type: "$discount_type",
                    discount_value: "$discount_value",
                    is_discount: "$is_discount",
                    offer_price: "$discounted_product_price",
                    rating: "$totalrating",
                    createdAt:1,
                }
            },
        ];

        var sortPattern = { createdAt: -1 }

        ProductInventoryServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(resultProduct => {
            // var result = {
            //     customizationsub_type : resultProduct
            // }
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, resultProduct);
        }).catch(error => {
            let resMsg = Validation.getErrorMessage(error);
            Response.send(req, res, 500, resMsg);
        })

    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},



/**
 * @api {post} /user_service/customer/product/ratings Product - Give Rating 
 * @apiGroup App - Customer - Product
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} product_id Product Id
* @apiParam {String} inventory_id inventory_id
* @apiParam {String} order_id order_id
* @apiParam {Number} rating rating
* @apiParam {String} review review
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
  "message": "Rating submitted successfully.",
  "data": {}
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/product/ratings",
"message": "Error",
"data": {}
}
*/

giveRating: async (req, res) => {
    try {


        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
        var review = req.body.review;
        var product_id = req.body.product_id || "";
        var order_id = req.body.order_id || "";
        var inventory_id = req.body.inventory_id || "";
        var rating = req.body.rating || "";

        var findPattern = { _id: ObjectId(inventory_id) };
        var aggregate = [
            { $match: findPattern }
        ];

        ProductInventoryServices.oneRecord(aggregate).then(cartResult => {

            if (cartResult) {
                var createPatteren = {
                    user_id: ObjectId(login_user_id),
                    order_id: ObjectId(order_id),
                    product_id: ObjectId(product_id),
                    rating: rating,
                    review: review
                }
                var newfindPattern = { _id: ObjectId(inventory_id) };

                ProductInventoryServices.updateRecord(newfindPattern, { $push: { ratings: createPatteren } }).then(updatedRes => {

                    var sussMessage = Messages.RATING_SUBMITTED_SUCCESS;
                    Response.send(req, res, 200, sussMessage);
                }).catch(err => {
                    var errMessage = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, errMessage);
                })
            } else {
                var succMessage = Messages.PRODUCT_NOT_EXIST;
                Response.send(req, res, 200, succMessage);
            }
        }).catch(err => {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        })


    } catch (err) {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 500, resMsg);
    }
},



/**
* @api {get} /user_service/customer/product/dealofday Product Deal of day - Listing
* @apiGroup App - Customer - Deal of day
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} page_no Page No.
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
"message": "Success",
"data": {
    "docs": [
    {
        "description": "Grab the biggest beauty sale. Limited time hurry up Flat 30% Discount",
        "_id": "602cce94bd77a05171d5b266",
        "title": "Athwas Launch Offer Promo Code (launch30)",
        "image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/banners/602cce94bd77a05171d5b266/161503218351630percentoffpromotion2227146.jpg",
        "image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/banners/602cce94bd77a05171d5b266/thumb_161503218351630percentoffpromotion2227146.jpg",
        "business_category": {
        "_id": "602cc062bd77a05171d5b1f5",
        "name": "Beauty, Health and Personal Care"
        },
        "category": {
        "_id": "604203484485c00b0e365201",
        "name": "Makeup"
        },
        "subcategory": {
        "_id": "60436ba34485c00b0e36529f",
    "name": "Makeup Kits"
        },
        "is_active": 1
    },
    ],
    "totalDocs": 2,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
    }
}

*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/dealofday",
"message": "error.",
"data": {}
}
*/
getDealOfDayList: async (req, res) => {
    try {

        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;

        var findPattern = {
            is_deleted: 0,
            is_active:1
        };

        var sortPattern = { createdAt: -1 };

        let aggregateCondition = [
            { $match: findPattern },
            {
                $lookup: {
                    from: 'business_categories',
                    let: { "id": "$business_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { "name": 1 } }
                    ],
                    as: 'businessCategoryData'
                }
            },
            { $unwind: "$businessCategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'CategoryData'
                }
            },
            { $unwind: "$CategoryData" },
            {
                $lookup: {
                    from: 'categories',
                    let: { "id": "$sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }
            },
            { $unwind: "$SubCategoryData" },
          
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    description: 1,
                    'image_url': { $concat: [UPLOAD_DEALOFDAY_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$image"] },
                    "image_thumb_url": { $concat: [UPLOAD_DEALOFDAY_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$image"] },
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    is_active: '$is_active',
                }
            },
        ];

        DealOfDayServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, userdata);

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},



/**
* @api {get} /user_service/customer/product/dealofday/:dealofday_id Product Deal of day - Details
* @apiGroup App - Customer - Deal of day
*
* @apiHeaderExample {multipart/form-data} Header-Example
{
"Content-Type": "multipart/form-data"
}
*
* @apiParam {String} dealofday_id Deal of day id.
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
"message": "Success",
"data": {
        "_id": "60a388e540f5133130cc1de8",
        "productInventoriesData": [
            {
                "_id": "604745634485c00b0e365b6d",
                "name": "OPPO Reno5 Pro 5G",
                "main_product_id": "6045a7e04485c00b0e36535c",
                "inventory_name": "Smartphones 4 gb Ram 64 storage ",
                "price": 16000,
                "quantity": 39,
                "product_code": "Ele-Mob-Sma-4377-OPP",
                "images": [
                    {
                        "_id": "60a4e315af83aa31689d8bbd",
                        "product_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/1621418773783failed.png",
                        "product_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_1621418773783failed.png"
                    }
                ],
                "business_category": {
                    "_id": "5fe97c9112d5874bdd5db00f",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5fe97db612d5874bdd5db012",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "6045a7064485c00b0e36534b",
                    "name": "SmartPhones"
                },
                "description": "3D Borderless Sense Screen | AI Highlight Video (Ultra Night Video + Live HDR) | Super AMOLED Display\n64MP + 8MP + 2MP + 2MP | 32MP Front Camera\nInnovative 65W SuperVOOC 2.0 flash charging brings the 4350 mAh battery,5 minutes charging & 4hours of video playback, fully charging in 30 minutes.\n16.64 cm (6.55 inch) Full HD+ Display with 2400x1080 resolution.\nColor OS 11.1 based on Android v11.0 operating system with 2.6GHz MediaTek Dimensity 1000+ (MT6889) Processor, ARM G77 MC9 836 MHz",
                "is_favourite": 0,
                "is_discount": 0,
                "discount_type": 2,
                "discount_value": 0,
                "offer_price": 16000
            },
            {
                "_id": "6058714cc1a53d268eaaf2d1",
                "name": "Samsung 31",
                "main_product_id": "6058714cc1a53d268eaaf2d0",
                "inventory_name": "Vanish Pro",
                "price": 21000,
                "quantity": 50,
                "product_code": "Ele-Mob-Sma-6249-Sam",
                "images": [
                    {
                        "_id": "605871e2c1a53d268eaaf2e3",
                        "product_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/1616409058537groupstudentsclassroom450w220406878.jpg",
                        "product_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/thumb_1616409058537groupstudentsclassroom450w220406878.jpg"
                    },
                    {
                        "_id": "6059f05a91bf61107de66a77",
                        "product_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/1616506970466loveimage1920x1080catshd14773.jpg",
                        "product_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/thumb_1616506970466loveimage1920x1080catshd14773.jpg"
                    },
                    {
                        "_id": "6059f05a91bf61107de66a78",
                        "product_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/1616506970473loveimage1920x1080tulips4k14784.jpg",
                        "product_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/6058714cc1a53d268eaaf2d0/thumb_1616506970473loveimage1920x1080tulips4k14784.jpg"
                    }
                ],
                "business_category": {
                    "_id": "5fe97c9112d5874bdd5db00f",
                    "name": "Electronics"
                },
                "category": {
                    "_id": "5fe97db612d5874bdd5db012",
                    "name": "Mobiles"
                },
                "subcategory": {
                    "_id": "6045a7064485c00b0e36534b",
                    "name": "SmartPhones"
                },
                "description": "TEst",
                "is_favourite": 0,
                "is_discount": 0,
                "discount_type": 2,
                "discount_value": 0,
                "offer_price": 21000
            }
        ]
    }
}

*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
"status": "error",
"api_name": "/dealofday",
"message": "error.",
"data": {}
}
*/
getDealOfDayDetails: async (req, res) => {
    try {

        var dealofday_id = req.params.dealofday_id || 1;
        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
        var errors = [];

        if (dealofday_id && dealofday_id == "") {
            errors.push({ errField: "dealofday_id", errText: Messages.INVALID_DEALOFDAY_REQUEST });
        }

        if (errors.length > 0) {
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });
        } else {
            var findPattern = {
                is_deleted: 0,
                _id:ObjectId(dealofday_id)
            };

            var sortPattern = { createdAt: -1 };

            let aggregateCondition = [
                { $match: findPattern },
                {
                    $lookup: {
                        from: 'product_inventories',
                        let: { "id": "$product_id" },
                        pipeline: [
                            { $match: { $expr: { $in: ["$_id", "$$id"] } } },
                            {
                                    $lookup: {
                                        from: 'products',
                                        let: { "id": "$product_id", },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                            {
                                                $lookup: {
                                                    from: 'business_categories',
                                                    let: { "id": "$business_category_id" },
                                                    pipeline: [
                                                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                                        { $project: { "name": 1 } }
                                                    ],
                                                    as: 'businessCategoryData'
                                                }
                                            },
                                            { $unwind: "$businessCategoryData" },
                                            {
                                                $lookup: {
                                                    from: 'categories',
                                                    let: { "id": "$category_id" },
                                                    pipeline: [
                                                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                                        { $project: { 'name': 1 } }],
                                                    as: 'CategoryData'
                                                }
                                            },
                                            { $unwind: "$CategoryData" },
                                            {
                                                $lookup: {
                                                    from: 'categories',
                                                    let: { "id": "$sub_category_id" },
                                                    pipeline: [
                                                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                                        { $project: { 'name': 1 } }],
                                                    as: 'SubCategoryData'
                                                }
                                            },
                                            { $unwind: "$SubCategoryData" },
                                            { 
                                                $lookup: 
                                                {
                                                        from: 'product_images',
                                                        let: { "images": "$images", },
                                                        pipeline: [
                                                            { $match: { $expr: { $in: ["$_id", "$$images"] } } },
                                                            {
                                                                $project: {
                                                                    'product_image_url': {
                                                                        $cond: [
                                                                            { $eq: ['$image', ''] },
                                                                            { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                                                            { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] }, // then
                                                                        ]
                                                                    },
                                                                    "product_image_thumb_url": {
                                                                        $cond: [
                                                                            { $eq: ['$image', ''] },
                                                                            { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                                                            { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }, // then
                                                                        ]
                                                                    },
                                                                }
                                                            }
                                                        ],
                                                        as: 'ProductImagesData'
                                                    }
                                            },
                                            {
                                                $lookup: {
                                                    from: 'favourite_items',
                                                    let: { "product_id": "$product_id", 'id': login_user_id },
                                                    pipeline: [
                                                        {
                                                            $match:
                                                            {
                                                                $and: [
                                                                    { $expr: { $eq: ["$product_id", "$$product_id"] } },
                                                                    { $expr: { $eq: ["$user_id", "$$id"] } },
                                                                    { $expr: { $eq: ["$is_active", 1] } }
                                                                ]
                                                            }
                                                        },
                                                    ],
                                                    as: 'favouriteDate'
                                                }
                                            },
                                           
                                            
                                            
                                        ],
                                        as:"ProductData"
                                    },
                                   
                            },
                            {
                                $addFields:
                                {
                                    newprice:
                                    {
                                        $cond: {
                                            if: { $eq: ["$is_discount", 0] },
                                            then: "$price",
                                            else: "$discounted_product_price"
                                        }
                                    },
                
                                    totalrating: { $toString: { $avg: "$ratings.rating" } },
                                    ratingCount: { $toString: { $size: "$ratings" } },
                                }
                            },
                            { $unwind:"$ProductData"},
                            {
                                $project: {
                                    name: '$ProductData.name',
                                    main_product_id: '$ProductData._id',
                                    inventory_name: '$inventory_name',
                                    price: '$price',
                                    available_quantity: '$product_quantity',
                                    min_inventory: '$min_inventory',
                                    product_code: '$product_code',
                                    images: '$ProductData.ProductImagesData',
                                    business_category: '$ProductData.businessCategoryData',
                                    category: '$ProductData.CategoryData',
                                    subcategory: '$ProductData.SubCategoryData',
                                    customizations: '$ProductCustomizationData',
                                    description: '$ProductData.description',
                                    is_favourite: { $size: "$ProductData.favouriteDate" },
                                    brand: "test",
                                    is_discount: "$is_discount",
                                    discount_type: "$discount_type",
                                    discount_value: "$discount_value",
                                    offer_price: "$discounted_product_price",
                                    rating: "$totalrating",
                                    ratingCount : "$ratingCount",
                                    brand: '$BrandData',
                                    newprice: "$newprice",
                                }

                                
                             }
                          
                        ],
                            as: 'productInventoriesData'
                    },
                },
                {
                    $project: {
                        "productInventoriesData":1,
                    }
                },
            ];


            DealOfDayServices.oneRecord(aggregateCondition).then(userdata => {
                
                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, userdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        }
    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
},



}

module.exports = ProductController;