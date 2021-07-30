'use strict';


const _ = require('lodash');
const { OrderServices, ProductInventoryServices } = require('../../services');
const { Response, Messages, Validation } = require('../../helpers');
const { ObjectID } = require('mongodb');


const ReportController = {

    getOrders: async (req, res) => {
        try {

            var keyword = req.query.keyword || "";
            var status = req.query.order_status || "";
            var page = parseInt(req.body.page_no) || 1;
            var limit = parseInt(req.body.limit) || 10000;
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

                    { createdAt: { "$lte": endDate } },

                    { order_status: { "$gte" : 0}}
                ]
            }

          //  findPattern.order_status= 2;
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
                            { $project: { name: 1,category_id:1,sub_category_id:1,brand_id:1 } },
                        ],
                        as: "products.product_id",
                    },
                },
                { $unwind: "$products.product_id" },
                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$products.product_id.category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'products.product_id.category_id'
                    }
                },
                { $unwind: "$products.product_id.category_id" },
                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$products.product_id.sub_category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'products.product_id.sub_category_id'
                    }
                },
                { $unwind: "$products.product_id.sub_category_id" },
                {
                    $lookup: {
                        from: 'brands',
                        let: { "id": "$products.product_id.brand_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'products.product_id.brand_id'
                    }
                },
                { $unwind: "$products.product_id.brand_id" },
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
                            { $project: { inventory_name: 1, hsn_code:1,inventory_product_code:1 } },
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
                            { $project: { username: 1, phone: 1,register_id:1 } },
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
                //{ $unwind: '$driverData' },
                {
                    $lookup: {
                        from: "warehouses",
                        let: { id: "$warehouse_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { name: 1, address: 1, warehouse_code:1 } },
                        ],
                        as: "warehouseData",
                    },
                },
                { $unwind: '$warehouseData' },
                {
                    $group: {
                        _id: "$_id",
                        order_id: { $first: "$order_id" },
                        delivery_fee: { $first: "$delivery_fee" },
                        delivery_date:{$first:"$tracking_status.Delivered"},
                        invoice_no: { $first: "$invoice_no" },
                        payment_mode: { $first: "$payment_mode" },
                        order_status: { $first: "$order_status" },
                        user_id: { $first: "$userData.register_id" },
                        user_name: { $first: "$userData.username" },
                        phone: { $first: "$userData.phone" },
                        net_amount: { $first: "$net_amount" },
                        discounted_amount: { $first: "$discount" },
                        driver_id: { $first: "$driverData" },
                        businessCategoryData: { $first: "$businessCategoryData" },
                        warehouse_id: { $first: "$warehouseData" },
                        createdAt: { $first: "$createdAt" },
                        products: { $push: "$products" },
                        promo_code: { $push: "$promo_code" },
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


    getProducts: async (req, res) => {

        try {

            var product_inv_id = req.body.product_inv_id;
            var limit = req.body.limit || 10;
            var page = req.body.page_no || 1;

            var findPattern = {_id: ObjectID(product_inv_id)};
            
            var sortPattern = { 'createdAt': 1 };

            let aggregateCondition = [
                { $match: findPattern },
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
                            { $project: { "name": 1 } }
                        ],
                        as: 'businessCategoryData'
                    }
                },
                { $unwind: "$businessCategoryData" },
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
                    $project: {
                        _id: "$_id",
                        main_product_id: '$Products._id',
                        inventory_product_code: '$inventory_product_code',
                        name: "$Products.name",
                        inventory_name: '$inventory_name',
                        available_quantity: '$product_quantity',
                        business_category: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        price: "$price",
                        description: '$Products.description',
                        discount_type: "$discount_type",
                        discount_value: "$discount_value",
                        is_discount: "$is_discount",
                        offer_price: "$discounted_product_price",
                        rating: "$totalrating",
                        newprice: "$newprice",
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

}
module.exports = ReportController;