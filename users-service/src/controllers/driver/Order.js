'use strict';

var ObjectID = require('mongoose').Types.ObjectId;
const { OrderServices, NotificationServices } = require('../../services');
const { Common, Response, Validation, Messages } = require('../../helpers');
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const OrderController = {

    /**
     * @api {get} /user_service/driver/order Driver - Order - Listing
     * @apiGroup App - Driver Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} page_no Page No.
    * @apiParam {String} keyword Search Keyword
    * @apiParam {String} status Status
    * @apiParam {String} date_start  Date start range 
    * @apiParam {String} date_end  Date end range
    * @apiParam {String} price_start  Price start range 
    * @apiParam {String} price_end  Price end range
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
    "docs": [
    {
    "_id": "5fc8c7b13aae972b58b5da87",
    "payment_mode": "Cash",
    "order_status": 1,
    "user_id": "5f6dc2b4e42f141f8c816700",
    "products": [
    {
    "quantity": 5,
    "_id": "5fc8c7b13aae972b58b5da88",
    "product_id": {
    "_id": "5f7c38339ed8b93ac4a93bff",
    "name": "Maggi"
    },
    "business_category_id": {
    "_id": "5f73158c500ead10f8fcdca1",
    "name": "Clothes"
    },
    "inventory_id": {
    "_id": "5f8546a6eb7b292138cd7226",
    "inventory_name": "demo namee"
    }
    },
    {
    "quantity": 5,
    "_id": "5fc8c7b13aae972b58b5da88",
    "product_id": {
    "_id": "5f7c38339ed8b93ac4a93bff",
    "name": "Maggi"
    },
    "business_category_id": {
    "_id": "5f73158c500ead10f8fcdca1",
    "name": "Clothes"
    },
    "inventory_id": {
    "_id": "5f8546a6eb7b292138cd7226",
    "inventory_name": "demo namee"
    }
    },
    {
    "quantity": 1,
    "_id": "5fc8c7b13aae972b58b5da89",
    "product_id": {
    "_id": "5fc4d69d2197f01e3c907629",
    "name": "Samsung smart tv"
    },
    "business_category_id": {
    "_id": "5f731644500ead10f8fcdca2",
    "name": "Electronics"
    },
    "inventory_id": {
    "_id": "5f881d4c3967b3a449f38c71"
    }
    }
    ]
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
    "message": "Error",
    "data": {}
    }
    */

    getOrders: async (req, res) => {

        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var keyword = req.query.keyword || "";
            var status = req.query.status || 1;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {};
            var price_start = req.query.price_start || "";
            var price_end = req.query.price_end || "";
            var date_start = req.query.date_start || "";
            var date_end = req.query.date_end || "";

            if (status == 1) {
                findPattern = { driver_id: ObjectID(login_user_id), order_status: { $in: [0, 1] } }
            } else {
                findPattern = { driver_id: ObjectID(login_user_id), order_status: { $in: [2, 3, 4] } }
            }


            var sortPattern = { createdAt: -1 };

            var datefilter = {};
            if (date_start != '' && date_end != '') {
                var startDate = new Date(date_start + " 00:00:01");
                startDate.setDate(startDate.getDate());

                var endDate = new Date(date_end + " 23:59:59");
                endDate.setDate(endDate.getDate());

                datefilter["$and"] = [
                    { createdAt: { "$gte": startDate } },
                    { createdAt: { "$lte": endDate } }
                ]
            }

            var pricefilter = {};
            if (price_start != '' && price_end != '') {
                pricefilter["$and"] = [
                    { 'net_amount': { "$gte": parseInt(price_start) } },
                    { 'net_amount': { "$lte": parseInt(price_end) } }
                ]
            }

            let aggregateCondition = [
                { $match: findPattern },
                { "$unwind": "$products" },
                {
                    "$lookup": {
                        "from": "products",
                        "let": { "product_id": "$products.product_id" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$product_id"] } } },
                            { "$project": { "name": 1 } }
                        ],
                        "as": "products.product_id"
                    }
                },
                { "$unwind": "$products.product_id" },
                {
                    "$lookup": {
                        "from": "business_categories",
                        "let": { "business_category_id": "$products.business_category_id" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$business_category_id"] } } },
                            { "$project": { "name": 1 } }
                        ],
                        "as": "products.business_category_id"
                    }
                },
                { "$unwind": "$products.business_category_id" },
                {
                    "$lookup": {
                        "from": "product_inventories",
                        "let": { "inventory_id": "$products.inventory_id" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$inventory_id"] } } },
                            { "$project": { "inventory_name": 1 } }
                        ],
                        "as": "products.inventory_id"
                    }
                },
                { "$unwind": "$products.inventory_id" },
                {
                    $lookup: {
                        from: 'users',
                        let: { "id": "$user_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "username": 1, "phone": 1, 'delivery_address': 1 } }
                        ],
                        as: 'userData'
                    }
                },
                { "$unwind": "$userData" },
                { $match: pricefilter },
                { $match: datefilter },
                {
                    "$group": {
                        "_id": "$_id",
                        "order_id": { "$first": "$order_id" },
                        "total_amount": { "$first": "$total_amount" },
                        "net_amount": { "$first": "$net_amount" },
                        delivery_address: { "$first": "$delivery_address" },
                        "payment_mode": { "$first": "$payment_mode" },
                        "order_status": { "$first": "$order_status" },
                        "user_id": { "$first": "$userData" },
                        "products": { "$push": "$products" },
                        "createdAt": { "$first": "$createdAt" },

                    }
                },
                {
                    "$project": {
                        "_id": "$_id",
                        "order_id": "$order_id",
                        "net_amount": "$net_amount",
                        "total_amount": "$total_amount",
                        delivery_address: {
                            $filter: {
                                input: "$user_id.delivery_address",
                                as: "num",
                                cond: { $eq: ["$$num._id", "$delivery_address"] }
                            }
                        },
                        "payment_mode": "$payment_mode",
                        "order_status": "$order_status",
                        "user_id": "$user_id",
                        "createdAt": "$createdAt",
                    }
                },
                { "$unwind": "$delivery_address" },
                {
                    "$project": {
                        "_id": "$_id",
                        "order_id": "$order_id",
                        "net_amount": "$net_amount",
                        "total_amount": "$total_amount",
                        delivery_address: { _id: "$delivery_address._id", "full_address": "$delivery_address.full_address" },
                        "payment_mode": "$payment_mode",
                        "order_status": "$order_status",
                        "user_id": {
                            _id: "$user_id._id", "username": "$user_id.username", "phone": "$user_id.phone"
                        },
                        "createdAt": "$createdAt",
                    }
                }
            ];

            OrderServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

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

    /**
     * @api {get} /user_service/driver/order/order_detail/order_id Order - Get Single
     * @apiGroup App - Driver Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiSuccessExample {json} Success-Example
    {
    "message": "Success",
    "data": [
    {
        "category": {
            "_id": "5f731644500ead10f8fcdca2",
            "is_active": 1,
            "is_deleted": 0,
            "name": "Electronics",
            "cancelation_time": 45,
            "return_time": 30,
            "createdAt": "2020-09-29T11:11:00.798Z",
            "updatedAt": "2020-11-24T09:57:08.145Z",
            "__v": 0,
            "category_image": null,
            "order_number": 5
        },
        "_id": "5fc8c7b13aae972b58b5da87",
        "offers": null,
        "payment_mode": "Cash",
        "total_amount": null,
        "discount": null,
        "net_amount": null,
        "delivery_address": "5f757eda6fcbe90a537e2507",
        "user_id": {
            "_id": "5f6dc2b4e42f141f8c816700",
            "username": "nishant",
            "phone": 3699621889
        },
        "driver_id": {
            "_id": "5f75a0a2df09bc17e45982ba",
            "username": "Neha sharma",
            "phone": "111222v333"
        },
        "promo_code": "",
        "products": [
            {
                "_id": "5fc4d69d2197f01e3c907629",
                "images": [
                    "5fc4d69d2197f01e3c90762b"
                ],
                "is_active": 1,
                "is_deleted": 0,
                "name": "Samsung smart tv",
                "business_category_id": "5f731644500ead10f8fcdca2",
                "brand_id": "5f90036c6af16229acc7e760",
                "category_id": "5fc4d60d2197f01e3c907627",
                "sub_category_id": "5fc4d6252197f01e3c907628",
                "description": "Testing",
                "createdAt": "2020-11-30T11:25:17.216Z",
                "updatedAt": "2020-11-30T11:25:17.315Z",
                "__v": 0
            }
        ]
    },
    {
        "category": {
            "_id": "5f73158c500ead10f8fcdca1",
            "is_active": 1,
            "is_deleted": 0,
            "name": "Clothes",
            "cancelation_time": 30,
            "return_time": 30,
            "createdAt": "2020-09-29T11:07:56.399Z",
            "updatedAt": "2020-11-24T09:57:12.183Z",
            "__v": 0,
            "category_image": null,
            "order_number": 9
        },
        "_id": "5fc8c7b13aae972b58b5da87",
        "offers": null,
        "payment_mode": "Cash",
        "total_amount": null,
        "discount": null,
        "net_amount": null,
        "delivery_address": "5f757eda6fcbe90a537e2507",
        "user_id": {
            "_id": "5f6dc2b4e42f141f8c816700",
            "username": "nishant",
            "phone": 3699621889
        },
        "driver_id": {
            "_id": "5f75a0a2df09bc17e45982ba",
            "username": "Neha sharma",
            "phone": "111222v333"
        },
        "promo_code": "",
        "products": [
            {
                "_id": "5f7c38339ed8b93ac4a93bff",
                "images": [],
                "is_active": 0,
                "is_deleted": 0,
                "name": "Maggi",
                "business_category_id": "5f73158c500ead10f8fcdca1",
                "category_id": "5f8040ee08707c11ecb09db8",
                "sub_category_id": "5f80412a08707c11ecb09db9",
                "createdAt": "2020-10-06T09:26:11.670Z",
                "updatedAt": "2020-11-30T09:33:43.919Z",
                "__v": 0,
                "brand_id": "5f9003746af16229acc7e761",
                "description": "Demo"
            },
            {
                "_id": "5f7c38339ed8b93ac4a93bff",
                "images": [],
                "is_active": 0,
                "is_deleted": 0,
                "name": "Maggi",
                "business_category_id": "5f73158c500ead10f8fcdca1",
                "category_id": "5f8040ee08707c11ecb09db8",
                "sub_category_id": "5f80412a08707c11ecb09db9",
                "createdAt": "2020-10-06T09:26:11.670Z",
                "updatedAt": "2020-11-30T09:33:43.919Z",
                "__v": 0,
                "brand_id": "5f9003746af16229acc7e761",
                "description": "Demo"
            }
        ]
    }
    ]
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
        "status": "error",
        "api_name": "/notifications",
        "message": "error.",
        "data": {}
    }
    */
    OrderDetails: async (req, res) => {

        try {

            let orderDetail = await OrderServices.orderDetail({ _id: ObjectID(req.params.order_id) })

            if (orderDetail && orderDetail.length > 0) {

                var succMessage = "Success";
                Response.send(req, res, 200, succMessage, orderDetail)

            } else {
                throw Messages.ORDERS_NOT_FOUND;
            }

        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },


    /**
    * @api {put} /user_service/driver/order/update_order_status:order_id Order - Update Order Status
    * @apiGroup App - Driver Order
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
   {
   "Content-Type": "multipart/form-data"
   }
   * @apiParam {String} status Order Status (Acknowledged/Packed/In_Transit/Delivered)
   *
   * @apiSuccessExample {json} Success-Example
   {
   "message": "Success",
   "data": [
   {
       "category": {
           "_id": "5f731644500ead10f8fcdca2",
           "is_active": 1,
           "is_deleted": 0,
           "name": "Electronics",
           "cancelation_time": 45,
           "return_time": 30,
           "createdAt": "2020-09-29T11:11:00.798Z",
           "updatedAt": "2020-11-24T09:57:08.145Z",
           "__v": 0,
           "category_image": null,
           "order_number": 5
       },
       "_id": "5fc8c7b13aae972b58b5da87",
       "offers": null,
       "payment_mode": "Cash",
       "total_amount": null,
       "discount": null,
       "net_amount": null,
       "delivery_address": "5f757eda6fcbe90a537e2507",
       "user_id": {
           "_id": "5f6dc2b4e42f141f8c816700",
           "username": "nishant",
           "phone": 3699621889
       },
       "driver_id": {
           "_id": "5f75a0a2df09bc17e45982ba",
           "username": "Neha sharma",
           "phone": "111222v333"
       },
       "promo_code": "",
       "products": [
           {
               "_id": "5fc4d69d2197f01e3c907629",
               "images": [
                   "5fc4d69d2197f01e3c90762b"
               ],
               "is_active": 1,
               "is_deleted": 0,
               "name": "Samsung smart tv",
               "business_category_id": "5f731644500ead10f8fcdca2",
               "brand_id": "5f90036c6af16229acc7e760",
               "category_id": "5fc4d60d2197f01e3c907627",
               "sub_category_id": "5fc4d6252197f01e3c907628",
               "description": "Testing",
               "createdAt": "2020-11-30T11:25:17.216Z",
               "updatedAt": "2020-11-30T11:25:17.315Z",
               "__v": 0
           }
       ]
   },
   {
       "category": {
           "_id": "5f73158c500ead10f8fcdca1",
           "is_active": 1,
           "is_deleted": 0,
           "name": "Clothes",
           "cancelation_time": 30,
           "return_time": 30,
           "createdAt": "2020-09-29T11:07:56.399Z",
           "updatedAt": "2020-11-24T09:57:12.183Z",
           "__v": 0,
           "category_image": null,
           "order_number": 9
       },
       "_id": "5fc8c7b13aae972b58b5da87",
       "offers": null,
       "payment_mode": "Cash",
       "total_amount": null,
       "discount": null,
       "net_amount": null,
       "delivery_address": "5f757eda6fcbe90a537e2507",
       "user_id": {
           "_id": "5f6dc2b4e42f141f8c816700",
           "username": "nishant",
           "phone": 3699621889
       },
       "driver_id": {
           "_id": "5f75a0a2df09bc17e45982ba",
           "username": "Neha sharma",
           "phone": "111222v333"
       },
       "promo_code": "",
       "products": [
           {
               "_id": "5f7c38339ed8b93ac4a93bff",
               "images": [],
               "is_active": 0,
               "is_deleted": 0,
               "name": "Maggi",
               "business_category_id": "5f73158c500ead10f8fcdca1",
               "category_id": "5f8040ee08707c11ecb09db8",
               "sub_category_id": "5f80412a08707c11ecb09db9",
               "createdAt": "2020-10-06T09:26:11.670Z",
               "updatedAt": "2020-11-30T09:33:43.919Z",
               "__v": 0,
               "brand_id": "5f9003746af16229acc7e761",
               "description": "Demo"
           },
           {
               "_id": "5f7c38339ed8b93ac4a93bff",
               "images": [],
               "is_active": 0,
               "is_deleted": 0,
               "name": "Maggi",
               "business_category_id": "5f73158c500ead10f8fcdca1",
               "category_id": "5f8040ee08707c11ecb09db8",
               "sub_category_id": "5f80412a08707c11ecb09db9",
               "createdAt": "2020-10-06T09:26:11.670Z",
               "updatedAt": "2020-11-30T09:33:43.919Z",
               "__v": 0,
               "brand_id": "5f9003746af16229acc7e761",
               "description": "Demo"
           }
       ]
   }
   ]
   }
   *
   * @apiErrorExample {json} Error-Example
   HTTP/1.1 200 OK
   {
       "status": "error",
       "api_name": "/notifications",
       "message": "error.",
       "data": {}
   }
   */
    updateOrderStatus: async (req, res) => {

        var status = req.body.status;
        console.log(req.body)
        var order_id = req.params.order_id;
        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

        var aggregateCondition = [
            { $match: { _id: ObjectID(order_id), driver_id: ObjectID(login_user_id) } },
        ]
        OrderServices.oneRecord(aggregateCondition).then(async orderResult => {
            console.log("orderResult",orderResult)

            if (orderResult.length > 0) {

                let data = orderResult[0].tracking_status;
                console.log("data",data)
                if (orderResult[0].order_status == 4) {
                    var errMessage = Messages.STATUS_CANCLE_ALREADY_UPDATED;
                    Response.send(req, res, 400, errMessage);
                }
                console.log(status);
                console.log("tracking_status",orderResult[0].tracking_status[status])
                if (orderResult[0].tracking_status[status].status == 1) {
                    var errMessage = Messages.STATUS_ALREADY_UPDATED;
                    Response.send(req, res, 400, errMessage);
                } else {    

                    var newtrackingstatus = orderResult[0];
                    console.log("newtrackingstatus",newtrackingstatus)
                    newtrackingstatus.tracking_status[status] = {
                        status: 1,
                        status_title: status,
                        time: new Date().toISOString()
                    };
                   
                    newtrackingstatus.current_tracking_status = status;
                    console.log("newtrackingstatus1",newtrackingstatus)
                    if (status == "Delivered") {
                        newtrackingstatus.order_status = 2;
                        newtrackingstatus.delivered_date = new Date().toISOString()
                    }
                    

                    var newfindPattern = { _id: ObjectID(order_id) };
                    var select = "tracking_status order_status current_tracking_status order_id user_id";
                    await OrderServices.updateRecord(newfindPattern, newtrackingstatus, select).then(async updatedRes => {
                        //console.log(updatedRes);
                        NotificationServices.sendNotification('Athwas', 'Your order #' + updatedRes.order_id + ' is ' + status + '', updatedRes.user_id, 3, '', '', updatedRes._id, [2, 3],'',3)
                        var succMessage = Messages.ORDERS_STATUS_UPDATE_SUCCESSFULLy;
                        Response.send(req, res, 200, succMessage, updatedRes)
                    }).catch(err => {
                        var errMessage = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, errMessage);
                    });
                }
            } else {
                var errMessage = Messages.ORDERS_NOT_FOUND;
                Response.send(req, res, 500, errMessage);
            }

        }).catch(err => {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        });
    },

/**
   * @api {get} /user_service/driver/order/order_stats Order - Order Stats
   * @apiGroup App - Driver Order
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
  {
  "Content-Type": "multipart/form-data"
  }
  *
  * @apiSuccessExample {json} Success-Example
  {
    "message": "Success",
    "data": {
        "totalOrder": 2,
        "totalDeliveredOrder": 1,
        "totalNotDeliveredOrder": 2
    }
  }
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 200 OK
  {
      "status": "error",
      "api_name": "/notifications",
      "message": "error.",
      "data": {}
  }
  */

    orderStats: async (req, res) => {

        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var findTotalPattern = { driver_id: ObjectID(login_user_id) };
            var findDeliverdPattern = { driver_id: ObjectID(login_user_id), order_status: 2 };
            var findNotDeliveredPattern = { driver_id: ObjectID(login_user_id), order_status: { $ne: 2 } };

            var totalOrder = await OrderServices.getDataCount(findTotalPattern);
            var totalDeliveredOrder = await OrderServices.getDataCount(findDeliverdPattern);
            var totalNotDeliveredOrder = await OrderServices.getDataCount(findNotDeliveredPattern);

            // success
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, {
                totalOrder: totalOrder,
                totalDeliveredOrder: totalDeliveredOrder,
                totalNotDeliveredOrder: totalNotDeliveredOrder,
            })

        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    }
}

module.exports = OrderController;