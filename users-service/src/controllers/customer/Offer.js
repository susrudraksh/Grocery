'use strict';
//const { ObjectID } = require('mongodb');
var ObjectID = require('mongoose').Types.ObjectId;
const { OfferServices, CartServices } = require('../../services');
const { Common, Response, Validation, Messages, DateTime } = require('../../helpers');
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/offers";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";
const moment = require("moment");

const OfferController = {

    /**
     * @api {post} /user_service/customer/offer/apply_coupon Offer - Apply Coupon
     * @apiGroup App - Offer  
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} promo_code promo_code Id
    * @apiParam {String} order_amount order amount
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Offer applied Successfully",
        "data": {
            "id": "605b053bb9a39e36b1a34b25",
            "discount_price": 50,
            "promo_code": "HOLI"
        }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/cart",
    "message": "error.",
    "data": {}
    }
    */

    applyOffer: async (req, res) => {
        try {
            var order_amount = req.body.order_amount;
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            let cartData = await CartServices.findCartItems({ user_id: user_id }, { product_id: 1, business_category_id: 1, inventory_id: 1, quantity: 1, _id: 0 });
            if (cartData && cartData.length > 0) {
                let total_amount = 0;
                let discount = 0;
                let order_amount = 0
                let counterof_inventory_notavailable = 0;
              //  console.log(cartData);
                cartData = await cartData.map((item) => {
                    if (item.quantity > item.inventory_id.product_quantity) {
                        counterof_inventory_notavailable++;
                    }
                    item.price = item.inventory_id.discounted_product_price
                    total_amount += item.inventory_id.discounted_product_price*item.quantity
                    order_amount += item.inventory_id.discounted_product_price*item.quantity
                    return item
                })

                var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
                OfferServices.applyOffer(req.body, login_user_id).then(async orderResult => {

                    if (orderResult) {
                        if (orderResult.offer_type == 1) {
                            if (orderResult.offer_amount <= order_amount) {
                                var result = {
                                    id: orderResult._id,
                                    discount_price: orderResult.offer_price,
                                    promo_code: req.body.promo_code,
                                }
                                var succMessage = Messages.OFFER_APPLIED_SUCCSSFULLY;
                                Response.send(req, res, 200, succMessage, result)
                            } else {
                                var errMessage = "Coupon only apply for order amount upto " + orderResult.offer_amount + " or more then" + orderResult.offer_amount + "";
                                Response.send(req, res, 400, errMessage)
                            }
                        } else if (orderResult.offer_type == 2) {
                            var amount = await OfferController.checkBundle(cartData, orderResult);
                            if(amount>0){
                                var newamount  = orderResult.offer_price ;
                                if(orderResult.offer_amount_type==2){
                                    newamount = (amount*orderResult.offer_price)/100 ;
                                }
                                if(amount>orderResult.offer_amount){
                                    newamount = orderResult.offer_amount ;
                                }
                                var result = {
                                    id: orderResult._id,
                                    discount_price: newamount,
                                    promo_code: req.body.promo_code,
                                }
                                var succMessage = Messages.OFFER_APPLIED_SUCCSSFULLY;
                                Response.send(req, res, 200, succMessage, result)
                            }else{
                                var succMessage = Messages.PROMOCODE_NOT_APPLIED;
                                Response.send(req, res, 400, succMessage, orderResult)
                            }
                        } else if (orderResult.offer_type == 3) {
                            var offerValid = await OfferController.checkPromitioanl(cartData, orderResult);
                            if(offerValid){
                                var result = {
                                    id: orderResult._id,
                                    discount_price: orderResult.offer_price,
                                    promo_code: req.body.promo_code,
                                }
                                var succMessage = Messages.OFFER_APPLIED_SUCCSSFULLY;
                                Response.send(req, res, 200, succMessage, result)
                            }else{
                                var succMessage = Messages.PROMOCODE_NOT_APPLIED;
                                Response.send(req, res, 400, succMessage, orderResult)
                            }
                        }
                    } else {
                        var errMessage = Messages.OFFER_NOT_FOUND;
                        Response.send(req, res, 400, errMessage)
                    }
                }).catch(err => {
                    var errMessage = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, errMessage);
                })

            } else {
                var errMessage = Messages.CART_IS_EMPTY;
                Response.send(req, res, 400, errMessage);
            }
        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },

    checkPromitioanl: async (cartdata, offerdata) => {
       
        var validOffer = false;
        if (offerdata.business_category != "") {
            var businesscategory = cartdata.filter(o => o.business_category_id.toString() === offerdata.business_category_id.toString());
          
            await businesscategory.map((value)=>{
                    var result = false;
                    if (value && offerdata.category_id != "") {
                        if (value.product_id.category_id.toString() === offerdata.category_id.toString()) {
                            if (offerdata.sub_category_id != ""){
                                if(value.product_id.sub_category_id.toString() === offerdata.sub_category_id.toString()) {
                                    if (offerdata.product_id != ""){
                                        if(value.inventory_id._id.toString() === offerdata.product_id.toString()) {
                                            result = true;
                                        }
                                    }else{
                                        result = true;
                                    }
                                }
                            }else{
                                result = true;
                            }
                        }
                    }else{
                        result = true;
                    }
                    if(result){
                        if(value.quantity >= offerdata.offer_quantity){
                            validOffer = true;
                        }
                    }
            });
           return validOffer;
        }
    },


    checkBundle: async (cartdata, offerdata) => {
       
        var totalproductprice = 0;
        if (offerdata.business_category != "") {
            var businesscategory = cartdata.filter(o => o.business_category_id.toString() === offerdata.business_category_id.toString());
            
            await businesscategory.map((value)=>{
                console.log(value);
                    var result = false;
                    
                    if (value.product_id.category_id.toString() === offerdata.category_id.toString()) {
                        console.log('pass category');
                        if(value.product_id.sub_category_id.toString() === offerdata.sub_category_id.toString()) {
                            if(value.inventory_id._id!="") {
                                var index = offerdata.product_id.indexOf(value.inventory_id._id);
                                if (index >= 0) {
                                    offerdata.product_id.splice( index, 1 );
                                    if(value.inventory_id.is_discount==1){
                                        totalproductprice+=value.inventory_id.discounted_product_price;
                                    }else{
                                        totalproductprice+=value.inventory_id.price;
                                    }
                                }
                                result = true;
                            }
                        }
                    }
            });
            if(offerdata.product_id.length==0){
                totalproductprice = totalproductprice
            }
           return totalproductprice;
        }
    },



    /**
    * @api {get} /user_service/customer/offer  Offers - Listing
    * @apiGroup App - Offer 
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
   {
   "Content-Type": "multipart/form-data"
   }
   *
   * @apiParam {String} page_no Page No.
   * @apiParam {String} keyword Search Keyword
   * @apiParam {String} product_id Product Id
   * @apiParam {String} offer_type Offer Type (1 for promocode , 2 for bundle, 3 for Promotional Offer, 4 for bank)
   *
   * @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
    "message": "Success",
        "data": {
                "docs": [
                {
                    "offer_type": "1",
                    "description": "Rang bhara offer",
                    "startDate": "2021-03-23",
                    "endDate": "2021-03-31",
                    "_id": "605b053bb9a39e36b1a34b25",
                    "coupon_code": "HOLI",
                    "product_id": null,
                    "title": "HOLI HAI",
                    "image": null,
                    "image_thumb_url": null,
                    "business_category": [],
                    "category": [],
                    "subcategory": [],
                    "product": [],
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
   HTTP/1.1 200 OK
   {
   "message": "Error",
   "data": {}
   }
   */
    getOffers: async (req, res) => {

        try {
            var keyword = req.query.keyword || "";
            var offer_type = req.query.offer_type;
            var product_id = req.query.product_id;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var toDay = moment();
            toDay = toDay.format('YYYY-MM-DD');
            var findPattern = {
                is_deleted: 0,
                is_active: 1,
                offer_type: offer_type
            };
            findPattern["$or"] = [
                { startDate: { "$gte": toDay } },
                { startDate: { "$lte": toDay }, endDate: { "$gte": toDay } }
            ];

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'title': { $regex: keyword, $options: "i" } },
                ];
            }
            // if (status && status != "") {
            //     findPattern.is_active = parseInt(status);
            // }
            var productfilter = {};
            if (product_id && product_id != "") {
                productfilter = { "$expr": { "$in": [ObjectID(product_id),"$product_id", ] } } ;
            }
            var sortPattern = { createdAt: -1 };

            let aggregateCondition = [
                { $match: findPattern },
                { $match: productfilter},
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
                        coupon_code: "$coupon_code",
                        product_id: "$product_id",
                        title: "$title",
                        image_path: 1,
                        description: 1,
                        offer_type: 1,
                        startDate: 1,
                        endDate: 1,
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








}

module.exports = OfferController;