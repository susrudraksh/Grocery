'use strict';


const _ = require('lodash');
const { BannerServices, ProductInventoryServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const config = require('../../config');
const { isValidObjectId } = require('mongoose');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/banners";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";
const { ObjectID } = require("mongodb");
const { find } = require('lodash');
const ProductServices = require('../../services/ProductServices');

const BannerController = {
    /**
     * @api {get} /user_service/admin/banner/get_banners  Banner - All Listing
     * @apiGroup Admin - Banner
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} page_no Page No.
    * @apiParam {String} keyword Search Keyword
    * @apiParam {String} status Status
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/banner/get_banners",
    "message": "Success",
    "data": {
    "docs": [
    {
    "description": "Testing",
    "_id": "5f8d3c433913e1214061d2c7",
    "title": "Diwali special",
    "banner_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/1603091523526iStock000004792809Small.jpg",
    "banner_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/thumb_1603091523526iStock000004792809Small.jpg",
    "business_category": {
    "_id": "5f73158c500ead10f8fcdca1",
    "name": "Clothes"
    },
    "category": {
    "_id": "5f8040ee08707c11ecb09db8",
    "name": "Hand Soap"
    },
    "subcategory": {
    "_id": "5f80412a08707c11ecb09db9",
    "name": "Hand Soap"
    },
    "product": {
    "_id": "5f7c38339ed8b93ac4a93bff",
    "name": "Maggi"
    },
    "is_active": 1
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
    "api_name": "/banner/get_banners",
    "message": "Error",
    "data": {}
    }
    */
    getBanners: async (req, res) => {

        try {
            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {
                is_deleted: 0,
            };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'title': { $regex: keyword, $options: "i" } },
                ];
            }
            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }

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
                            { $project: { 'inventory_name': 1 } }],
                        as: 'productInventoriesData'
                    }
                },
                { $unwind: "$productInventoriesData" },
                {
                    $match:
                    {
                        $or: [
                            { "businessCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "CategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "SubCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "productInventoriesData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "title": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        ]
                    }
                },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        description: 1,
                        'banner_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$banner_image"] },
                        "banner_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$banner_image"] },
                        business_category: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        product: "$productInventoriesData",
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
     * @api {post} /user_service/admin/banner/create_banner  Banner - Create
     * @apiGroup Admin - Banner
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} title Title
    * @apiParam {String} description Description
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    * @apiParam {String} sub_category_id Sub Category Id
    * @apiParam {String} product_id  Product Id
    * @apiParam {Object} banner_image Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/banner/create_banner",
    "message": "Banner has created successfully.",
    "data": {
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f8d3c433913e1214061d2c7",
    "title": "Diwali special",
    "description": "Testing",
    "business_category_id": "5f73158c500ead10f8fcdca1",
    "category_id": "5f8040ee08707c11ecb09db8",
    "sub_category_id": "5f80412a08707c11ecb09db9",
    "product_id": "5f7c38339ed8b93ac4a93bff",
    "createdAt": "2020-10-19T07:12:03.461Z",
    "updatedAt": "2020-10-19T07:12:03.532Z",
    "__v": 0,
    "banner_image": "1603091523526iStock000004792809Small.jpg",
    "id": "5f8d3c433913e1214061d2c7"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/banner/create_banner",
    "message": "Error",
    "data": {}
    }
    */
    create_banner: async (req, res) => {

        try {

            var title = req.body.title || "";
            var description = req.body.description || "";
            var business_category_id = req.body.business_category_id || "";
            var category_id = req.body.category_id || "";
            var sub_category_id = req.body.sub_category_id || "";
            var product_id = req.body.product_id || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.banner_image && Media.getMediaTypeByMimeType(files.banner_image.mimetype) != "image") {
                errors.push({ errField: "banner_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var createPattern = {
                    title: title,
                    description: description,
                    business_category_id: business_category_id,
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    product_id: product_id,
                    is_active: 1,
                    is_deleted: 0,
                };

                BannerServices.createRecord(createPattern).then(async createRes => {

                    var findPattern = { _id: createRes._id };
                    var updatePattern = {};

                    if (files && files.banner_image) {
                        var fileName = await BannerServices.updateUserImage(createRes, files.banner_image);
                        updatePattern.banner_image = fileName;
                    }

                    BannerServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                        // success
                        let resMsg = Messages.BANNER_CREATE_SUCCESS;
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
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
    /**
     * @api {get} /user_service/admin/banner/get_banner/:banner_id Banner - Get Single
     * @apiGroup Admin - Banner
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
    "api_name": "/banner/get_banner/5f8d3c433913e1214061d2c7",
    "message": "Success",
    "data": {
    "description": "Testing",
    "_id": "5f8d3c433913e1214061d2c7",
    "title": "Diwali special",
    "banner_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/1603091523526iStock000004792809Small.jpg",
    "banner_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/thumb_1603091523526iStock000004792809Small.jpg",
    "business_category": {
    "_id": "5f73158c500ead10f8fcdca1",
    "name": "Clothes"
    },
    "category": {
    "_id": "5f8040ee08707c11ecb09db8",
    "name": "Hand Soap"
    },
    "subcategory": {
    "_id": "5f80412a08707c11ecb09db9",
    "name": "Hand Soap"
    },
    "product": {
    "_id": "5f7c38339ed8b93ac4a93bff",
    "name": "Maggi"
    },
    "is_active": 1
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/banner/get_banner/5f8d3c433913e1214061d2c7",
    "message": "Banner doesn't exist.",
    "data": {}
    }
    */
    getBanner: async (req, res) => {

        try {

            var banner_id = req.params.banner_id;

            var findPattern = { _id: ObjectID(banner_id), is_deleted: 0 }
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
                            { $project: { 'inventory_name': 1 } }],
                        as: 'productInventoriesData'
                    }
                },
                { $unwind: "$productInventoriesData" },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        description: 1,
                        'banner_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$banner_image"] },
                        "banner_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$banner_image"] },
                        business_category: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        product: "$productInventoriesData",
                        is_active: '$is_active',
                    }
                },
            ];

            BannerServices.oneRecord(aggregateCondition).then(userdata => {

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
     * @api {put} /user_service/admin/banner/update_banner/:banner_id Banner - Update
     * @apiGroup Admin - Banner
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} title Title
    * @apiParam {String} description Description
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    * @apiParam {String} sub_category_id Sub Category Id
    * @apiParam {String} product_id  Product Id
    * @apiParam {Object} banner_image Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/banner/update_banner/5f8d3c433913e1214061d2c7",
    "message": "Banner details has updated successfully.",
    "data": {
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f8d3c433913e1214061d2c7",
    "title": "Diwali speciall",
    "description": "Testing",
    "business_category_id": "5f73158c500ead10f8fcdca1",
    "category_id": "5f8040ee08707c11ecb09db8",
    "sub_category_id": "5f80412a08707c11ecb09db9",
    "product_id": "5f7c38339ed8b93ac4a93bff",
    "createdAt": "2020-10-19T07:12:03.461Z",
    "updatedAt": "2020-10-19T10:01:20.541Z",
    "__v": 0,
    "banner_image": "1603101680535iStock000004792809Small.jpg",
    "id": "5f8d3c433913e1214061d2c7"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/banner/update_banner/5f8d3c433913e1214061d2c7",
    "message": "Sub category doesn't exist.",
    "data": {}
    }
    */
    updateBanner: async (req, res) => {

        try {

            var banner_id = req.params.banner_id;

            var title = req.body.title || "";
            var description = req.body.description || "";
            var business_category_id = req.body.business_category_id || "";
            var category_id = req.body.category_id || "";
            var sub_category_id = req.body.sub_category_id || "";
            var product_id = req.body.product_id || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.banner_image && Media.getMediaTypeByMimeType(files.banner_image.mimetype) != "image") {
                errors.push({ errField: "banner_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: ObjectID(banner_id), is_deleted: 0 }
                var aggregateCondition = [{
                    $match: findPattern
                }];
                BannerServices.oneRecord(aggregateCondition).then(async categorydata => {

                    if (categorydata) {

                        var updatePattern = {
                            title: title,
                            description: description,
                            business_category_id: business_category_id,
                            category_id: category_id,
                            sub_category_id: sub_category_id,
                            product_id: product_id
                        };

                        if (files && files.banner_image) {
                            var fileName = await BannerServices.updateUserImage(categorydata, files.banner_image);
                            updatePattern.banner_image = fileName;
                        }

                        BannerServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.BANNER_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.BANNER_NOT_EXIST;
                        Response.send(req, res, 400, resMsg);
                    }

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });
            }

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
    * @api {put} /user_service/admin/banner/update_status/:banner_id Banner - Update Status
    * @apiGroup Admin - Banner
    *
    * @apiParam {Number} status Status: 1 | 0
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
    "api_name": "/banner/update_status/5f8d3c433913e1214061d2c7",
    "message": "Banner status has updated successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/banner/update_status/5f8d3c433913e1214061d2c7",
    "message": "Banner doesn't exist.",
    "data": {}
    }
    */
    updateStatus: (req, res) => {

        try {

            var banner_id = req.params.banner_id;
            var status = req.body.status || "";

            var findPattern = { _id: ObjectID(banner_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            BannerServices.oneRecord(aggregateCondition).then(bannerdata => {

                if (bannerdata != null) {

                    var updatePattern = { is_active: status };

                    BannerServices.updateRecord({ _id: bannerdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BANNER_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BANNER_NOT_EXIST;
                    Response.send(req, res, 400, resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
    
    /**
     * @api {delete} /user_service/admin/banner/delete_banner/:banner_id Banner - Delete
     * @apiGroup Admin - Banner
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
    "api_name": "/banner/delete_banner/5f8d3c433913e1214061d2c7",
    "message": "Banner has deleted successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/banner/delete_banner/5f8d3c433913e1214061d2c7",
    "message": "Sub category doesn't exist.",
    "data": {}
    }
    */
    deleteBanner: (req, res) => {

        try {

            var banner_id = req.params.banner_id;

            var findPattern = { _id: ObjectID(banner_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            BannerServices.oneRecord(aggregateCondition).then(bannerdata => {

                if (bannerdata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    BannerServices.updateRecord({ _id: bannerdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BANNER_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BANNER_NOT_EXIST;
                    Response.send(req, res, 400, resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    
    /**
     * @api {post} /user_service/admin/banner/get_banner_products Banner - Product Listing
     * @apiGroup Admin - Banner
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
        "Content-Type": "multipart/form-data"
        }
    *
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    * @apiParam {String} sub_category_id Sub Category Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/banner/get_banner_products",
    "message": "Success",
    "data": [
        {
            "_id": "5f8546a6eb7b292138cd7226",
            "is_active": 0,
            "is_deleted": 0,
            "product_id": "5f7c38339ed8b93ac4a93bff",
            "price": "400",
            "product_quantity": 2,
            "product_code": "dsada",
            "createdAt": "2020-10-13T06:18:14.063Z",
            "updatedAt": "2020-10-15T06:03:48.318Z",
            "__v": 0,
            "ProductsData": [
                {
                    "_id": "5f7c38339ed8b93ac4a93bff",
                    "name": "Maggi"
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
    "api_name": "/banner/get_banner_products",
    "message": "Banner doesn't exist.",
    "data": {}
    }
    */
    getBannerProducts: async (req, res) => {

        try {
            var business_category_id = ObjectID(req.body.business_category_id);
            var category_id = ObjectID(req.body.category_id);
            var sub_category_id = ObjectID(req.body.sub_category_id);

            var findPattern = {
                is_deleted: 0,
                business_category_id:business_category_id,
                category_id:category_id,
                sub_category_id:sub_category_id
            };

            var aggregateCondition = [
                { $match: findPattern },
                {
                    $lookup: {
                        from: 'product_inventories',
                        let: { "id": "$_id"},
                        pipeline: [
                            {$match: { $expr:{ $eq: ["$product_id", "$$id"] }}},
                        ],
                        as: 'ProductsInventryData'
                    }
                }, 
                {$unwind:'$ProductsInventryData'},
                {$unset:['_id']},
                {
                    $project: {
                        id:"$ProductsInventryData._id",
                        name: "$name",
                        inventory_name: "$ProductsInventryData.inventory_name"
                    }
                },
            ];

            ProductServices.allRecord(aggregateCondition).then(userdata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, userdata);
                // });
            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
}
module.exports = BannerController;