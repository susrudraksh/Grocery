'use strict';

var ObjectID = require('mongoose').Types.ObjectId;
const { CartServices, OrderServices, UserServices, ProductInventoryServices, TransactionHistoryServices, ProductServices, BusinessCategoryServices, WarehouseServices, ContentServices, RedeemPointServices, NotificationServices } = require('../../services');
const { Common, Response, Validation, Messages, DateTime, PushNotification, Pubnub,Media } = require('../../helpers');
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";
const { ProductInventry } = require('../../models');
const moment = require("moment");
const ejs = require("ejs");
const pdf= require("html-pdf")
const CcavenuPayment = require("./CcavenuPayment");



const OrderController = {

    /**
    * @api {get} /user_service/customer/order/user_orders  Users Current Order List
    * @apiGroup User - Order
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer token"
    }
    *
    * @apiParam {String} page_no Page No.
    * @apiParam {String} limit Limit.
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Orders found",
        "data": {
                "docs": [
                {
                    "order_status": 0,
                    "current_tracking_status": "Acknowledged",
                    "offers": [
                    
                    ],
                    "payment_mode": "Cash",
                    "_id": "605b0dddb9a39e36b1a34b80",
                    "user_id": "6052f3833a20d57e9738223b",
                    "order_id": 32214176,
                    "total_amount": 1025.2,
                    "discount": 50,
                    "net_amount": 990.2,
                    "vat_amount": 0,
                    "delivery_fee": 15,
                    "expected_start_date": "2021-03-25T09:00:00.000Z",
                    "expected_end_date": "2021-03-25T09:00:00.000Z",
                    "delivery_address": "605b02eab9a39e36b1a34b1d",
                    "promo_code": "HOLI",
                    "warehouse_id": "601548f8f64aa74abe3d29ed",
                    "promo_code_id": "605b053bb9a39e36b1a34b25",
                    "createdAt": "2021-03-24T10:01:01.552Z",
                    "id": "605b0dddb9a39e36b1a34b80"
                }
                ],
            "totalDocs": 1,
            "limit": 20,
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
    "message": "Error",
    "data": {}
    }
    */

    userOrders: async (req, res) => {
        try {
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            var sortPattern = { createdAt: -1 };
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var findPattern = { user_id: ObjectID(user_id), order_status: { $in: [0, 1] } }
            await OrderServices.userOrders(findPattern, sortPattern, page, limit).then(orderRecords => {
                var succMessage = Messages.ORDERS_FOUND;
                Response.send(req, res, 200, succMessage, orderRecords);
            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
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
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Orders found",
    "data": {
    "_id": "605b0dddb9a39e36b1a34b80",
    "category": [
        {
        "_id": "60154050f64aa74abe3d2928",
        "name": "Kitchen and Home",
        "cancelation_time": 11,
        "all_return": 0,
        "return_time": 12,
        "category_image": "1615284921850appliances.jpeg",
        "products": [
            {
            "_id": "605b0dddb9a39e36b1a34b81",
            "images": [
                {
                "_id": "601545a2f64aa74abe3d2988",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/1612006818894280Weggcooker8.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/thumb_1612006818894280Weggcooker8.jpg"
                },
                {
                "_id": "601545a2f64aa74abe3d2989",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/1612006818941280WEggCooker.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/thumb_1612006818941280WEggCooker.jpg"
                },
                {
                "_id": "601545a2f64aa74abe3d298a",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/1612006818961BXEG2801IN280WEggCooker.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/thumb_1612006818961BXEG2801IN280WEggCooker.jpg"
                },
                {
                "_id": "601545a2f64aa74abe3d298c",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/1612006818980BXEG2801IN280WEggCooker1.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/thumb_1612006818980BXEG2801IN280WEggCooker1.jpg"
                },
                {
                "_id": "601545a2f64aa74abe3d298d",
                "product_image_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/1612006818995BXEG2801IN280WEggCooker2.jpg",
                "product_image_thumb_url": "http://3.7.83.168:3060/service/assets?service=user_service&filepath=uploads/product/601545a2f64aa74abe3d2986/thumb_1612006818995BXEG2801IN280WEggCooker2.jpg"
                }
            ],
            "is_active": 1,
            "is_deleted": 0,
            "name": "Egg Cooker",
            "business_category_id": "60154050f64aa74abe3d2928",
            "brand_id": "6015448df64aa74abe3d2971",
            "category_id": "601541abf64aa74abe3d2940",
            "sub_category_id": "60154448f64aa74abe3d296c",
            "description": "2 poaching pans\nDry boil protection\n80 ml filling cup with egg pricked feature\nTransparent cover\nPower: 280 watts, operating voltage: 220 - 240 volts\nIncludes: Egg cooker, instruction manual, plastic egg tray, plastic cup, egg pricker and 2 poachers\nWarranty: 2 year warranty provided by the manufacturer from date of purchase\nPower: 280 watts; Operating Voltage: 220 - 240 volts\nIncludes: Egg Cooker, Instruction Manual, Plastic Egg Tray, Plastic Cup, Egg Pricker and 2 Poachers",
            "createdAt": "2021-01-30T11:40:18.854Z",
            "updatedAt": "2021-01-30T11:40:19.005Z",
            "__v": 0,
            "quantity": 1,
            "price": 1165,
            "offer_price": 1025.2,
            "is_discount": 1,
            "inventory_id": "601545a2f64aa74abe3d2987",
            "order_status": 0
            }
        ]
        }
    ],
    "current_tracking_status": "Acknowledged",
    "order_id": 32214176,
    "userData": {
        "_id": "6052f3833a20d57e9738223b",
        "username": "Umesh Kumar",
        "phone": "9782336044",
        "register_id": "rfpAxavz"
    },
    "warehouseData": [
        {
        "_id": "601548f8f64aa74abe3d29ed",
        "name": "Hyderpora",
        "address": "Bypass Road "
        }
    ],
    "driver": [],
    "promo_code_id": [
        {
        "_id": "605b053bb9a39e36b1a34b25",
        "product_id": [],
        "is_active": 1,
        "is_deleted": 0,
        "offer_type": "1",
        "coupon_code": "HOLI",
        "title": "HOLI HAI",
        "description": "Rang bhara offer",
        "business_category_id": null,
        "category_id": null,
        "sub_category_id": null,
        "card_type": "",
        "bank_type": "",
        "startDate": "2021-03-23",
        "endDate": "2021-03-31",
        "offer_amount_type": 1,
        "offer_price": 50,
        "offer_amount": 1000,
        "offer_product": null,
        "offer_quantity": null,
        "createdAt": "2021-03-24T09:24:11.866Z",
        "updatedAt": "2021-03-24T09:33:44.350Z",
        "__v": 0
        }
    ],
    "promo_code": "HOLI",
    "order_status": 0,
    "tracking_status": {
        "Acknowledged": {
        "status": 1,
        "status_title": "Acknowledged",
        "time": "2021-03-24T10:01:01.548Z"
        },
        "Packed": {
        "status": 0,
        "status_title": "Packed"
        },
        "In_Transit": {
        "status": 0,
        "status_title": "In_Transit"
        },
        "Delivered": {
        "status": 0,
        "status_title": "Delivered"
        }
    },
    "offers": [],
    "payment_mode": "Cash",
    "total_amount": 1025.2,
    "discount": 50,
    "net_amount": 990.2,
    "vat_amount": 0,
    "delivery_fee": 15,
    "expected_start_date": "2021-03-25T09:00:00.000Z",
    "expected_end_date": "2021-03-25T09:00:00.000Z",
    "delivered_date": null,
    "delivery_address": {
        "_id": "605b02eab9a39e36b1a34b1d",
        "full_address": "6-76, Block-B, Someshwarpuri, Malviya Nagar, Jaipur, Rajasthan 302015, India",
        "address_type": "Work",
        "address_location": {
        "type": "Point",
        "coordinates": [
            75.81465365365148,
            26.855192881034085
        ],
        "_id": "605b02eab9a39e36b1a34b1e"
        }
    },
    "order_date": "2021-03-24T10:01:01.552Z",
    "order_cancel_time": "2021-03-24T10:12:01.552Z",
    "order_return_time": "2021-03-24T10:13:01.552Z"
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

    customerOrderDetails: async (req, res) => {
        try {

            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            let orderDetail = await OrderServices.orderDetail({ _id: ObjectID(req.params.id) })

            if (orderDetail && orderDetail.length > 0) {

                var succMessage = Messages.ORDERS_FOUND;
                Response.send(req, res, 200, succMessage, orderDetail[0])

            } else {

                throw Messages.ORDERS_NOT_FOUND;

            }


        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * @api {post} user_service/customer/order/calculate_delivery_fees Delivery Fees calculate
     * @apiGroup User - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data",
        }
     *
     * @apiParam {String} delivery_address_id delivery_address_id
     * @apiParam {String} order_amount order amount
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
        "message": "Success",
            "data": {
                "warehouse": "601548f8f64aa74abe3d29ed",
                "wallet": 0,
                "vat_amount": 0
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "/customer_register",
            "message": "Provided email is already exist. Provided phone is already exist. ",
            "data": {}
        }
    */

    calculateDeliveryFees: async (req, res) => {
        try {

            let delivery_address_id = req.body.delivery_address_id || "";
            let order_amount = req.body.order_amount || "";
            
            var errors = [];

            if (delivery_address_id == "") {
                //  console.log("delivery_address_id",delivery_address_id);
                errors.push({ errField: "delivery_address_id", errText: Messages.DELIVERY_ADDRESS_NOT_FOUND });
            }

            if (order_amount == "") {
                errors.push({ errField: "order_amount", errText: "Order Amount is required" });
            }
            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {
                var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

                //let cartData = await CartServices.findCartItemsWarehouse({ user_id: user_id });
                let cartData = await CartServices.findCartItems({ user_id: user_id }, { product_id: 1, business_category_id: 1, inventory_id: 1, quantity: 1, _id: 0 })
                if (!cartData || cartData.length == 0) {
                    throw Messages.CART_IS_EMPTY;
                    return
                }


                // let userObject = await UserServices.getUserDetailById({_id:user_id});
                // console.log(delivery_address_id);

                let condition = [{ $match: { _id: ObjectID(user_id), delivery_address: { $elemMatch: { _id: ObjectID(delivery_address_id) } } } }, {
                    $project: {
                        wallet: 1,
                        earned_point:1,
                        delivery_address: {
                            $filter: {
                                input: "$delivery_address",
                                as: "num",
                                cond: { $eq: ["$$num._id", ObjectID(delivery_address_id)] }
                            }
                        }
                    }
                }, { $project: { wallet: 1,earned_point:1, delivery_address: 1, _id: 0 } }, { $unwind: "$delivery_address" }];
                let userObject = await UserServices.oneRecord(condition);
                console.log(userObject);
                let redeem_point = (userObject && userObject.earned_point)?userObject.earned_point:0;
               // console.log("redeem_point",redeem_point);
                let deliveryLocation = userObject.delivery_address;

                let warehouse = await WarehouseServices.findNearest(deliveryLocation.geoLocation.coordinates);

                if (!warehouse) {
                    var errMessage = "We don't deliver in the selected area. Please choose another address.";
                    Response.send(req, res, 400, errMessage);
                    return;
                }

                await getNearestWarehouse(cartData, warehouse, []).then(async updateRecord => {
                    //console.log("updateRecord",updateRecord);
                    if (!updateRecord.exist) {

                        var errMessage = "We don't deliver in the selected area. Please choose another address.";
                        Response.send(req, res, 400, errMessage);
                    } else {

                        warehouse = updateRecord.warehouse;
                        //  console.log(warehouse.loc.coordinates[1], warehouse.loc.coordinates[0], deliveryLocation.geoLocation.coordinates[1], deliveryLocation.geoLocation.coordinates[0], 'K')
                        let distance = Common.distance(warehouse.loc.coordinates[1], warehouse.loc.coordinates[0], deliveryLocation.geoLocation.coordinates[1], deliveryLocation.geoLocation.coordinates[0], 'K')
                        console.log(distance);
                        let delivery_fee = await ContentServices.postRequest("customer/delivery_settings", { distance: parseFloat(distance) });
                        let normal_setting = await ContentServices.getRequest("customer/normal_settings");
                        if (delivery_fee) {
                            delivery_fee = delivery_fee.delivery_fees;
                            var vat_amount = (delivery_fee * normal_setting.vat) / 100;
                            var succMessage = 'Success';
                            Response.send(req, res, 200, succMessage, {redeem_point:redeem_point, delivery_fee: delivery_fee, warehouse: warehouse._id, wallet: userObject.wallet, vat: normal_setting.vat, vat_amount: vat_amount })
                        } else {
                            var errMessage = Messages.FORBIDDEN;
                            Response.send(req, res, 400, errMessage)
                        }
                    }

                }).catch(err => {
                    var errMessage = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, errMessage);
                });

                async function getNearestWarehouse(cartData, warehouseData, except) {
                    if (cartData) {
                        let result;
                        await cartData.reduce(async (promise, val, i) => {
                            await promise;
                            let isWarehouseExist = await ProductInventry.findOne({
                                _id: ObjectID(val.inventory_id._id),
                                warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(warehouseData._id),quantity:{ $gt: 0 } } }
                            });
                            console.log("isWarehouseExist",isWarehouseExist)
                            if (isWarehouseExist != null) {
                                result = ({ exist: true, warehouse: warehouseData });
                            }
                        }, Promise.resolve())
                        if (result) {
                            return result;
                        } else {
                            except.push(ObjectID(warehouseData._id));
                            let newWarehouse = await WarehouseServices.findNearestExcept(deliveryLocation.geoLocation.coordinates, except);
                            if (newWarehouse == null) {
                                return ({ exist: false });
                            } else {
                                return await getNearestWarehouse(cartData, newWarehouse, except);
                            }
                        }
                    }
                }
            }

        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }

    },



    /**
     * @api {post} /user_service/customer/order/checkout  Checkout Order
     * @apiGroup User - Order
     *
     * @apiHeaderExample {application/json} Header-Example
    {
    "Content-Type": "application/json"
    }
    *
    * @apiParam {String} payment_mode Mode of payment
    * @apiParam {String} promo_code Promo Code
    * @apiParam {String} promo_code_id Promo Code Id  
    * @apiParam {String} delivery_fee delivery_fee
    * @apiParam {String} discount_price discount price
    * @apiParam {String} warehouse_id warehouse Id
    * @apiParam {String} delivery_address Delivery address
    * @apiParam {String} vat_amount vat amount
    * @apiParam {Array}  offers Offers Array
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
   {
    "message": "Order complete successfully.",
        "data": {
            
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
    processOrder: async (req, res) => {
        try {
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var payment_mode = req.body.payment_mode || "";
            var promo_code = req.body.promo_code;
            var user_order_id = req.body.order_id;
            var promo_code_id = req.body.promo_code_id;
            var warehouse_id = req.body.warehouse_id || "";
            var customer_phone = req.body.customer_phone || "";
            var customer_name = req.body.customer_name || "";
            var discount_price = req.body.discount_price || 0;
            var redeem_points = req.body.redeem_points || 0;
            var delivery_fee = req.body.delivery_fee || 0;
            var delivery_address = req.body.delivery_address || "";
            var vat_amount = req.body.vat_amount || "";

            var errors = [];

            if (payment_mode && payment_mode == "") {
                errors.push({ errField: "payment_mode", errText: Messages.PAYMENT_MODE_NOT_FOUND });
            }
            if (warehouse_id && warehouse_id == "") {
                errors.push({ errField: "warehouse_id", errText: Messages.WAREHOUSE_NOT_FOUND });
            }
            if (delivery_address && delivery_address == "") {
                errors.push({ errField: "delivery_address", errText: Messages.DELIVERY_ADDRESS_NOT_FOUND });
            }
            if (delivery_fee && delivery_fee == "") {
                errors.push({ errField: "delivery_fee", errText: Messages.DELIVERY_CHARGE_NOT_FOUND });
            }
            if (vat_amount && vat_amount == "") {
                errors.push({ errField: "vat_amount", errText: Messages.VAT_NOT_FOUND });
            }
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                if(user_order_id && user_order_id!=""){
                    await CcavenuPayment.cancelPayment(user_order_id)
                }
                Response.send(req, res, 400, resMsg, { errors: errors });
            } else {

                let cartData = await CartServices.findCartItems({ user_id: user_id }, { product_id: 1, business_category_id: 1, inventory_id: 1, quantity: 1, _id: 0 })
                
                if (cartData && cartData.length > 0) {
                    let total_amount = 0;
                    let discount = discount_price;
                    let net_amount = 0
                    let counterof_inventory_notavailable = 0;
                    let counterof_cartitem = 0;
                    cartData = await cartData.map((item) => {
                        if (item.quantity > item.inventory_id.product_quantity) {
                            counterof_inventory_notavailable++;
                        }
                        counterof_cartitem = counterof_cartitem + item.quantity;
                        item.price = item.inventory_id.price
                        item.offer_price = item.inventory_id.discounted_product_price
                        item.is_discount = item.inventory_id.is_discount
                        item.tax_type = item.inventory_id.tax_type||1
                        item.tax_rate = item.inventory_id.tax_rate||0
                        item.cgst_rate = item.inventory_id.cgst_rate||0
                        item.igst_rate = item.inventory_id.igst_rate||0
                        item.sgst_rate = item.inventory_id.sgst_rate||0
                        
                        if (item.inventory_id.is_discount == 1) {

                            total_amount += item.inventory_id.discounted_product_price * item.quantity
                            net_amount += item.inventory_id.discounted_product_price * item.quantity
                        } else {
                            total_amount += item.inventory_id.price * item.quantity
                            net_amount += item.inventory_id.price * item.quantity
                        }
                        return item
                    })

                    net_amount = parseFloat(net_amount) + parseFloat(vat_amount) + parseFloat(delivery_fee) - parseFloat(discount);
                    net_amount = net_amount - redeem_points;
                    net_amount = net_amount.toFixed(2);

                    let normal_setting = await ContentServices.getRequest("customer/normal_settings");

                    var expected_start_date = "";
                    var expected_end_date = "";
                    if (net_amount > normal_setting.normal_order_amount) {
                        var toDay = moment();
                        toDay = DateTime.convertUtcToLocalByTimezone(toDay, 'Asia/Kolkata', 'H:M');
                        var newDate = DateTime.convertUtcToLocalByTimezone(moment(), 'Asia/Kolkata', 'yyyy-m-d');
                        if (normal_setting.premium_start_delivery_time <= toDay && normal_setting.premium_end_delivery_time >= toDay) {

                            expected_start_date = new Date(newDate + " " + normal_setting.premium_start_delivery_time + ":00");
                            expected_end_date = new Date(newDate + " " + normal_setting.premium_end_delivery_time + ":00");

                        } else {
                            expected_start_date = new Date(newDate + " " + normal_setting.premium_start_delivery_time + ":00");
                            expected_end_date = new Date(newDate + " " + normal_setting.premium_end_delivery_time + ":00");
                            expected_start_date = new Date(expected_start_date.setDate(expected_start_date.getDate() + 1));
                            expected_end_date = new Date(expected_end_date.setDate(expected_end_date.getDate() + 1));
                        }
                    } else {
                        var toDay = moment();
                        toDay = DateTime.convertUtcToLocalByTimezone(toDay, 'Asia/Kolkata', 'H:M');
                        var newDate = DateTime.convertUtcToLocalByTimezone(moment(), 'Asia/Kolkata', 'yyyy-m-d');
                        if (normal_setting.normal_start_delivery_time <= toDay && normal_setting.normal_end_delivery_time >= toDay) {
                            expected_start_date = new Date(newDate + " " + normal_setting.normal_start_delivery_time + ":00");
                            expected_end_date = new Date(newDate + " " + normal_setting.normal_end_delivery_time + ":00");
                        } else {
                            expected_start_date = new Date(newDate + " " + normal_setting.normal_start_delivery_time + ":00");
                            expected_end_date = new Date(newDate + " " + normal_setting.normal_end_delivery_time + ":00");
                            expected_start_date = new Date(expected_start_date.setDate(expected_start_date.getDate() + 1));
                            expected_end_date = new Date(expected_end_date.setDate(expected_end_date.getDate() + 1));
                        }
                    }

                    if (counterof_inventory_notavailable > 0) {
                        var errMessage = Messages.PRODUCT_NOT_AVAILABLE;
                        if(user_order_id && user_order_id!=""){
                            await CcavenuPayment.cancelPayment(user_order_id)
                        }
                        Response.send(req, res, 400, errMessage);
                        return;
                    }

                    let userInfo = await UserServices.getUserDetailById({ _id: user_id });

                    let deliveryObject = userInfo.delivery_address.find((item) => item && item._id.toString() == req.body.delivery_address);

                    if (!deliveryObject) {
                        var errMessage = Messages.DELIVERY_ADDRESS_NOT_FOUND;
                        if(user_order_id && user_order_id!=""){
                            await CcavenuPayment.cancelPayment(user_order_id)
                        }
                        Response.send(req, res, 400, errMessage);
                    }

                    let warehouse = await WarehouseServices.findNearest(deliveryObject.geoLocation.coordinates);
                    await getNearestWarehouse(cartData, warehouse, []).then(async updateRecord => {
                        if (!updateRecord.exist) {
                            var errMessage = Messages.WAREHOUSE_NOT_FOUND_NEAR_YOU;
                            if(user_order_id && user_order_id!=""){
                                await CcavenuPayment.cancelPayment(user_order_id)
                            }
                            Response.send(req, res, 400, errMessage);
                        } else {
                            warehouse = updateRecord.warehouse;

                            if (!warehouse) {
                                var errMessage = Messages.WAREHOUSE_NOT_FOUND;
                                if(user_order_id && user_order_id!=""){
                                    await CcavenuPayment.cancelPayment(user_order_id)
                                }
                                Response.send(req, res, 400, errMessage);
                            } else if (warehouse && warehouse._id != warehouse_id) {
                                var errMessage = Messages.DELIVERY_FEES_CHANGE;
                                if(user_order_id && user_order_id!=""){
                                    await CcavenuPayment.cancelPayment(user_order_id)
                                }
                                Response.send(req, res, 400, errMessage);
                            } else {
                                var orderplace = true;
                                var errMessage = "";
                                if (payment_mode == 'Wallet') {
                                    if (userInfo.wallet < net_amount) {
                                        var errMessage = Messages.INSUFFICIENT_WALLET_BALANCE;
                                        orderplace = false;
                                    }
                                }
                                if(redeem_points>0){
                                    if (userInfo.redeem_points < redeem_points) {
                                        var errMessage = Messages.INSUFFICIENT_REDEEM_POINT;
                                        orderplace = false;
                                    }
                                }
                                if (orderplace) {
                                    var order_id ="";
                                    if(user_order_id && user_order_id!=""){
                                        order_id= user_order_id;
                                    }else{
                                        order_id = Math.floor(10000000 + Math.random() * 90000000);
                                    }
                                   
                                    var updaterecord = {
                                        user_id: user_id,
                                        order_id: order_id,
                                        total_amount: total_amount,
                                        discount: discount,
                                        customer_name:customer_name,
                                        customer_phone:customer_phone,
                                        net_amount: net_amount,
                                        vat_amount: vat_amount,
                                        redeem_points:redeem_points,
                                        products: cartData,
                                        delivery_fee: delivery_fee,
                                        expected_start_date: DateTime.convertLocalToUtcByTimezone(expected_start_date, "UTC"),
                                        expected_end_date: DateTime.convertLocalToUtcByTimezone(expected_end_date, "UTC"),
                                        delivery_address: req.body.delivery_address,
                                        promo_code: req.body.promo_code,
                                        payment_mode: req.body.payment_mode,

                                        warehouse_id: warehouse._id,
                                       
                                    }
                                    if (promo_code_id != "") {
                                        updaterecord.promo_code_id = req.body.promo_code_id;
                                    }

                                    // res.send(updaterecord);
                                    // return;
                                    var orderResult = {};
                                    if(user_order_id && user_order_id!=""){
                                      //  console.log("user")
                                         orderResult = await OrderServices.updateprocessOrder(updaterecord,{order_id:user_order_id}, user_id);
                                    }else{
                                        updaterecord.tracking_status= {
                                            Acknowledged: {
                                                status: 1,
                                                status_title: "Acknowledged",
                                                time: new Date().toISOString()
                                            }
                                        }
                                       // console.log("order")
                                         orderResult = await OrderServices.processOrder(updaterecord, user_id);
                                    }
                                   
                                    if (orderResult) {
                                     
                                        //----------notification to admin ------------//
                                        if (counterof_cartitem > updateRecord.itemcount) {
                                            var notificationTitle = "Athwas insufficient inventory";
                                            var notificationText = "The order #" + orderResult.order_id + " does not have complete product quantity";

                                            NotificationServices.sendNotification(notificationTitle, notificationText, config.adminid, 1, '', '', orderResult.order_id, [1, 3])
                                            // var createNotification = {
                                            //     user_id: "5f18295dd364c8608604b992",
                                            //     title: notificationTitle,
                                            //     message: message,
                                            //     user_type: 1,
                                            //     order_id: orderResult.order_id,
                                            //     notification_type: 1,
                                            // }
                                            // await NotificationServices.createRecord(createNotification).then(async result => {
                                            //     let resMsg = "Success";
                                            //     //Response.send(req, res, 200, resMsg);
                                            // }).catch(err => {
                                            //     let resMsg = Validation.getErrorMessage(err);
                                            //     Response.send(req, res, 500, resMsg);
                                            // })
                                            // Pubnub.publishSampleMessage(notificationTitle,notificationText)
                                        }

                                        cartData.forEach(async val => {
                                            let productExist = await ProductInventoryServices.oneRecord([{ $match: { _id: ObjectID(val.inventory_id._id), warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(warehouse._id) } } } }]);
                                            if (productExist) {
                                                await ProductInventoryServices.updateRecord({
                                                    _id: ObjectID(val.inventory_id._id),
                                                    warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(warehouse._id) } }
                                                }, { $inc: { 'warehouseinventry.$.quantity': -(val.quantity) } });
                                            } else {
                                                var createProductInventry = {
                                                    warehouse_id: warehouse._id,
                                                    quantity: -val.quantity,
                                                }
                                                await ProductInventoryServices.updateRecord({ _id: ObjectID(val.inventory_id._id), is_deleted: 0 }, { $push: { warehouseinventry: createProductInventry } });
                                            }
                                           
                                        });
                                        if(redeem_points && redeem_points>0){
                                             UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { earned_point: -(parseFloat(redeem_points)) } });
                                        }
                                        if (req.body.payment_mode == 'Wallet') {
                                            await UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { wallet: -(parseFloat(net_amount)) } }, 'id wallet username').then(async updatedWallet => {
                                                if (updatedWallet) {
                                                    var addPattern = {};
                                                    var transition_id = Common.generateRandomNumber(8);
                                                    addPattern.user_id = user_id;
                                                    addPattern.user_type = 3;
                                                    addPattern.transition_id = transition_id;
                                                    addPattern.reason = 'order placed';
                                                    addPattern.sender_id = "5f18295dd364c8608604b992";
                                                    addPattern.sender_type = 1;
                                                    addPattern.amount = net_amount;
                                                    addPattern.wallet_amount = updatedWallet.wallet;
                                                    addPattern.payment_type = req.body.payment_mode;
                                                    addPattern.amount_type = 2;
                                                    addPattern.request_type = 2;
                                                    addPattern.order_id = orderResult._id;
                                                    await TransactionHistoryServices.createRecord(addPattern);
                                                }
                                            });
                                        }
                                    }

                                    // if(userInfo.device_token!=""){
                                    //     var message = {
                                    //         to: userInfo.device_token,
                                    //         collapse_key: '',
                                    //         data: {
                                    //             your_custom_data_key: 'your_custom_data_value'
                                    //         },
                                    //         notification: {
                                    //             title: 'Athwas',
                                    //             body: 'Order Place Successfully'
                                    //         }
                                    //     };
                                    //     PushNotification.sendForAndriodIos(message);
                                    // }
                                    //----------notification to admin ------------//
                                    await NotificationServices.sendNotification('Athwas', 'Order Placed Successfully', config.adminid, 1, user_id, 3, orderResult._id, [1, 3])
                                    await NotificationServices.sendNotification('Athwas', 'Order Placed Successfully', user_id, 3, '', '', orderResult._id, [2, 3],'',3)

                                    var succMessage = Messages.ORDER_COMPLETE_SUCCESS;
                                    Response.send(req, res, 200, succMessage)
                                } else {
                                    Response.send(req, res, 400, errMessage);
                                }
                            }
                        }
                    }).catch(err => {
                        throw err;
                    });


                    async function getNearestWarehouse(cartData, warehouseData, except) {
                        if (cartData) {
                            let result;
                            let itemcount = 0;
                            await cartData.reduce(async (promise, val, i) => {

                                await promise;
                                let isWarehouseExist = await ProductInventry.findOne({
                                    _id: ObjectID(val.inventory_id._id),
                                    warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(warehouseData._id),quantity:{ $gt: 0 } } }
                                });

                                if (isWarehouseExist != null) {
                                    itemcount = itemcount + val.quantity;
                                    result = ({ exist: true, warehouse: warehouseData, itemcount: itemcount });
                                }
                            }, Promise.resolve())
                            if (result) {
                                return result;
                            } else {
                                except.push(ObjectID(warehouseData._id));
                                let newWarehouse = await WarehouseServices.findNearestExcept(deliveryObject.geoLocation.coordinates, except);
                                if (newWarehouse == null) {
                                    return ({ exist: false });
                                } else {
                                    return await getNearestWarehouse(cartData, newWarehouse, except);
                                }
                            }
                        }
                    }

                } else {
                    throw Messages.CART_IS_EMPTY;
                }
            }

        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        }
    },


    /**
     * @api {get} /user_service/customer/order/past_orders Order - Get Past Order List
     * @apiGroup User - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Orders found",
        "data": {
        "docs": [
            {
            "order_status": 0,
            "current_tracking_status": "Acknowledged",
            "offers": [
                
            ],
            "payment_mode": "Cash",
            "_id": "605b0dddb9a39e36b1a34b80",
            "user_id": "6052f3833a20d57e9738223b",
            "order_id": 32214176,
            "total_amount": 1025.2,
            "discount": 50,
            "net_amount": 990.2,
            "vat_amount": 0,
            "delivery_fee": 15,
            "expected_start_date": "2021-03-25T09:00:00.000Z",
            "expected_end_date": "2021-03-25T09:00:00.000Z",
            "delivery_address": "605b02eab9a39e36b1a34b1d",
            "promo_code": "HOLI",
            "warehouse_id": "601548f8f64aa74abe3d29ed",
            "promo_code_id": "605b053bb9a39e36b1a34b25",
            "createdAt": "2021-03-24T10:01:01.552Z",
            "id": "605b0dddb9a39e36b1a34b80"
            }
        ],
        "totalDocs": 1,
        "limit": 20,
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
    HTTP/1.1 200 OK
    {
    "message": "order doesn't exist.",
    "data": {}
    }
    */
    getPastOrders: async (req, res) => {

        try {
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            var sortPattern = { createdAt: -1 };
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var findPattern = { user_id: ObjectID(user_id), order_status: { $in: [2, 3, 4, 5] } }
            await OrderServices.userOrders(findPattern, sortPattern, page, limit).then(orderRecords => {
                var succMessage = Messages.ORDERS_FOUND;
                Response.send(req, res, 200, succMessage, orderRecords);
            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
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
                { "$unwind": "$products" },
                {
                    "$lookup": {
                        "from": Product.collection.name,
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
                        "from": BusinessCategory.collection.name,
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
                        "from": ProductInventry.collection.name,
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
                    "$group": {
                        "_id": "$_id",
                        "payment_mode": { "$first": "$payment_mode" },
                        "order_status": { "$first": "$order_status" },
                        "user_id": { "$first": "$user_id" },
                        "products": { "$push": "$products" },
                    }
                }
            ];

            OrderServices.oneRecord(aggregateCondition).then(orderdata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, orderdata);

            }).catch(err => {

                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
     * @api {post} /user_service/customer/orders/cancel_order Order - Cancel Order
     * @apiGroup App - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} order_id order_id
    * @apiParam {String} sub_order_id sub_order_id
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Order Cancel Successfully",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
    "message": "order doesn't exist.",
    "data": {}
    }
    */
    CancelOrderByUser: async (req, res) => {

        try {

            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var order_id = req.body.order_id || null;
            var sub_order_id = req.body.sub_order_id || null;

            let aggregateCondition = [{ $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } } }, { $unwind: '$products' }];
            OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {
                let orderdata = orderDetail[0];
                if (orderDetail && orderDetail.length > 0) {
                    // if (orderdata.order_status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }
                    // if (orderdata.products.status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }

                    let bussinessCatData = await BusinessCategoryServices.oneRecord({ _id: orderdata.products.business_category_id });

                    let createTime = orderdata.createdAt;
                    let OrderCancelTime = new Date(createTime.getTime() + bussinessCatData.cancelation_time * 60000);

                    let valid = createTime < new Date() && OrderCancelTime > new Date()
                    if (!valid) {
                        throw 'Sorry!!. You exceed the order cancelation time.';
                    }

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
                        if (orderUpdate[0].product[0].status == 0) {
                            await OrderServices.updateRecord(
                                { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } },
                                { 'products.$.status': 4, cancellation_date: new Date() }
                            ).then(async (orderUpdate) => {

                                let productExist = await ProductInventoryServices.oneRecord([
                                    { $match: { _id: ObjectID(updatedOrderdetails.product[0].inventory_id), warehouseinventry: { $elemMatch: { warehouse_id: ObjectID(orderdata.warehouse_id) } } } },
                                ]);

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
                                //   console.log(orderUpdate);
                                if (orderUpdate.payment_mode != 'Cash') {
                                    var returnamount = (updatedOrderdetails.product[0].is_discount == 1) ? updatedOrderdetails.product[0].offer_price : updatedOrderdetails.product[0].price;
                                    returnamount = returnamount * updatedOrderdetails.product[0].quantity;
                                    await UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { wallet: (parseFloat(returnamount)) } }).then(async updatedWallet => {
                                        if (updatedWallet) {
                                            var addPattern = {};
                                            var transition_id = Common.generateRandomNumber(8);
                                            addPattern.user_id = user_id;
                                            addPattern.transition_id = transition_id;
                                            addPattern.reason = 'order cancelled';
                                            addPattern.sender_id = "5f18295dd364c8608604b992";
                                            addPattern.user_type = 1;
                                            addPattern.sender_type = 1;
                                            addPattern.amount = parseFloat(returnamount);
                                            addPattern.wallet_amount = updatedWallet.wallet;
                                            addPattern.amount_type = 1;
                                            addPattern.request_type = 4;
                                            addPattern.order_id = order_id;
                                            addPattern.sub_order_id = sub_order_id;
                                            addPattern.all_return = 0;
                                            await TransactionHistoryServices.createRecord(addPattern);
                                            var notificationTitle = 'Athwas';
                                            var notificationText = 'Your order #' + orderUpdate.order_id + ' has been cancelled successfully';
                                            var adminnotificationText = 'The order #' + orderUpdate.order_id + ' has been cancelled by customer';
                                            NotificationServices.sendNotification(notificationTitle, notificationText, user_id, 3, '', '', orderUpdate._id, [2, 3],'',3);
                                            if (orderUpdate.driver_id && orderUpdate.driver_id != "") {
                                                NotificationServices.sendNotification(notificationTitle, adminnotificationText, orderUpdate.driver_id, 4, '', '', orderUpdate._id, [2, 3],'',3);
                                            }
                                            NotificationServices.sendNotification(notificationTitle, adminnotificationText, config.adminid, 1, user_id,3, orderUpdate._id, [1, 3]);
                                        }
                                    })
                                }
                                let resMsg = Messages.ORDER_CANCEL_SUCCESSFULLY;
                                Response.send(req, res, 200, resMsg);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 200, resMsg);
                            });
                        } else {
                            let errMsg = Messages.ORDER_ALREADY_CANCELED;
                            Response.send(req, res, 400, errMsg);
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

    /**
     * @api {post} /user_service/customer/orders/cancel_grocery_order Order - Grocery Cancel Order
     * @apiGroup App - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} order_id order_id
    * @apiParam {String} business_category_id business_category_id
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
    "message": "order doesn't exist.",
    "data": {}
    }
    */
    CancelGroceryOrderByUser: async (req, res) => {

        try {
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var order_id = req.body.order_id || null;
            var business_category_id = req.body.business_category_id || null;

            let bussinessCatData = await BusinessCategoryServices.oneRecord({ _id: business_category_id });

            let aggregateCondition = [
                { $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { business_category_id: ObjectID(business_category_id) } } } },
                {
                    $project: {
                        "_id": "$_id",
                        "tracking_status": "$tracking_status",
                        "order_status": "$order_status",
                        "current_tracking_status": "$current_tracking_status",
                        "offers": "$offers",
                        "payment_mode": "$payment_mode",
                        "user_id": "$user_id",
                        "driver_id": "$driver_id",
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
                        products: {
                            $filter: {
                                input: "$products",
                                as: "num",
                                cond: { $eq: ["$$num.business_category_id", ObjectID(business_category_id)] }
                            }
                        }
                    }
                }
            ];
            OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {
                // res.send(orderDetail);
                // return;
                if (orderDetail && orderDetail.length > 0) {
                    let orderData = orderDetail[0];
                    let firstorderdata = orderData.products[0];
                    // if (orderData.order_status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }
                    // if (firstorderdata.status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }

                    let createTime = orderData.createdAt;
                    let OrderCancelTime = new Date(createTime.getTime() + bussinessCatData.cancelation_time * 60000);

                    let valid = createTime < new Date() && OrderCancelTime > new Date()
                    if (!valid) {
                        throw 'Sorry!!. You exceed the order cancelation time.';
                    }

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

                            if (orderUpdate[0].product[0].status == 0) {
                                var returnamount = (orderUpdate[0].product[0].is_discount == 1) ? orderUpdate[0].product[0].offer_price : orderUpdate[0].product[0].price;
                                newwalletamount = newwalletamount + parseFloat(returnamount * orderUpdate[0].product[0].quantity);
                                await OrderServices.updateRecord(
                                    { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(val._id) } } },
                                    { 'products.$.status': 4, cancellation_date: new Date() }
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
                                    Response.send(req, res, 400, resMsg);
                                });
                            } else {
                                let errMsg = Messages.ORDER_ALREADY_CANCELED;
                                Response.send(req, res, 400, errMsg);
                            }
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 200, resMsg);
                        });


                    }));


                    if (orderData.payment_mode != 'Cash') {
                        await UserServices.updateRecord({ _id: ObjectID(user_id) }, { $inc: { wallet: (parseFloat(newwalletamount)) } }).then(async updatedWallet => {
                            if (updatedWallet) {
                                var addPattern = {};
                                var transition_id = Common.generateRandomNumber(8);
                                addPattern.user_id = user_id;
                                addPattern.user_type = 3;
                                addPattern.transition_id = transition_id;
                                addPattern.reason = 'order cancelled';
                                addPattern.sender_id = config.adminid;
                                addPattern.sender_type = 1;
                                addPattern.amount = parseFloat(newwalletamount);
                                addPattern.wallet_amount = updatedWallet.wallet;
                                addPattern.amount_type = 1;
                                addPattern.request_type = 4;
                                addPattern.order_id = order_id;
                                addPattern.business_category_id = business_category_id;
                                addPattern.all_return = 1;
                                await TransactionHistoryServices.createRecord(addPattern);

                            }
                        })
                    }
                    var notificationTitle = 'Athwas';
                    var notificationText = 'Your recent order has been cancelled successfully';
                    var adminnotificationText = 'The order #' + orderData.order_id + ' has been cancelled by customer';
                    NotificationServices.sendNotification(notificationTitle, notificationText, user_id, 3, '', '', orderData._id, [2, 3],'',3);
                    if (orderData.driver_id && orderData.driver_id != "") {
                        NotificationServices.sendNotification(notificationTitle, adminnotificationText, orderData.driver_id, 4, '', '', orderData._id, [2, 3],'',3);
                    }
                    NotificationServices.sendNotification(notificationTitle, adminnotificationText, config.adminid, 1, user_id, 3, orderData._id, [1, 3]);

                    let resMsg = Messages.ORDER_CANCEL_SUCCESSFULLY;
                    Response.send(req, res, 200, resMsg);

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



    /**
     * @api {post} /user_service/customer/orders/return_request Order - Return Order
     * @apiGroup App - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} order_id order_id
    * @apiParam {String} reason reason
    * @apiParam {String} sub_order_id sub_order_id
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Order return request send  Successfully",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
    "message": "order doesn't exist.",
    "data": {}
    }
    */
    ReturnOrderByUser: async (req, res) => {

        try {
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var order_id = req.body.order_id || null;
            var reason = req.body.reason || "";
            var sub_order_id = req.body.sub_order_id || null;

            let aggregateCondition = [{ $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } } }, { $unwind: '$products' }];
            OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {
                let orderdata = orderDetail[0];
                if (orderDetail && orderDetail.length > 0) {
                    // if (orderdata.order_status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }
                    // if (orderdata.products.status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }

                    let bussinessCatData = await BusinessCategoryServices.oneRecord({ _id: orderdata.products.business_category_id });

                    let createTime = orderdata.delivered_date;
                    let OrderReturnTime = new Date(createTime.getTime() + bussinessCatData.return_time * 60000);

                    let valid = createTime < new Date() && OrderReturnTime > new Date()
                    if (!valid) {
                        throw 'Sorry!!. You exceed the order return time.';
                    }

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
                        if (orderUpdate[0].product[0].status != 1) {

                            await OrderServices.updateRecord(
                                { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(sub_order_id) } } },
                                { 'products.$.status': 1, 'products.$.return_date': new Date(), 'products.$.reason': reason }
                            ).then(async (orderUpdate) => {
                                console.log("return",orderUpdate)
                                var notificationTitle = 'Athwas';
                                var notificationText = 'The return request of order #' + orderUpdate.order_id + ' has been requested successfully';
                                var adminnotificationText = 'New return request of order #' + orderUpdate.order_id + ' has been requested by user';
                                NotificationServices.sendNotification(notificationTitle, notificationText, user_id, 3, '', '', orderUpdate._id, [2, 3],'',3);
                                NotificationServices.sendNotification(notificationTitle, adminnotificationText, config.adminid, 1,user_id, 3, orderUpdate._id, [1, 3]);
                                let resMsg = Messages.ORDER_RETURN_SUCCESSFULLY;
                                Response.send(req, res, 200, resMsg);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 200, resMsg);
                            });
                        } else {
                            let errMsg = Messages.ORDER_ALREADY_CANCELED;
                            Response.send(req, res, 400, errMsg);
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

    /**
     * @api {post} /user_service/customer/orders/grocery_return_request Order - Grocery Retuen Order
     * @apiGroup App - Order
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} order_id order_id
    * @apiParam {String} reason reason
    * @apiParam {String} business_category_id business_category_id
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
    "message": "order doesn't exist.",
    "data": {}
    }
    */
    ReturnGroceryOrderByUser: async (req, res) => {

        try {
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var order_id = req.body.order_id || null;
            var reason = req.body.reason || "";
            var business_category_id = req.body.business_category_id || null;

            let bussinessCatData = await BusinessCategoryServices.oneRecord({ _id: business_category_id });

            let aggregateCondition = [
                { $match: { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { business_category_id: ObjectID(business_category_id) } } } },
                {
                    $project: {
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
                        "delivered_date": "$delivered_date",
                        "delivery_address": "$delivery_address",
                        "promo_code": "$promo_code",
                        "warehouse_id": "$warehouse_id",
                        "promo_code_id": "$promo_code_id",
                        "createdAt": "$createdAt",
                        products: {
                            $filter: {
                                input: "$products",
                                as: "num",
                                cond: { $eq: ["$$num.business_category_id", ObjectID(business_category_id)] }
                            }
                        }
                    }
                }

            ];
            OrderServices.oneRecord(aggregateCondition).then(async (orderDetail) => {
                if (orderDetail && orderDetail.length > 0) {

                    let orderData = orderDetail[0];
                    let firstorderdata = orderData.products[0];
                    // if (orderData.order_status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }
                    // if (firstorderdata.status != 0) {
                    //     throw 'Order status is changed. You can not cancel the order.';
                    // }

                    //res.send(orderData);
                    let createTime = orderData.delivered_date;
                    let OrderReturnTime = new Date(createTime.getTime() + bussinessCatData.return_time * 60000);

                    let valid = createTime < new Date() && OrderReturnTime > new Date()
                    if (!valid) {
                        throw 'Sorry!!. You exceed the order return time.';
                    }

                    let total_amount = orderData.total_amount;

                    await Promise.all(orderData.products.map(async (val) => {

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
                            if (orderUpdate[0].product[0].status != 1) {
                                await OrderServices.updateRecord(
                                    { _id: ObjectID(order_id), user_id: ObjectID(user_id), products: { $elemMatch: { _id: ObjectID(val._id) } } },
                                    { 'products.$.status': 1, 'products.$.return_date': new Date(), 'products.$.reason': reason }
                                ).then(async (orderUpdate) => {
                                    console.log("return",orderUpdate)
                                }).catch(err => {
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 400, resMsg);
                                });
                            } else {
                                let errMsg = Messages.ORDER_ALREADY_CANCELED;
                                Response.send(req, res, 400, errMsg);
                            }
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 200, resMsg);
                        });

                    }));

                    var notificationTitle = 'Athwas';
                    var notificationText = 'The return request of order #' + orderData.order_id + ' has been requested successfully';
                    var adminnotificationText = 'New return request of order #' + orderData.order_id + ' has been requested by user';
                    NotificationServices.sendNotification(notificationTitle, notificationText, user_id, 3, '', '', orderData._id, [2, 3],'',3);
                    NotificationServices.sendNotification(notificationTitle, adminnotificationText, config.adminid, 1, user_id, 3, orderData._id, [1, 3]);

                    let resMsg = Messages.ORDER_RETURN_SUCCESSFULLY;
                    Response.send(req, res, 200, resMsg);

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

    /**
     * @api {get} /user_service/customer/order/get_redeem_point Order - Redeem Point Listing
     * @apiGroup App - Order
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
                "_id": "5ffda3caf089ce094c849304",
                "earned_points": 200,
                "redeem_points": 0,
                "user_id": "5ff412eca7f6a95d560ecaf2",
                "expiration_date": "2021-03-13T13:27:38.152Z",
                "createdAt": "2021-01-12T13:27:38.155Z",
                "updatedAt": "2021-01-12T13:27:38.155Z",
                "__v": 0
            },
        ],
        "totalDocs": 1,
        "limit": 10,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null,
        "earnedPoints": 1200
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "message": "error.",
    "data": {}
    }
    */

    getRedeemPoints: async (req, res) => {
        try {
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectID(login_user_id);

            var findPattern = { user_id: login_user_id };

            var aggregatefilter = [{ $match: findPattern }];

            var sortPattern = { createdAt: -1 };

            RedeemPointServices.getAggregatePaginatedData(aggregatefilter, sortPattern, page, limit).then(async pointsData => {

                let resMsg = "Success";
                let userData = await UserServices.getUserDetailById({ _id: login_user_id });
                pointsData.earnedPoints = userData.earned_point;
                Response.send(req, res, 200, resMsg, pointsData);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, errorMess);
        }
    },

    genrateOrderforOnlinePayment: async(req,res)=>{
     // try{
        var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
        let order_id = Math.floor(10000000 + Math.random() * 90000000);
        var payment_mode = req.body.payment_mode;
        var delivery_address= req.body.delivery_address;
        var errors = [];
        if (!payment_mode || payment_mode == "") {
            errors.push({ errField: "payment_mode", errText: "payment_mode field is empty." });
        }
        if (!delivery_address || delivery_address == "") {
            errors.push({ errField: "delivery_address", errText: "delivery_address field is empty." });
        }
        // return errors
        if (errors.length > 0) {
            // error
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });

        } else {

            var updaterecord = {
                user_id: user_id,
                order_id: order_id,
                payment_mode: req.body.payment_mode,
                delivery_address:req.body.delivery_address,
                tracking_status: {
                    Acknowledged: {
                        status: 1,
                        status_title: "Acknowledged",
                        time: new Date().toISOString()
                    }
                },
                order_status:6
            }
            var findPatteren =
            [
                { $sort : { invoice_no : -1 } },
                { $limit : 1 },
                {
                    $project:{
                    "invoice_no":1
                    }
                }
            ];
            
            var lastinvoice =  await OrderServices.oneRecord(findPatteren);
            if(lastinvoice && lastinvoice.length>0){
                lastinvoice = lastinvoice[0];
            }
            var invoice_no = '';
            if (lastinvoice && typeof lastinvoice.invoice_no != "undefined") {
                invoice_no = parseInt(lastinvoice.invoice_no);
                invoice_no = invoice_no + 1;
            } else {
                invoice_no = "000001";
            }
            var str = "" + invoice_no;
            var pad = "000000";
            invoice_no = pad.substring(0, pad.length - str.length) + str;
            updaterecord.invoice_no = invoice_no
          
            await OrderServices.createRecord(updaterecord).then((orderResult)=>{
                var success= Messages.ORDER_ID_CREATED;
                var orderData ={
                    _id:orderResult._id,
                    order_id:orderResult.order_id,
                    payment_mode:orderResult.payment_mode,
                    
                }
                Response.send(req,res,200,success,orderData)
            }).catch(err =>{
                Response.send(req, res, 500, err);
            })
        }
        
        // } catch (err) {
        //     Response.send(req, res, 500, err);
        // }
        
    },

    downloadOrderPdf: async(req,res)=>{
        try{
            var order_id = req.body.order_id || "";
            var errors = [];
            if (order_id == "") {
                errors.push({ errField: "order_id", errText: "Order id is required" });
            }
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {
                let orderDetail = await OrderServices.orderDetail({
                    _id: ObjectID(order_id),






                    
                });
            
                if (orderDetail && orderDetail.length > 0) {

                    var filePath = config.rootPath + "/src/views/email_templates/order_detail1_new_design.ejs";
                    let customData= orderDetail[0];
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
                }
            }
        } catch(err){
            var errMessage = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errMessage);
        };
    }
    


}

module.exports = OrderController;