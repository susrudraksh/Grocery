'use strict';


const _ = require('lodash');
const { OfferServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const config = require('../../config');
const { isValidObjectId } = require('mongoose');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/offers";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";
const { ObjectID } = require("mongodb");

const OfferController = {
    
    getOffers: async (req, res) => {

        try {
            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {
                is_deleted: 0,
            };

            // if (keyword && keyword != "") {
            //     findPattern["$or"] = [
            //         { 'title': { $regex: keyword, $options: "i" } },
            //         { 'coupon_code': { $regex: keyword, $options: "i" } },
            //     ];
            // }
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
                // { $unwind: "$businessCategoryData" },
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
                //{ $unwind: "$CategoryData" },
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
                // { $unwind: "$SubCategoryData" },

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
                // { $unwind: "$productInventoriesData" },
                {
                    $match:
                    {
                        $or: [
                            { "businessCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "CategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "SubCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "productInventoriesData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "title": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "coupon_code": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        ]
                    }
                },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        description: 1,
						image_path: 1,
                        offer_type: 1,
                        startDate: 1,
                        endDate: 1,
                        coupon_code: 1,
                        'image_path_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$image_path"] },
                        "image_path_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$image_path"] },
                        business_category: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        product: "$productInventoriesData",
                        is_active: '$is_active',
                    }
                },
            ];

            OfferServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, userdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
    
    createOffer: async (req, res) => {

        try {

            var offer_type = req.body.offer_type || "";
            var coupon_code = req.body.coupon_code || "";
            var title = req.body.title || "";
            var description = req.body.description || "";
            var business_category_id = req.body.business_category_id || null;
            var category_id = req.body.category_id || null;
            var sub_category_id = req.body.sub_category_id || null;
            var product_id = req.body.product_id ? JSON.parse(req.body.product_id) : null || null;
            var card_type = req.body.card_type || "";
            var bank_type = req.body.bank_type || "";
            var start_date = req.body.startDate || "";
            var end_date = req.body.endDate || "";
            var offer_amount_type = req.body.offer_amount_type || "";
            var offer_price = req.body.offer_price || "";
            var offer_amount = req.body.offer_amount || "";
            var offer_product = req.body.offer_product || "";
            var offer_quantity = req.body.offer_quantity || null;
            var files = req.body.files || null;

            var errors = [];

            if (offer_type == 1) {
                if (coupon_code == "") {
                    errors.push({ errField: "coupon_code", errText: "Please enter coupon code" });
                }
            }

            if (offer_type == 2 || offer_type == 1 || offer_type == 4) {
                if (offer_amount_type == "") {
                    errors.push({ errField: "offer_amount_type", errText: "Please select Offer amount type" });
                }
                if (offer_price == "") {
                    errors.push({ errField: "offer_price", errText: "Please enter price" });
                }
                if (offer_amount == "") {
                    errors.push({ errField: "offer_amount", errText: "Please enter offer amount" });
                }
            }
            if (offer_type == 4) {
                if (card_type == "") {
                    errors.push({ errField: "card_type", errText: "Please select card type" });
                }
                if (bank_type == "") {
                    errors.push({ errField: "bank_type", errText: "Please select bank type" });
                }
            }
            if (offer_type == 3) {
                if (offer_price == "") {
                    errors.push({ errField: "offer_price", errText: "Please select offer price" });
                }
                if (offer_quantity == "") {
                    errors.push({ errField: "offer_quantity", errText: "Please enter offer quantity" });
                }
            }
            if (files && files.image_path && Media.getMediaTypeByMimeType(files.image_path.mimetype) != "image") {
                errors.push({ errField: "image_path", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });
            } else {

                var createPattern = {
                    offer_type: offer_type,
                    coupon_code: coupon_code,
                    title: title,
                    description: description,
                    business_category_id: business_category_id,
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    product_id: product_id,
                    card_type: card_type,
                    bank_type: bank_type,
                    startDate: start_date,
                    endDate: end_date,
                    offer_amount_type: offer_amount_type,
                    offer_price: offer_price,
                    offer_amount: offer_amount,
                    offer_product: offer_product,
                    offer_quantity: offer_quantity,
                    is_active: 1,
                    is_deleted: 0,
                };

                var findPattern = {};

                if (coupon_code && coupon_code != "") {
                    findPattern.coupon_code = coupon_code;
                }else{
                    if(business_category_id && business_category_id!=""){
                        findPattern.business_category_id = ObjectID(business_category_id);
                    }
                    if(category_id && category_id!=""){
                        findPattern.category_id = ObjectID(category_id);
                    }
                    if(sub_category_id && sub_category_id!=""){
                        findPattern.sub_category_id = ObjectID(sub_category_id);
                    }
                    if(product_id && product_id!=""){
                        findPattern.product_id = ObjectID(product_id);
                    }
                    
                    if(offer_type && offer_type==1){
                        findPattern.offer_type = offer_type;
                    }
                }

                if (start_date != "" || endDate != "") {
                    findPattern["$and"] = [];
                }

                if (start_date != "" || end_date != "") {
                    findPattern["$and"] = [
                        { startDate: { "$gte": start_date } },
                        { endDate: { "$lte": end_date } }
                    ];
                }

                let aggregateConditions = [{ $match: findPattern }];
                console.log(aggregateConditions);

                OfferServices.oneRecord(aggregateConditions).then(async matchdata => {

                    if (matchdata) {
                        let resMsg = Messages.OFFER_EXIST;
                        Response.send(req, res, 400, resMsg);
                    } else {
                        OfferServices.createRecord(createPattern).then(async createRes => {

                            var findPattern = { _id: createRes._id };
                            var updatePattern = {};

                            if (files && files.image_path) {
                                var fileName = await OfferServices.updateUserImage(createRes, files.image_path);
                                updatePattern.image_path = fileName;
                            }

                            OfferServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                                // success
                                let resMsg = Messages.OFFER_CREATE_SUCCESS;
                                Response.send(req, res, 200, "success", resMsg, updatedRes);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 200, resMsg);
                            });
                        }).catch(err => {
                            var errorsArr = Validation.getValidationErrors(err);
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 200, resMsg, {
                                errors: errorsArr
                            });
                        });
                    }
                })


            }
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
    /**
     * @api {get} /user_service/admin/offer/:offer_id Offer - Get Single
     * @apiGroup Admin - Offer
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
    "api_name": "/offer/5f9b9ebda7f9d422d8b4d6ea",
    "message": "Success",
    "data": {
        "offer_type": "4",
        "description": "Testing",
        "card_type": "",
        "bank_type": "",
        "offer_amount_type": 1,
        "offer_price": 10,
        "offer_amount": 500,
        "offer_product": null,
        "offer_quantity": null,
        "_id": "5f9b9ebda7f9d422d8b4d6ea",
        "title": "Summer offer",
        "banner_image_url": null,
        "banner_image_thumb_url": null,
        "business_category": {
            "_id": "5f7316ddb038fe182482a154",
            "name": "Grocery"
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
            "_id": "5f881d4c3967b3a449f38c71"
        },
        "is_active": 1
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
    "status": "error",
    "api_name": "/offer/5f9b9ebda7f9d422d8b4d6ea",
    "message": "Offer doesn't exist.",
    "data": {}
    }
    */
    getOffer: async (req, res) => {

        try {

            var offer_id = req.params.offer_id;

            var findPattern = { _id: ObjectID(offer_id), is_deleted: 0 }
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
                // { $unwind: "$businessCategoryData" },
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
                // { $unwind: "$CategoryData" },
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
                // { $unwind: "$SubCategoryData" },
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
                //  { $unwind: "$productInventoriesData" },

                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        offer_type: 1,
						image_path: 1,
                        description: 1,
                        coupon_code: 1,
                        card_type: 1,
                        bank_type: 1,
                        startDate: 1,
                        endDate: 1,
                        offer_amount_type: 1,
                        offer_price: 1,
                        offer_amount: 1,
                        offer_product: 1,
                        quantity: 1,
                        offer_quantity: 1,
                        'image_path_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$image_path"] },
                        "image_path_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$image_path"] },
                        business_category_id: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        product_id: 1,
                        is_active: '$is_active',
                    }
                },
            ];

            OfferServices.oneRecord(aggregateCondition).then(userdata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, userdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, "error", err.message);
        }
    },
    
    updateOffer: async (req, res) => {

        try {

            var offer_id = req.params.offer_id;

            var offer_type = req.body.offer_type || "";
            var coupon_code = req.body.coupon_code || "";
            var title = req.body.title || "";
            var description = req.body.description || "";
            var business_category_id = req.body.business_category_id || null;
            var category_id = req.body.category_id || null;
            var sub_category_id = req.body.sub_category_id || null;
            var product_id = JSON.parse(req.body.product_id) || null;
            var card_type = req.body.card_type || "";
            var bank_type = req.body.bank_type || "";
            var start_date = req.body.startDate || "";
            var end_date = req.body.endDate || "";
            var offer_amount_type = req.body.offer_amount_type || "";
            var offer_price = req.body.offer_price || "";
            var offer_amount = req.body.offer_amount || "";
            var offer_product = req.body.offer_product || null;
            var offer_quantity = req.body.offer_quantity || null;
            var files = req.body.files || null;

            var errors = [];

            if (offer_type == 1) {
                if (coupon_code == "") {
                    errors.push({ errField: "coupon_code", errText: "Please enter coupon code" });
                }
            }

            if (offer_type == 2 || offer_type == 1 || offer_type == 4) {
                if (offer_amount_type == "") {
                    errors.push({ errField: "offer_amount_type", errText: "Please select Offer amount type" });
                }
                if (offer_price == "") {
                    errors.push({ errField: "offer_price", errText: "Please enter price" });
                }
                if (offer_amount == "") {
                    errors.push({ errField: "offer_amount", errText: "Please enter offer amount" });
                }
            }
            if (offer_type == 4) {
                if (card_type == "") {
                    errors.push({ errField: "card_type", errText: "Please select card type" });
                }
                if (bank_type == "") {
                    errors.push({ errField: "bank_type", errText: "Please select bank type" });
                }
            }
            if (offer_type == 3) {
                if (offer_price == "") {
                    errors.push({ errField: "offer_price", errText: "Please select offer price" });
                }
                if (offer_quantity == "") {
                    errors.push({ errField: "bank_type", errText: "Please enter offer quantity" });
                }
            }

            if (files && files.image_path && Media.getMediaTypeByMimeType(files.image_path.mimetype) != "image") {
                errors.push({ errField: "image_path", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findExistPattern = {};

                if (coupon_code && coupon_code != "") {
                    findExistPattern.coupon_code = coupon_code;
                }else{
                    if(business_category_id && business_category_id!=""){
                        findExistPattern.business_category_id = ObjectID(business_category_id);
                    }
                    if(category_id && category_id!=""){
                        findExistPattern.category_id = ObjectID(category_id);
                    }
                    if(sub_category_id && sub_category_id!=""){
                        findExistPattern.sub_category_id = ObjectID(sub_category_id);
                    }
                    if(product_id && product_id!=""){
                        findExistPattern.product_id = ObjectID(product_id);
                    }
                    if(offer_type && offer_type==1){
                        findExistPattern.offer_type = offer_type;
                    }
                }

                if (start_date != "" || endDate != "") {
                    findExistPattern["$and"] = [];
                }

                if (start_date != "" || end_date != "") {
                    findExistPattern["$and"] = [
                        { startDate: { "$gte": start_date } },
                        { endDate: { "$lte": end_date } }
                    ];
                }

                findExistPattern._id = { '$ne': ObjectID(offer_id) };

                let aggregateConditions = [{ $match: findExistPattern }];
                console.log(JSON.stringify(aggregateConditions))
                OfferServices.oneRecord(aggregateConditions).then(async matchdata => {

                    if (matchdata) {
                        let resMsg = Messages.OFFER_EXIST;
                        Response.send(req, res, 400, resMsg);
                    } else {
                        var findPattern = { _id: ObjectID(offer_id), is_deleted: 0 }
                        var aggregateCondition = [{
                            $match: findPattern
                        }];

                        OfferServices.oneRecord(aggregateCondition).then(async categorydata => {

                            if (categorydata) {

                                var updatePattern = {
                                    offer_type: offer_type,
                                    coupon_code: coupon_code,
                                    title: title,
                                    description: description,
                                    business_category_id: business_category_id,
                                    category_id: category_id,
                                    sub_category_id: sub_category_id,
                                    product_id: product_id,
                                    card_type: card_type,
                                    bank_type: bank_type,
                                    startDate: start_date,
                                    endDate: end_date,
                                    offer_amount_type: offer_amount_type,
                                    offer_price: offer_price,
                                    offer_amount: offer_amount,
                                    offer_product: offer_product,
                                    //offer_quantity: offer_quantity,
                                };

                                if (files) {
                                    var fileName = await OfferServices.updateUserImage(categorydata, files.image_path);
                                    updatePattern.image_path = fileName;
                                }

                                OfferServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                                    // success
                                    let resMsg = Messages.OFFER_UPDATE_SUCCESS;
                                    Response.send(req, res, 200, resMsg);

                                }).catch(err => {
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });

                            } else {
                                let resMsg = Messages.OFFER_NOT_EXIST;
                                Response.send(req, res, 400, resMsg);
                            }

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });
                    }
                })
            }
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

   
    updateStatus: (req, res) => {

        try {

            var offer_id = req.params.offer_id;
            var status = req.body.status || "";

            var findPattern = { _id: ObjectID(offer_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            OfferServices.oneRecord(aggregateCondition).then(offerdata => {

                if (offerdata != null) {

                    var updatePattern = { is_active: status };

                    OfferServices.updateRecord({ _id: offerdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.OFFER_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, "success", resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 200, "error", resMsg);
                    });

                } else {
                    let resMsg = Messages.OFFER_NOT_EXIST;
                    Response.send(req, res, 200, "error", resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, "error", resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, "error", err.message);
        }
    },
    
    deleteOffer: (req, res) => {

        try {

            var offer_id = req.params.offer_id;

            var findPattern = { _id: ObjectID(offer_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            OfferServices.oneRecord(aggregateCondition).then(bannerdata => {

                if (bannerdata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    OfferServices.updateRecord({ _id: bannerdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.OFFER_DELETE_SUCCESS;
                        Response.send(req, res, 200, "success", resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 200, "error", resMsg);
                    });

                } else {
                    let resMsg = Messages.OFFER_NOT_EXIST;
                    Response.send(req, res, 200, "error", resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, "error", resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, "error", err.message);
        }
    },
}
module.exports = OfferController;