"use strict";

const _ = require("lodash");
const {OrderServices, ProductInventoryServices,CartServices} = require("../../services");
const {
  Response,
  Messages,
  Validation,
  Media,
  Common,
} = require("../../helpers");
const config = require("../../config");
const { isValidObjectId } = require("mongoose");
const UPLOAD_FOLDER_URL =
  config.apiGatewayUrl +
  "/service/assets?service=user_service&filepath=uploads/order";
const DEFAULT_FOLDER_URL =
  config.apiGatewayUrl +
  "/service/assets?service=user_service&filepath=default";
const { ObjectID } = require("mongodb");
const { find } = require("lodash");
const ProductServices = require("../../services/ProductServices");
const UserServices = require("../../services/UserServices");

const OrderController = {
  /**
       * @api {get} /user_service/admin/order/get_order  Order - Listing
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
      "status": "success",
      "api_name": "/order/get_order",
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
      "api_name": "/order/get_order",
      "message": "Error",
      "data": {}
      }
      */

  getAvailableDrivers: (req, res) => {
    try {
      var keyword = req.body.keyword || "";
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;
      var latitude = req.body.latitude || 26.8489174;
      var longitude = req.body.longitude || 75.808783;
      var range = req.body.range || 2;

      var findPattern = {
        is_deleted: 0,
        user_role: 4,
        is_active: 1,
        // online_status: 1,
        // is_busy:0
      };

      var nearPattern = null;
      if (latitude!="" && longitude!="") {
        nearPattern = {
            near: { type: "Point", coordinates: [longitude, latitude] },
            spherical: true,
            distanceField: "distance",
            distanceMultiplier: 0.000621371,     // 0.000621371 (for miles), 0.001 (for km)
        };
        if (range && range > 0) {
            nearPattern.maxDistance = range * 1609.34;
        }
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

  //getorders

  getOrders: async (req, res) => {
    try {
      var keyword = req.query.keyword || "";
      var status = req.query.status;
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;

      var findPattern = {
        is_deleted: 0,
      };

      if (status && status != "") {
        findPattern.is_active = parseInt(status);
      }

      var sortPattern = { createdAt: -1 };
      let aggregateCondition = [
        //  { $match: findPattern },
        {
          $lookup: {
            from: "users",
            let: { id: "$user_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { username: 1, phone: 1 } },
            ],
            as: "UserData",
          },
        },
        { $unwind: "$UserData" },
        {
          $lookup: {
            from: "products",
            let: { id: "$product_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { name: 1 } },
            ],
            as: "ProductData",
          },
        },
        // { $unwind: "$ProductData" },

        {
          $project: {
            _id: "$_id",
            order_number: "1",

            net_amount: "100",
            discounted_amount: "20",
            payment_mode: "$payment_mode",
            user_name: "$UserData.username",
            phone: "$UserData.phone",
            product_name: "$ProductData.name",
            delivery_address: "$delivery_address",
            orderitem: "$ProductData",
            orderNumber: 1,
            // offer_type: 1,
            // business_category: "$businessCategoryData",
            // category: "$CategoryData",
            // subcategory: "$SubCategoryData",
            // product: "$productInventoriesData",
            // is_active: "$is_active",
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
};

module.exports = OrderController;
