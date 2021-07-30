'use strict';


const _ = require('lodash');
const { OrderServices } = require('../../services');
const { Response, Messages, Validation } = require('../../helpers');
const { ObjectID } = require('mongodb');


const ReportController = {

    getOrders: async (req, res) => {
        try {

            var keyword = req.query.keyword || "";
            var status = req.query.order_status || "";
            var page = parseInt(req.body.page_no) || 1;
            var limit = parseInt(req.body.limit) || 10;
            var date_start = req.body.startDate || "";
            var date_end = req.body.endDate || "";

            var findPattern = {};

            if (date_start != '' && date_end != '') {

                var startDate = new Date(date_start + " 00:00:01");

                startDate.setDate(startDate.getDate());

                var endDate = new Date(date_end + " 23:59:59");

                endDate.setDate(endDate.getDate());

                findPattern["$and"] = [

                    { createdAt: { "$gte": startDate } },

                    { createdAt: { "$lte": endDate } }

                ]

            }

            //findPattern = { order_status: { $in: [2, 3] } }

            var sortPattern = { createdAt: -1 };
            
            let aggregateCondition = [
                { $match: findPattern },
                { $unwind: "$products" },
                {
                    $lookup: {
                        from: "products",
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
                        from: "business_categories",
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
                        from: "product_inventories",
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
                  {$unwind:'$driverData'},
                {
                    $lookup: {
                        from: "warehouses",
                        let: { id: "$warehouse_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { name: 1, address: 1 } },
                        ],
                        as: "warehouseData",
                    },
                },
                  {$unwind:'$warehouseData'},
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
                        driver_id: { $first: "$driverData" },
                        warehouse_id: { $first: "$warehouseData" },
                        createdAt: { $first: "$createdAt" },
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

}
module.exports = ReportController;