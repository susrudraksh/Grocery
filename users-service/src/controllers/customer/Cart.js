'use strict';
//const { ObjectID } = require('mongodb');
var ObjectID = require('mongoose').Types.ObjectId;
const { CartServices, BusinessCategoryServices,NotificationServices } = require('../../services');
const { Common, Response, Validation, Messages } = require('../../helpers');
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const CartController = {

    /**
     * @api {post} /user_service/customer/cart Cart - Add to Cart
     * @apiGroup App - Cart  
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} inventory_id Inventory Id
    * @apiParam {String} product_id Product Id
    * @apiParam {String} business_category_id business category Id
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Item Added to Cart Successfully.",
    "data": {
        "cart_count": 1
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

    addToCart: async (req, res) => {
        try {
            var product_id = req.body.product_id;
            var inventory_id = req.body.inventory_id;
            var business_category_id = req.body.business_category_id;
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var quantity = 1;

            var CreateCart = {
                product_id: ObjectID(product_id),
                business_category_id: ObjectID(business_category_id),
                inventory_id: ObjectID(inventory_id),
                user_id: ObjectID(login_user_id)
            }

            CartServices.createOrUpdateRecord(CreateCart, quantity).then(async cartResult => {

                var succMessage = Messages.CARTITEM_ADD_SUCCESS;
                var cart_count = {
                    cart_count: await CartServices.getDataCount({user_id:login_user_id})
                }
                console.log(cartResult);
                Response.send(req, res, 200, succMessage,cart_count)
            }).catch(err => {
                var errMessage = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errMessage);
            })


        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },

    /**
     * @api {put} /user_service/customer/cart Cart - Update Cart
     * @apiGroup App - Cart  
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} inventory_id Inventory Id
    * @apiParam {String} product_id Product Id
    * @apiParam {String} quantity Quantity
    * @apiParam {String} business_category_id business category Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Cart has updated successfully.",
    "data": {}
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

    updateCart: async (req, res) => {
        try {
            var product_id = req.body.product_id;
            var inventory_id = req.body.inventory_id;
            var business_category_id = req.body.business_category_id;
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var quantity = req.body.quantity;

            var CreateCart = {
                product_id: ObjectID(product_id),
                inventory_id: ObjectID(inventory_id),
                business_category_id: ObjectID(business_category_id),
                user_id: ObjectID(login_user_id)
            }

            CartServices.createOrUpdateRecord(CreateCart, quantity).then(cartResult => {
                var succMessage = Messages.CART_UPDATE_SUCCESS;
                Response.send(req, res, 200, succMessage)
            }).catch(err => {
                var errMessage = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errMessage);
            })


        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },

    /**
     * @api {delete} /user_service/customer/cart/cart_id Cart - Delete Cart item
     * @apiGroup App - Cart  
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} cart_id Cart Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Cart item has removed successfully.",
    "data": {
        "cart_count": 1
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

    deleteCartItem: async (req, res) => {
        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var cart_id = req.params.cart_id;
            var CreateCart = {
                _id: ObjectID(cart_id),
                user_id: ObjectID(login_user_id)
            }
            CartServices.deleteRecord(CreateCart).then(async cartResult => {
                console.log(cartResult);
                var cart_count = {
                    cart_count: await CartServices.getDataCount({user_id:login_user_id})
                }
                var succMessage = Messages.CARTITEM_REMOVE_SUCCESS;
                Response.send(req, res, 200, succMessage,cart_count)
            }).catch(err => {
                var errMessage = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errMessage);
            })

        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },


/**
   * @api {get} /user_service/customer/cart Cart -  Cart item list
   * @apiGroup App - Cart  
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
  {
  "Content-Type": "multipart/form-data"
  }
  *
  * @apiParam {String} page_no Page No.
  * @apiParam {String} limit Limit.
  *
  * @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
    {
    "message": "Cart item list fetched successfully.",
    "data": {
        "docs": [
        {
            "_id": {
            "_id": "5fe97c9112d5874bdd5db00f",
            "name": "Electronics"
            },
            "category_items": [
            {
                "_id": "605afcf1b9a39e36b1a34b1b",
                "cart_id": "605afcf1b9a39e36b1a34b1b",
                "product_id": "6045a7e04485c00b0e36535c",
                "inventory_id": "6045a7e04485c00b0e36535d",
                "quantity": 1,
                "available_quantity": 37,
                "name": "OPPO Reno5 Pro 5G",
                "inventory_name": "Smartphones",
                "images": [
                {
                    "_id": "6045a7e04485c00b0e36535e",
                    "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/161517769682571OLBwyCg0L.SL1500.jpg",
                    "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/6045a7e04485c00b0e36535c/thumb_161517769682571OLBwyCg0L.SL1500.jpg"
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
                "price": 20000,
                "description": "3D Borderless Sense Screen | AI Highlight Video (Ultra Night Video + Live HDR) | Super AMOLED Display\n64MP + 8MP + 2MP + 2MP | 32MP Front Camera\nInnovative 65W SuperVOOC 2.0 flash charging brings the 4350 mAh battery,5 minutes charging & 4hours of video playback, fully charging in 30 minutes.\n16.64 cm (6.55 inch) Full HD+ Display with 2400x1080 resolution.\nColor OS 11.1 based on Android v11.0 operating system with 2.6GHz MediaTek Dimensity 1000+ (MT6889) Processor, ARM G77 MC9 836 MHz",
                "is_discount": 0,
                "discount_type": 2,
                "discount_value": 0,
                "offer_price": 20000,
                "rating": "5"
            }
            ]
        }
        ],
        "totalDocs": 1,
        "limit": 50,
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
  "api_name": "/cart",
  "message": "error.",
  "data": {}
  }
  */


    getCartItems: async (req, res) => {
        //try {
        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

        var aggregateFilter = [
            {
                $match: { user_id: ObjectID(login_user_id) }
            },
            {
                $lookup: {
                    from: 'products',
                    let: { "product_id": "$product_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$product_id"] } } },
                    ],
                    as: 'ProductData'
                }

            },
            { $unwind: '$ProductData' },
            {
                $lookup: {
                    from: 'product_inventories',
                    let: { "inventory_id": "$inventory_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$inventory_id"] } } },
                        { $project: { 'inventory_name': 1, 'price': 1, 'product_quantity': 1,'min_inventory': 1, "is_discount": 1, "discounted_product_price": 1, "discount_type": 1, "discount_value": 1 } }
                    ],
                    as: 'ProductInventoryData'
                }

            },
            { $unwind: '$ProductInventoryData' },
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
                    from: 'product_images',
                    let: { "images": "$ProductData.images" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$images"] } } },
                        { $limit: 1 },
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
                    let: { "id": "$ProductData.category_id" },
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
                    let: { "id": "$ProductData.sub_category_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { 'name': 1 } }],
                    as: 'SubCategoryData'
                }

            },
            { $unwind: "$SubCategoryData" },
            {
                $project: {
                    cart_id: "$_id",
                    product_id: "$product_id",
                    inventory_id: "$inventory_id",
                    quantity: "$quantity",
                    available_quantity: "$ProductInventoryData.product_quantity",
                    min_inventory: '$ProductInventoryData.min_inventory',
                    name: "$ProductData.name",
                    inventory_name: '$ProductInventoryData.inventory_name',
                    images: "$ProductImages",
                    business_category: "$businessCategoryData",
                    category: "$CategoryData",
                    subcategory: "$SubCategoryData",
                    price: "$ProductInventoryData.price",
                    description: '$ProductData.description',
                    is_discount: "$ProductInventoryData.is_discount",
                    discount_type: "$ProductInventoryData.discount_type",
                    discount_value: "$ProductInventoryData.discount_value",
                    offer_price: "$ProductInventoryData.discounted_product_price",
                    rating: "5",
                }
            },
            {
                $group: {
                    _id: "$business_category",
                    "category_items": { $push: "$$ROOT" }
                }
            }

        ];

        var sortPattern = { 'category_items.name': 1 };
        var page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;
        console.log(aggregateFilter[0]['$match']['_id']);
        CartServices.getAggregatePaginatedData(aggregateFilter, sortPattern, page, limit).then(cartResult => {
            var succMessage = Messages.CARTITEM_FETCH_SUCCESS;
            Response.send(req, res, 200, succMessage, cartResult)
        }).catch(err => {

            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        })

        // } catch (err) {
        //     console.log('cartResult')
        //     var errMessage = Validation.getErrorMessage(err);
        //     Response.send(req, res, 500, errMessage);
        // }
    },

    /**
    * @api {get} /user_service/customer/cart/get_cart_item_count Cart -  Cart item count
    * @apiGroup App - Cart
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
   {
   "Content-Type": "multipart/form-data",
   }
   * 
   * @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
    "message": "Success",
        "data": {
            "cart_count": 0,
            "notification_count": 0
        }
    }
   *
   * @apiErrorExample {json} Error-Example
   HTTP/1.1 400 OK
   {
   "message": "Error.",
   "data": {}
   }
   */

    getCartItemCount: async (req, res) => {

        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var findPattern = { user_id: ObjectID(login_user_id) };
            var newfindPattern = { user_id: ObjectID(login_user_id) ,read_status:0};
            var cartCount = await CartServices.getDataCount(findPattern);
            var notificationCount = await NotificationServices.getDataCount(newfindPattern);
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, {
                cart_count: cartCount,
                notification_count:notificationCount
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    }
}

module.exports = CartController;