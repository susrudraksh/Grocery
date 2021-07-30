'use strict';
const { compareSync } = require('bcryptjs');
const { Carts, Order } = require('../models');
const { Messages } = require('../helpers');
const config = require('../config');
const UPLOAD_PRODUCT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";
var ObjectID = require('mongoose').Types.ObjectId;

const OrderServices = {
  processOrder: async function (updaterecord, user_id) {
    var lastinvoice =  await Order.findOne().select('invoice_no').sort({ invoice_no: -1 }).limit(1);
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
    return await Order.create(updaterecord).then(async updateCartData => {
      console.log("updateCartData")
      await Carts.deleteMany({ user_id: user_id })

      return updateCartData;
    }).catch((err) => {
      throw err;
    })

  },

  updateprocessOrder: async function (updaterecord,condition, user_id) {
    console.log("updaterecord",updaterecord);
    return await Order.findOneAndUpdate(condition,updaterecord, { new: true }).then(async updateCartData => {
      await Carts.deleteMany({ user_id: user_id })
      return updateCartData;
    }).catch((err) => {
      throw err;
    })

  },

  createRecord: async (orderData) => {
    return await Order.create(orderData).then(createRes => {
        return createRes;
    }).catch(err => {
        throw err;
    });
    
  },

  userOrders: async function (query, sortPattern, page_no, limit) {


    var options = {
      sort: sortPattern,
      populate: [
        { path: "products.business_category_id", select: 'name category_image category_image_url category_image_thumb_url' },
        { path: "products.product_id", select: 'name product_image_url product_image_thumb_url' }
      ],
      page: page_no,
      limit: limit,
      select: ' -updatedAt -__v -products -tracking_status',
    };

    return await Order.paginate(query, options).then(async orderRecords => {
      return orderRecords;
    }).catch((err) => {
      throw err;
    })
  },

  orderDetail: async function (query) {

    return await Order.aggregate([
      { $match: query },
      { $unwind: "$products" },
      {
        $lookup:
        {
          from: 'products',
          let: { "id": "$products.product_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
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
            {$unwind:'$CategoryData'},
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
            {$unwind:'$SubCategoryData'},
          ],
          as: 'productss'
        }
      },
    //  

    //  },
      { $set: { "productss.quantity": "$products.quantity" } },
      { $set: { "productss._id": "$products._id" } },
      { $set: { "productss.price": "$products.price" } },
      { $set: { "productss.offer_price": "$products.offer_price" } },
      { $set: { "productss.tax_type": "$products.tax_type" } },
      { $set: { "productss.tax_rate": "$products.tax_rate" } },
      { $set: { "productss.cgst_rate": "$products.cgst_rate" } },
      { $set: { "productss.sgst_rate": "$products.sgst_rate" } },
      { $set: { "productss.igst_rate": "$products.igst_rate" } },
      { $set: { "productss.reason": "$products.reason" } },
      { $set: { "productss.return_date": "$products.return_date" } },
      { $set: { "productss.is_discount": "$products.is_discount" } },
      { $set: { "productss.inventory_id": "$products.inventory_id" } },
      { $set: { "productss.order_status": "$products.status" } },
      { $set: { "products.images": "$productss.images" } },
      { $unwind: "$products.images" },
      {
        $lookup: {
          from: 'product_images',
          let: { "images": "$products.images" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$images"] } } },

            {
              $project: {
                'product_image_url': { $concat: [UPLOAD_PRODUCT_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                "product_image_thumb_url": { $concat: [UPLOAD_PRODUCT_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
              }
            }
          ],
          as: 'ProductImages'
        }
      },
      { $set: { "productss.images": "$ProductImages" } },
      {
        $lookup:
        {
          from: 'business_categories',
          localField: 'products.business_category_id',
          foreignField: '_id',
          as: 'businessCategory'
        }
      },
     
      {
        $lookup: {
          from: 'users',
          let: { "id": "$driver_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { "username": 1, "phone": 1, "register_id": 1 } }
          ],
          as: 'driver'
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { "id": "$user_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { "username": 1, "phone": 1, 'delivery_address': 1, "register_id": 1 } }
          ],
          as: 'userData'
        }
      },
      {
        $lookup: {
          from: 'warehouses',
          let: { "id": "$warehouse_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { "name": 1, "address": 1 } }
          ],
          as: 'warehouseData'
        }
      },
      {
        $lookup:
        {
          from: 'offers',
          localField: 'promo_code_id',
          foreignField: '_id',
          as: 'promo_code_id'
        }
      },
      // {
      //   $lookup:
      //   {
      //     from: 'users',
      //     localField: 'delivery_address',
      //     foreignField: 'delivery_address._id',
      //     as: 'delivery_address'
      //   }
      // },
      { $unwind: "$productss" },
      { $unwind: "$businessCategory" },
      // { $unwind: "$driver" },
      { $unwind: "$userData" },
      //{ $unwind: "$warehouseData" },
      //{$unwind:"$promo_code"},
      {
        $group: {
          _id: "$businessCategory",
          "current_tracking_status": { $first: "$current_tracking_status" },
          "order_id_id": { $first: "$_id" },
          "order_id": { $first: "$order_id" },
          "customer_phone": { $first: "$customer_phone" },
          "customer_name": { $first: "$customer_name" },
          "redeem_points": { $first: "$redeem_points" },
          "invoice_no": { $first: "$invoice_no" },
          "driver": { $first: "$driver" },
          "userData": { $first: "$userData" },
          "warehouseData": { $first: "$warehouseData" },
          "promo_code_id": { $first: "$promo_code_id" },
          "promo_code": { $first: "$promo_code" },
          "order_status": { $first: "$order_status" },
          "tracking_status": { $first: "$tracking_status" },
          "offers": { $first: "$offers" },
          "payment_mode": { $first: "$payment_mode" },
          "total_amount": { $first: "$total_amount" },
          "discount": { $first: "$discount" },
          "net_amount": { $first: "$net_amount" },
          "vat_amount": { $first: "$vat_amount" },
          "delivery_fee": { $first: "$delivery_fee" },
          "expected_start_date": { $first: "$expected_start_date" },
          "expected_end_date": { $first: "$expected_end_date" },
          delivery_address: { "$first": "$delivery_address" },
          promo_code: { "$first": "$promo_code" },
          products: { $push: "$productss" },
          "order_date": { $first: "$createdAt" },
          "cancelation_time": { $first: "$businessCategory.cancelation_time" },
          "return_time": { $first: "$businessCategory.return_time" },
          "delivered_date": { $first: "$delivered_date" },
        }
      },
  //     /*{$project:{
  // category:"$_id",
  //         "_id":"$order_id_id",
  //         "order_id":"$order_id",
  //         "order_status":"$order_status",
  //         "tracking_status":"$tracking_status",
  //         "user_id":"$user_id",
  // "offers":"$offers",
  // "payment_mode":"$payment_mode",
  // "total_amount":"$total_amount",
  // "discount":"$discount",
  // "net_amount":"$net_amount",
  // delivery_address:"$delivery_address",
  // promo_code:"$promo_code",
  // products:"$products"
  //     }},*/
      {
        $project: {
          category: {
            _id: "$_id._id", "name": "$_id.name", "cancelation_time": "$_id.cancelation_time", "all_return": "$_id.all_return", "return_time": "$_id.return_time"
            , "category_image": "$_id.category_image", "products": "$products"
          },
          "current_tracking_status": "$current_tracking_status",
          "_id": "$order_id_id",
          "order_id": "$order_id",
          "customer_phone": "$customer_phone",
          "customer_name": "$customer_name",
          "redeem_points": "$redeem_points",
          "invoice_no": "$invoice_no",
          "order_status": "$order_status",
          "tracking_status": "$tracking_status",
          "offers": "$offers",
          "payment_mode": "$payment_mode",
          "total_amount": "$total_amount",
          "discount": "$discount",
          "net_amount": "$net_amount",
          "vat_amount": "$vat_amount",
          "delivery_fee": "$delivery_fee",
          "expected_start_date": "$expected_start_date",
          "expected_end_date": "$expected_end_date",
          "delivered_date": "$delivered_date",
          delivery_address: "$delivery_address",
          promo_code_id: "$promo_code_id",
          promo_code: "$promo_code",
          order_date: "$order_date",
          order_cancel_time: { $add: ["$order_date", { $multiply: ["$cancelation_time", 60, 1000] }] },
          order_return_time: { $add: ["$order_date", { $multiply: ["$return_time", 60, 1000] }] },
          driver: "$driver",
          userData: "$userData",
          warehouseData: "$warehouseData",
          delivery_address: {
            $filter: {
              input: "$userData.delivery_address",
              as: "num",
              cond: { $eq: ["$$num._id", "$delivery_address"] }
            }
          },
        }
      },
      { "$unwind": "$delivery_address" },
      {
        $group: {
          _id: "$_id",
          "category": { $push: "$category" },
          "current_tracking_status": { $first: "$current_tracking_status" },
          "order_id": { $first: "$order_id" },
          "customer_phone": { $first: "$customer_phone" },
          "customer_name": { $first: "$customer_name" },
          "redeem_points": { $first: "$redeem_points" },
          "invoice_no": { $first: "$invoice_no" },
          "userData": { $first: { _id: "$userData._id", "username": "$userData.username", "phone": "$userData.phone", "register_id": "$userData.register_id" } },
          "warehouseData": { $first: "$warehouseData" },
          "driver": { $first: "$driver" },
          "promo_code_id": { $first: "$promo_code_id" },
          "promo_code": { $first: "$promo_code" },
          "order_status": { $first: "$order_status" },
          "tracking_status": { $first: "$tracking_status" },
          "offers": { $first: "$offers" },
          "payment_mode": { $first: "$payment_mode" },
          "total_amount": { $first: "$total_amount" },
          "discount": { $first: "$discount" },
          "net_amount": { $first: "$net_amount" },
          "vat_amount": { $first: "$vat_amount" },
          "delivery_fee": { $first: "$delivery_fee" },
          "expected_start_date": { $first: "$expected_start_date" },
          "expected_end_date": { $first: "$expected_end_date" },
          "delivered_date": { $first: "$delivered_date" },
          delivery_address: { $first: { _id: "$delivery_address._id", "full_address": "$delivery_address.full_address", "address_type": "$delivery_address.address_type", "address_location": "$delivery_address.geoLocation","zip_code":"$delivery_address.zip_code" } },
          promo_code: { "$first": "$promo_code" },
          order_date: { $first: "$order_date" },
          order_cancel_time: { $first: "$order_cancel_time" },
          order_return_time: { $first: "$order_return_time" }
        }
      }

    ]).then((orderDetails) => {


      return orderDetails;


    }).catch((err) => {

      console.log("err", err)

      throw err;
    })

  },

  // createRecord: async (OrderData) => {
  //   return await Order.create(OrderData)
  //     .then((createRes) => {
  //       return createRes;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // },
  oneRecord: async (condition = {}) => {
    return await Order.aggregate(condition)
      .then((createRes) => {
        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },
  allRecord: async (condition = {}) => {
    return await Order.aggregate(condition)
      .then((createRes) => {
        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },
  updateRecord: async (data, condition, select = "") => {
    return await Order.findOneAndUpdate(data, condition, { new: true })
      .select(select)
      .then(async (createRes) => {
        var rejectedorcancel = 0;
        var returned = 0;
        var cancel = 0;
        if (createRes.products) {
          await createRes.products.map((value) => {
            if (parseInt(value.status) == parseInt(4) || parseInt(value.status) == parseInt(2)) {
              rejectedorcancel = rejectedorcancel + 1;
              if (parseInt(value.status) == parseInt(2)) {
                returned = returned + 1;
              }
              if (parseInt(value.status) == parseInt(4)) {
                cancel = cancel + 1;
              }
            }
          });
          if (createRes.products.length == rejectedorcancel) {
            var order_status = 5;
            if (createRes.products.length == cancel) {
              order_status = 4
            }
            if (createRes.products.length == returned) {
              order_status = 3
            }
            await Order.findOneAndUpdate(
              { _id: ObjectID(data._id) }, { order_status: order_status });
          }
        }

        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },

  getAggregatePaginatedData: async function (
    findPattern,
    sortPattern,
    page_no,
    limit
  ) {
    var query = findPattern;
    var options = {
      sort: sortPattern,
      page: page_no,
      limit: limit,
    };

    var myAggregate = Order.aggregate(findPattern);

    return await Order.aggregatePaginate(myAggregate, options)
      .then(async (paginatedData) => {
        return paginatedData;
      })
      .catch((err) => {
        throw err;
      });
  },

  getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {
    var query = findPattern;
    var options = {
      sort: sortPattern,
      populate: [
        {
          path: "category_id",
          select: "name",
          match: {
            $or: [{ name: { $regex: "fghfgh" } }],
          },
        },
        {
          path: "business_category_id",
          select: "name",
        },
        {
          path: "sub_category_id",
          select: "name",
        },
      ],
      page: page_no,
      limit: limit,
    };
  },

  getDataCount: async function (findPattern) {

    return Order.countDocuments(findPattern).then((count) => {
        return count;
    }).catch(err => {
        throw err;
    });
}


}
//NotificationServices.createRecord({title:"Hello2",message:"Test message2",user_id:'5f730e04b8ca663ae84a36ce',user_type:3,sender_id:'5f18295dd364c8608604b992',sender_type:1,read_status:0,notification_type:1})
module.exports = OrderServices;