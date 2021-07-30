"use strict";
//const { ObjectID } = require('mongodb');
var ObjectID = require("mongoose").Types.ObjectId;
const {
  CartServices,
  OrderServices,
  UserServices,
  BusinessCategoryServices,
  WarehouseServices,
  ProductInventoryServices,
  TransactionHistoryServices,
  NotificationServices,
  ContentServices
} = require("../../services");
const ejs = require("ejs");
const moment= require("moment")
const { Common, Response, Validation, Messages ,PushNotification,Media} = require("../../helpers");
const pdf= require("html-pdf")
const config = require("../../config");
const { BusinessCategory, Order } = require("../../models");
const UPLOAD_FOLDER_URL =
  config.apiGatewayUrl +
  "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL =
  config.apiGatewayUrl +
  "/service/assets?service=user_service&filepath=default";

const OrderController = {
  /**
  * @api {get} /user_service/customer/order/user_orders  Users Order history
  * @apiGroup User - Order
  *
  * @apiHeaderExample {application/json} Header-Example
  {
  "Content-Type": "application/json"
  }
  *
  *
  * @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
  {
  "message": "Orders found",
  "data": [
  {
  "order_status": 0,
  "offers": [],
  "payment_mode": "Cash",
  "_id": "5fca19c5de589b17c497a372",
  "user_id": "5fca0e3fbe8d5c1b3019afc7",
  "total_amount": 300,
  "discount": 0,
  "net_amount": 300,
  "products": [
  {
  "quantity": 1,
  "_id": "5fca19c5de589b17c497a373",
  "product_id": {
  "_id": "5f9c124b0573d062c3d83399",
  "name": "Dell Lapi",
  "product_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/5f9c124b0573d062c3d83399/undefined",
  "product_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/product/5f9c124b0573d062c3d83399/thumb_undefined",
  "id": "5f9c124b0573d062c3d83399"
  },
  "business_category_id": {
  "_id": "5f982d365f33cd7ba750707a",
  "name": "Iron man",
  "category_image": "1603808566563h.jpg",
  "category_image_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/business_category/5f982d365f33cd7ba750707a/1603808566563h.jpg",
  "category_image_thumb_url": "http://localhost:3050/service/assets?service=user_service&filepath=uploads/business_category/5f982d365f33cd7ba750707a/thumb_1603808566563h.jpg",
  "id": "5f982d365f33cd7ba750707a"
  },
  "inventory_id": "5f9c124b0573d062c3d8339a"
  }
  ],
  "delivery_address": "5f757eda6fcbe90a537e2507",
  "promo_code": "",
  "createdAt": "2020-12-04T11:13:09.724Z",
  "updatedAt": "2020-12-04T11:13:09.724Z",
  "__v": 0,
  "id": "5fca19c5de589b17c497a372"
  }
  ]
  }
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 400 OK
  {
  "message": "Error",
  "data": {}
  }
  */

  userOrders: async (req, res) => {
    try {
      var user_id =
        Common.getUserdetailsBytoken(req.headers.authorization) || null;
      let orderRecords = await OrderServices.userOrders({ user_id: user_id });
      if (orderRecords && orderRecords.length > 0) {
        var succMessage = Messages.ORDERS_FOUND;
        Response.send(req, res, 200, succMessage, orderRecords);
      } else {
        throw Messages.ORDERS_NOT_FOUND;
      }
    } catch (err) {
      var errMessage = Validation.getErrorMessage(err);
      Response.send(req, res, 500, errMessage);
    }
  },

  /**
  * @api {get} /user_service/customer/order/order_details/5fca19c5de589b17c497a372  Users Order Detail
  * @apiGroup User - Order
  *
  * @apiHeaderExample {application/json} Header-Example
  {
  "Content-Type": "application/json"
  }
  *
  *
  * @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
  {
  "message": "Orders found",
  "data": [
  {
  "category": {
  "_id": "5f982d365f33cd7ba750707a",
  "is_active": 1,
  "is_deleted": 1,
  "name": "Iron man",
  "cancelation_time": 10,
  "return_time": 10,
  "createdAt": "2020-10-27T14:22:46.555Z",
  "updatedAt": "2020-11-04T04:43:34.679Z",
  "__v": 0,
  "category_image": "1603808566563h.jpg"
  },
  "_id": "5fca19c5de589b17c497a372",
  "offers": [],
  "payment_mode": "Cash",
  "total_amount": 300,
  "discount": 0,
  "net_amount": 300,
  "delivery_address": "5f757eda6fcbe90a537e2507",
  "promo_code": "",
  "products": [
  {
  "_id": "5f9c124b0573d062c3d83399",
  "images": [
  "5f9c124b0573d062c3d8339b",
  "5f9c124b0573d062c3d8339d"
  ],
  "is_active": 1,
  "is_deleted": 0,
  "name": "Dell Lapi",
  "business_category_id": "5f757eda6fcbe90a537e2507",
  "brand_id": "5f9834e55f33cd7ba750707c",
  "category_id": "5f897f85c63c09085401c8d4",
  "sub_category_id": "5f75b77360a6f52835359855",
  "description": "Dell lapi",
  "createdAt": "2020-10-30T13:16:59.240Z",
  "updatedAt": "2020-10-30T13:16:59.273Z",
  "__v": 0
  }
  ]
  }
  ]
  }
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 400 OK
  {
  "message": "Error",
  "data": {}
  }
  */

  // customerOrderDetails: async (req, res) => {

  //     try {

  //         var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

  //         let orderDetail = await OrderServices.orderDetail({ _id: ObjectID(req.params.id) })

  //         if (orderDetail && orderDetail.length > 0) {

  //             var succMessage = "Success";
  //             Response.send(req, res, 200, succMessage, orderDetail)

  //         } else {
  //             throw Messages.ORDERS_NOT_FOUND;
  //         }

  //     } catch (err) {
  //         var errMessage = Validation.getErrorMessage(err);
  //         Response.send(req, res, 500, errMessage);
  //     }
  // },
  customerOrderDetails: async (req, res) => {
    try {
      var user_id =
        Common.getUserdetailsBytoken(req.headers.authorization) || null;
      console.log(user_id);

      let orderDetail = await OrderServices.orderDetail({
        _id: ObjectID(req.params.id),
      });
      
      if (orderDetail && orderDetail.length > 0) {
        var succMessage = "Success";
        Response.send(req, res, 200, succMessage, orderDetail[0]);
      } else {
        var errMessage = Messages.ORDERS_NOT_FOUND;
        Response.send(req, res, 400, errMessage, orderDetail[0]);
      }
    } catch (err) {
      var errMessage = Validation.getErrorMessage(err);
      Response.send(req, res, 500, errMessage);
    }
  },

  

  /**
  * @api {get} /user_service/customer/order/  Order - Listing
  * @apiGroup Admin - Order
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
      var keyword = parseInt(req.query.keyword) || "";
      var status = req.query.order_status || "";
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;

      var findPattern = {};

      if (status == "1") {
          findPattern = { order_status: { $in: [0, 1] } }
      } else if (status == "2") {
          findPattern = { order_status: { $in: [2,3,4,5] } }
      } else {
          findPattern = { order_status: { $in: [0,1,2,3,4,5] } }
      }

      if (keyword && keyword != "") {
        findPattern.order_id = keyword
    }

      var sortPattern = { createdAt: -1 };

      let aggregateCondition = [
        { $match: findPattern },
        // { $unwind: "$products" },
        // {
        //   $lookup: {
        //     from: "products",
        //     let: { product_id: "$products.product_id" },
        //     pipeline: [
        //       { $match: { $expr: { $eq: ["$_id", "$$product_id"] } } },
        //       { $project: { name: 1 } },
        //     ],
        //     as: "products.product_id",
        //   },
        // },
        // { $unwind: "$products.product_id" },
        // {
        //   $lookup: {
        //     from: "business_categories",
        //     let: { business_category_id: "$products.business_category_id" },
        //     pipeline: [
        //       {
        //         $match: { $expr: { $eq: ["$_id", "$$business_category_id"] } },
        //       },
        //       { $project: { name: 1 } },
        //     ],
        //     as: "products.business_category_id",
        //   },
        // },
        // { $unwind: "$products.business_category_id" },
        // {
        //   $lookup: {
        //     from: "product_inventories",
        //     let: { inventory_id: "$products.inventory_id" },
        //     pipeline: [
        //       { $match: { $expr: { $eq: ["$_id", "$$inventory_id"] } } },
        //       { $project: { inventory_name: 1 } },
        //     ],
        //     as: "products.inventory_id",
        //   },
        // },
        // { $unwind: "$products.inventory_id" },
        {
          $lookup: {
            from: "users",
            let: { id: "$user_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { username: 1, phone: 1 } },
            ],
            as: "userData",
          },
        },
        { $unwind: "$userData" },
        {
          $lookup: {
            from: "users",
            let: { id: "$driver_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { username: 1, phone: 1 } },
            ],
            as: "driverData",
          },
        },
        //  {$unwind:'$driverData'},
        {
          $group: {
            _id: "$_id",
            order_id: { $first: "$order_id" },
            payment_mode: { $first: "$payment_mode" },
            order_status: { $first: "$order_status" },
            user_name: { $first: "$userData.username" },
            phone: { $first: "$userData.phone" },
            net_amount: { $first: "$net_amount" },
            discounted_amount: { $first: "$discount" },
            driver_id: { $first: "$driverData._id" },
            createdAt: { $first: "$createdAt" },
            //products: { $push: "$products" },
          },
        },
      ];

      OrderServices.getAggregatePaginatedData(
        aggregateCondition,
        sortPattern,
        page,
        limit
      )
        .then((userdata) => {
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, userdata);
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 200, resMsg);
        });
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },
  /**
  * @api {get} /user_service/admin/order/get_passed_orders Order - Get Passed Order List
  * @apiGroup Admin - Order
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
  "_id": "5fc8c7b13aae972b58b5da87",
  "payment_mode": "Cash",
  "order_status": 2,
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
  HTTP/1.1 200 OK
  {
  "message": "order doesn't exist.",
  "data": {}
  }
  */
  getPassedOrders: async (req, res) => {
    var login_user_id =
      Common.getUserdetailsBytoken(req.headers.authorization) || null;

    try {
      var keyword = req.query.keyword || "";
      var status = req.query.status;
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;

      var findPattern = { user_id: ObjectID(login_user_id) };

      findPattern = { order_status: { $in: [2, 3] } };

      var sortPattern = { createdAt: -1 };

      let aggregateCondition = [
        { $match: findPattern },
        { $unwind: "$products" },
        {
          $lookup: {
            from: Product.collection.name,
            let: { product_id: "$products.product_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$product_id"] } } },
              { $project: { name: 1 } },
            ],
            as: "products.product_id",
          },
        },
        { $unwind: "$products.product_id" },
        {
          $lookup: {
            from: BusinessCategory.collection.name,
            let: { business_category_id: "$products.business_category_id" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$business_category_id"] } },
              },
              { $project: { name: 1 } },
            ],
            as: "products.business_category_id",
          },
        },
        { $unwind: "$products.business_category_id" },
        {
          $lookup: {
            from: ProductInventry.collection.name,
            let: { inventory_id: "$products.inventory_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$inventory_id"] } } },
              { $project: { inventory_name: 1 } },
            ],
            as: "products.inventory_id",
          },
        },
        { $unwind: "$products.inventory_id" },
        {
          $group: {
            _id: "$_id",
            payment_mode: { $first: "$payment_mode" },
            order_status: { $first: "$order_status" },
            user_id: { $first: "$user_id" },
            products: { $push: "$products" },
          },
        },
      ];

      OrderServices.getAggregatePaginatedData(
        aggregateCondition,
        sortPattern,
        page,
        limit
      )
        .then((userdata) => {
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, userdata);
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 200, resMsg);
        });
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },
  /**
  * @api {get} /user_service/admin/order/get_order_detail:order_id Order - Get Single
  * @apiGroup Admin - Order
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
  "_id": "5fc8c7b13aae972b58b5da87",
  "payment_mode": "Cash",
  "order_status": 2,
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
  }
  ]
  }
  }
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 200 OK
  {
  "message": "Offer doesn't exist.",
  "data": {}
  }
  */
  getOrderDetail: async (req, res) => {
    try {
      var order_id = req.query.order_id || null;

      var findPattern = { _id: ObjectID(order_id) };

      var sortPattern = { createdAt: -1 };

      let aggregateCondition = [
        { $match: findPattern },
        { $unwind: "$products" },
        {
          $lookup: {
            from: Product.collection.name,
            let: { product_id: "$products.product_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$product_id"] } } },
              { $project: { name: 1 } },
            ],
            as: "products.product_id",
          },
        },
        { $unwind: "$products.product_id" },
        {
          $lookup: {
            from: BusinessCategory.collection.name,
            let: { business_category_id: "$products.business_category_id" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$business_category_id"] } },
              },
              { $project: { name: 1 } },
            ],
            as: "products.business_category_id",
          },
        },
        { $unwind: "$products.business_category_id" },
        {
          $lookup: {
            from: ProductInventry.collection.name,
            let: { inventory_id: "$products.inventory_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$inventory_id"] } } },
              { $project: { inventory_name: 1 } },
            ],
            as: "products.inventory_id",
          },
        },
        { $unwind: "$products.inventory_id" },
        {
          $group: {
            _id: "$_id",
            payment_mode: { $first: "$payment_mode" },
            order_status: { $first: "$order_status" },
            user_id: { $first: "$user_id" },
            products: { $push: "$products" },
          },
        },
      ];

      //console.log('----->', aggregateCondition);

      OrderServices.oneRecord(aggregateCondition)
        .then((orderdata) => {
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, orderdata);
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 200, resMsg);
        });
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },

  assignOrder: async (req, res) => {
    var orderIdsArr = JSON.parse(req.body.order_arr) || [];
    var driver_id = req.body.driver_id || "";
    var driverMaxOrderAllow = 10;
    orderIdsArr = await orderIdsArr.map((val) => ObjectID(val));
    let existOrder = await Order.countDocuments({
      driver_id: driver_id,
      order_status: 1,
    });
    let checkDriverOutForDelivery = await Order.countDocuments({
      driver_id: driver_id,
      order_status: 1,
      "tracking_status.In_Transit.status": 1,
    });
    let userInfo = await UserServices.getUserDetailById({ _id: driver_id });
    if (checkDriverOutForDelivery) {
      let resMsg = "Driver is already out for delivery";
      Response.send(req, res, 500, resMsg);
    } else {
      if (existOrder + orderIdsArr.length > driverMaxOrderAllow) {
        let resMsg =
          "Driver already assign with " +
          existOrder +
          " orders and you select " +
          orderIdsArr.length +
          " orders, You can't assign driver more than 10 orders at a time";
        Response.send(req, res, 500, resMsg);
      } else {
        try {


          Order.updateMany(
            { _id: { $in: orderIdsArr } },
            {
              $set: {
                driver_id: driver_id,
                order_status: 1,
                current_tracking_status: "Packed",
                "tracking_status.Packed": {
                  status_title: "Packed",
                  status: 1,
                  time: new Date().toISOString()
                }
              },
            },
            { upsert: false},
            
          )
            .exec()
            .then(function async(data) {
              
              if(userInfo.device_token!=""){
                var message = {
                    to: userInfo.device_token,
                    collapse_key: '',
                    data: {
                       // your_custom_data_key: 'your_custom_data_value',
                       custom_message_type:4  
                    },
                    notification: {
                        title: 'Athwas',
                        body: 'New order assigned'
                    }
                };
                PushNotification.sendForAndriodIos(message);
                NotificationServices.sendNotification("Athwas", orderIdsArr.length+" New order assigned",driver_id, 3, '', '', "", [3]);
            }

              console.log("after update data", data);
              let resMsg = "Success";
              Response.send(req, res, 200, resMsg);
            })
            .catch(function (err) {
              Response.send(req, res, 500, err.message);
            });
        } catch (err) {
          Response.send(req, res, 500, err.message);
        }
      }
    }
  },

  getAvailableDrivers: (req, res) => {
    try {
      var keyword = req.body.keyword || "";
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;
      var latitude = req.body.latitude || 26.8489174;
      var longitude = req.body.longitude || 75.808783;
      var range = req.body.range || 100;

      var findPattern = {
        is_deleted: 0,
        user_role: 4,
        is_active: 1,
        online_status: 1,
        // is_busy:0
      };

      var nearPattern = null;
      if (latitude != "" && longitude != "") {
        nearPattern = {
          near: { type: "Point", coordinates: [longitude, latitude] },
          spherical: true,
          distanceField: "distance",
          distanceMultiplier: 0.000621371, // 0.000621371 (for miles), 0.001 (for km)
        };
        // if (range && range > 0) {
        //   nearPattern.maxDistance = range * 1609.34;
        // }
      }

      var sortPattern = { createdAt: -1 };
      let aggregateConditions = [
        {
          $match: findPattern,
        },
        {
          $project: {
            user_image_url: {
              $cond: [
                { $eq: ["$user_image", ""] },
                { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                {
                  $concat: [
                    UPLOAD_FOLDER_URL + "/",
                    { $toString: "$_id" },
                    "/",
                    "$user_image",
                  ],
                },
              ],
            },
            user_image_thumb_url: {
              $cond: [
                { $eq: ["$user_image", ""] },
                { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                {
                  $concat: [
                    UPLOAD_FOLDER_URL + "/",
                    { $toString: "$_id" },
                    "/thumb_",
                    "$user_image",
                  ],
                },
              ],
            },
            // address: 1,
            // country_code: 1,
            createdAt: 1,
            email: 1,
            is_active: 1,
            phone: 1,
            user_role: 1,
            username: 1,
            wallet: 1,
            register_id: 1,
            online_status: 1,
            is_deleted: 1,
            is_busy: 1,
          },
        },
      ];
      if (nearPattern) {
        aggregateConditions.unshift({ $geoNear: nearPattern });
      }

      UserServices.allRecord(aggregateConditions)
        .then((userdata) => {
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, userdata);
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },

  returnOrderByAdmin: async (req, res) => {

    try {
      var user_id = req.params.user_id || null;
      var order_id = req.params.order_id || null;
      var sub_order_id = req.params.sub_order_id || null;
      var status = req.params.status || null;

      let aggregateCondition = [{ $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } } }, { $unwind: '$products' }];

      OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {

        let orderdata = orderDetail[0];
        if (orderDetail && orderDetail.length > 0) {

          await OrderServices.oneRecord(
            [{ $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } } },
            {
                $project: {

                    product: {
                        $filter: {
                            input: "$products",
                            as: "num",
                            cond: { $eq: ["$$num._id", ObjectID(sub_order_id)] }
                        }
                    }
                }
            }
            ]
        ).then(async (orderUpdate) => {
          var updatedOrderdetails = orderUpdate[0];
          if(status==2){
            if (orderUpdate[0].product[0].status == 1) {

              await OrderServices.updateRecord(
                { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } },
                { 'products.$.status': status, return_date: new Date() }
              ).then(async (orderUpdate) => {
              
                let productExist = await ProductInventoryServices.oneRecord([{ $match: { _id: ObjectID(updatedOrderdetails.product[0].inventory_id), warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(orderdata.warehouse_id) } } } }]);
              
                if (productExist) {
                  await ProductInventoryServices.updateRecord({
                    _id: ObjectID(orderdata.products.inventory_id),
                    warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(orderdata.warehouse_id) } }
                  }, { $inc: { 'warehouseinventry.$.quantity': (orderdata.products.quantity) } });
                } else {

                  var createProductInventry = {
                    warehouse_id: orderdata.warehouse_id,
                    quantity: orderdata.products.quantity,
                  }
                  await ProductInventoryServices.updateRecord({ _id: ObjectID(orderdata.products.inventory_id), is_deleted: 0 }, { $push: { warehouseinventry: createProductInventry } });
                }

                var returnamount = (updatedOrderdetails.product[0].is_discount == 1) ? updatedOrderdetails.product[0].offer_price : updatedOrderdetails.product[0].price;
                returnamount = parseFloat(returnamount * updatedOrderdetails.product[0].quantity);
                await UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { wallet: (parseFloat(returnamount)) } }, 'id wallet username').then(async updatedWallet => {
                  if (updatedWallet) {

                  var addPattern = {};
                  var transition_id = Common.generateRandomNumber(8);
                  addPattern.user_id = user_id;
                  addPattern.transition_id = transition_id;
                  addPattern.reason = 'order return';
                // addPattern.sender_id = 1;
                  addPattern.user_type = 3;
                  addPattern.sender_type = 1;
                  addPattern.amount = parseFloat(returnamount);
                  addPattern.wallet_amount = updatedWallet.wallet;
                  addPattern.amount_type = 1;
                  addPattern.request_type = 5;
                  addPattern.order_id = order_id;
                    await TransactionHistoryServices.createRecord(addPattern);
                    var notificationTitle = 'Athwas';
                    var notificationText = 'Your return request of order #'+orderUpdate.order_id+' has been accepted successfully';
                    NotificationServices.sendNotification(notificationTitle, notificationText,user_id, 3, '', '', order_id, [2, 3],'',3);
                  }
                })

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, orderUpdate);

              }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, resMsg);
              });
            } else {
              let errMsg = Messages.ORDER_ALREADY_CANCELED;
              Response.send(req, res, 400, errMsg);
            }
          }else{
            await OrderServices.updateRecord(
              { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } },
              { 'products.$.status': status, return_date: new Date() }
            ).then(async (orderUpdate) => {
              var notificationTitle = 'Athwas';
              var notificationText = 'Your return request of order #'+orderUpdate.order_id+' has been rejected by athwas';
              NotificationServices.sendNotification(notificationTitle, notificationText,user_id, 3, '', '', order_id, [2, 3],'',3);
              let resMsg = "Success";
              Response.send(req, res, 200, resMsg, orderUpdate);
            }).catch(err => {
              let resMsg = Validation.getErrorMessage(err);
              Response.send(req, res, 200, resMsg);
          });
          }
      }).catch(err => {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 200, resMsg);
    });

        } else {
          throw Messages.ORDERS_NOT_FOUND;
        }
      }).catch(err => {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 200, resMsg);
      });
    } catch (err) {
      var errorMess = Validation.getErrorMessage(err);
      Response.send(req, res, 500, errorMess);
    }

  },

  returnGroceryOrderByAdmin: async (req, res) => {

    try {
      var user_id = req.params.user_id || null;
      var order_id = req.params.order_id || null;
      var business_category_id = req.params.business_category_id || null;
      var status = req.params.status || null;
      console.log()
      let bussinessCatData = await BusinessCategoryServices.oneRecord({ _id: business_category_id });

      let aggregateCondition = [
        { $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { business_category_id: ObjectID(business_category_id) } } } },
        {
          $project:{
              "_id": "$_id",
              "tracking_status": "$tracking_status",
              "order_status": "$order_status",
              "current_tracking_status": "$current_tracking_status",
              "offers": "$offers",
              "payment_mode": "$payment_mode",
              "user_id": "$user_id",
              "order_id": "$order_id",
              "total_amount": "$total_amount",
              "discount": "$discount",
              "net_amount": "$net_amount",
              "vat_amount": "$vat_amount",
              "delivery_fee": "$delivery_fee",
              "expected_start_date": "$expected_start_date",
              "expected_end_date": "$expected_end_date",
              "delivery_address": "$delivery_address",
              "promo_code": "$promo_code",
              "warehouse_id": "$warehouse_id",
              "promo_code_id": "$promo_code_id",
              "createdAt": "$createdAt",
              products : { $filter: {
                  input: "$products",
                  as: "num",
                  cond: { $eq: ["$$num.business_category_id", ObjectID(business_category_id)] }
              }
          }
          }
        }
      ];
      OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {
        console.log(orderDetail);
        if (orderDetail && orderDetail.length > 0) {
          let orderData = orderDetail[0];
          let firstorderdata = orderData.products[0];
          // if (orderData.order_status != 0) {
          //   throw 'Order status is changed. You can not cancel the order.';
          // }
          // if (firstorderdata.status != 0) {
          //   throw 'Order status is changed. You can not cancel the order.';
          // }

          // let createTime = orderData.createdAt;
          // let OrderCancelTime = new Date(createTime.getTime() + bussinessCatData.cancelation_time * 60000);

          // let valid = createTime < new Date() && OrderCancelTime > new Date()
          // if (!valid) {
          //   throw 'Sorry!!. You exceed the order cancelation time.';
          // }

          let total_amount = orderData.total_amount;
          var newwalletamount = 0;
          var getresult = await Promise.all(orderData.products.map(async (val) => {
            //total_amount = total_amount+val.amount;    
            await OrderServices.oneRecord(
              [
                  { $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(val._id) } } } },
                  {
                      $project: {

                          product: {
                              $filter: {
                                  input: "$products",
                                  as: "num",
                                  cond: { $eq: ["$$num._id", ObjectID(val._id)] }
                              }
                          }
                      }
                  }
              ]
          ).then(async (orderUpdate) => {
              
            if(status==2){
              if (orderUpdate[0].product[0].status == 1 ) {
                  var returnamount = (orderUpdate[0].product[0].is_discount == 1) ? orderUpdate[0].product[0].offer_price : orderUpdate[0].product[0].price;
                  newwalletamount = newwalletamount + parseFloat(returnamount * orderUpdate[0].product[0].quantity);
                    await OrderServices.updateRecord(
                      { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(val._id) } } },
                      { 'products.$.status': status, return_date: new Date() }
                    ).then(async (orderUpdate) => {
                      let productExist = await ProductInventoryServices.oneRecord([{ $match: { _id: ObjectID(val.inventory_id), warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(orderData.warehouse_id) } } } }]);
                      if (productExist) {
                        await ProductInventoryServices.updateRecord({
                          _id: ObjectID(val.inventory_id),
                          warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(orderData.warehouse_id) } }
                        }, { $inc: { 'warehouseinventry.$.quantity': (val.quantity) } });
                      } else {
                        var createProductInventry = {
                          warehouse_id: orderData.warehouse_id,
                          quantity: val.quantity,
                        }
                        await ProductInventoryServices.updateRecord({ _id: ObjectID(val.inventory_id), is_deleted: 0 }, { $push: { warehouseinventry: createProductInventry } });
                      }
                    }).catch(err => {
                      let resMsg = Validation.getErrorMessage(err);
                      Response.send(req, res, 200, resMsg);
                    });
                  } else {
                    let errMsg = Messages.ORDER_ALREADY_RETURNED;
                    Response.send(req, res, 400, errMsg);
                }
              }else{
                await OrderServices.updateRecord(
                  { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(val._id) } } },
                  { 'products.$.status': status }
                ).then(async (orderUpdate) => {
                      var notificationTitle = 'Athwas';
                      var notificationText = 'Your return request of order #'+orderUpdate.order_id+' has been rejected by athwas';
                      NotificationServices.sendNotification(notificationTitle, notificationText,user_id, 3, '', '', order_id, [2, 3],'',3);
                      let resMsg = "Success";
                      Response.send(req, res, 200, resMsg, orderData);
                }).catch(err => {
                  let resMsg = Validation.getErrorMessage(err);
                  Response.send(req, res, 200, resMsg);
              });
              }
            }).catch(err => {
              let resMsg = Validation.getErrorMessage(err);
              Response.send(req, res, 200, resMsg);
          });

          }));

          await UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { wallet: (parseFloat(newwalletamount)) } }).then(async updatedWallet => {
            console.log('updatedWallet',updatedWallet);
            if (updatedWallet) {
              var addPattern = {};
              var transition_id = Common.generateRandomNumber(8);
              addPattern.user_id = user_id;
              addPattern.transition_id = transition_id;
              addPattern.reason = 'order return';
              addPattern.sender_id = config.adminid;
              addPattern.user_type = 3;
              addPattern.sender_type = 1;
              addPattern.amount = parseFloat(newwalletamount);
              addPattern.wallet_amount = updatedWallet.wallet;
              addPattern.amount_type = 1;
              addPattern.request_type = 5;
              addPattern.order_id = order_id;
              await TransactionHistoryServices.createRecord(addPattern);
            }
          })

          var notificationTitle = 'Athwas';
          var notificationText = 'Your return request of order #'+orderData.order_id+' has been accepted successfully';
          NotificationServices.sendNotification(notificationTitle, notificationText,user_id, 3, '', '', order_id, [2, 3],'',3);

          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, orderData);

        } else {
          throw Messages.ORDERS_NOT_FOUND;
        }
      }).catch(err => {
        let resMsg = Validation.getErrorMessage(err);
        Response.send(req, res, 200, resMsg);
      });
    } catch (err) {
      var errorMess = Validation.getErrorMessage(err);
      Response.send(req, res, 500, errorMess);
    }

  },

  downloadOrderPdf: async(req,res)=>{
    var filePath = config.rootPath + "/src/views/email_templates/order_detail1_new_design.ejs";
    let customData= req.body
    customData=JSON.parse(customData.reqData)
    customData["moment"]=moment
    customData["logo"]= config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default/black-logo.png";
    customData["newstatus1"]  = ["","Assigned","Completed","Rejected","Cancelled","Cancelled/Rejected"];
    customData["amountInWord"] = await Common.inWords(Math.round(customData.net_amount));
    let normal_setting = await ContentServices.getRequest("customer/normal_settings");
    customData["pan_number"] = normal_setting.pan_number;
    customData["gst_number"] = normal_setting.gst_number;
    customData["office_address"] = normal_setting.office_address;

    let path="invoice_"+customData.order_id+".pdf"
    await Media.deleteFile('public/generated-pdf/'+path);
      ejs.renderFile(filePath, customData, (err, data) => {
        if (err) {
          throw err;
        } else {
          var subject = "Verify Email";
          pdf.create(data, {}).toFile(`public/generated-pdf/${path}`, (err,resp) => {
            if(err) {
                return console.log('error');
            }
            let sendData={path:config.siteUrl+"/generated-pdf/"+path}
            Response.send(req, res, 200, "Success",sendData);
          });
        }
      });
  },
  getOrderPdf: async(req,res)=>{
    console.log(`${ config.rootPath}/rezultati.pdf`)
    res.set("content-type","application/pdf")
    res.sendFile(`${ config.rootPath}/rezultati.pdf`);
  }
};

module.exports = OrderController;
