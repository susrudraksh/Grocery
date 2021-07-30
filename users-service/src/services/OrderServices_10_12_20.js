'use strict';
const { compareSync } = require('bcryptjs');
const {Carts,Order} = require('../models');
const {Messages } = require('../helpers');

const OrderServices = {
    processOrder: async function(updaterecord,user_id) {
            
        return await Order.create(updaterecord).then(async updateCartData => {

            await Carts.deleteMany({user_id:user_id})

            return updateCartData;
        }).catch((err)=>{
            throw err;
        })
                  
    },

    userOrders: async function(query) {
            
        return await Order.find(query).populate({path:"products.business_category_id",select:'name category_image category_image_url category_image_thumb_url'})
        .populate({path:"products.product_id",select:'name product_image_url product_image_thumb_url'}).then(async orderRecords => {

            return orderRecords;

        }).catch((err)=>{
            throw err;
        })
                  
    },

    orderDetail: async function(query) {

        return await Order.aggregate([
            {$match:query},
            {$unwind:"$products"},
            {
                $lookup:
                  {
                    from: 'products',
                    localField: 'products.product_id',
                    foreignField: '_id',
                    as: 'productss'
                  }
            },
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
                $lookup:
                  {
                    from: 'users',
                    localField: 'driver',
                    foreignField: '_id',
                    as: 'driver'
                  }
            },
            {
                $lookup:
                  {
                    from: 'offers',
                    localField: 'promo_code',
                    foreignField: '_id',
                    as: 'promo_code'
                  }
            },
            {
                $lookup:
                  {
                    from: 'users',
                    localField: 'delivery_address',
                    foreignField: 'delivery_address._id',
                    as: 'delivery_address'
                  }
            },
            {$unwind:"$productss"},
            {$unwind:"$businessCategory"},
            //{$unwind:"$driver"},
            //{$unwind:"$promo_code"},
			      {$group:{
                _id:"$businessCategory",
                "order_id_id":{$first:"$_id"},
                "order_id":{$first:"$order_id"},
                "user_id":{$first:"$user_id"},
                "driver":{$first:"$driver"},
                "promo_code":{$first:"$promo_code"},
                "order_status":{$first:"$order_status"},
                "tracking_status":{$first:"$tracking_status"},
				        "offers":{$first:"$offers"},
                "payment_mode":{$first:"$payment_mode"},
                "total_amount":{$first:"$total_amount"},
                "discount":{$first:"$discount"},
                "net_amount":{$first:"$net_amount"},
                delivery_address:{"$first":"$delivery_address"},
                promo_code:{"$first":"$promo_code"},
                products:{$push:"$productss"},
                "order_date":{$first:"$createdAt"}
            }},
            /*{$project:{
				category:"$_id",
                "_id":"$order_id_id",
                "order_id":"$order_id",
                "order_status":"$order_status",
                "tracking_status":"$tracking_status",
                "user_id":"$user_id",
				"offers":"$offers",
				"payment_mode":"$payment_mode",
				"total_amount":"$total_amount",
				"discount":"$discount",
				"net_amount":"$net_amount",
				delivery_address:"$delivery_address",
				promo_code:"$promo_code",
				products:"$products"
            }},*/
            {$project:{
                category:{_id:"$_id._id","name":"$_id.name","cancelation_time":"$_id.cancelation_time","return_time":"$_id.return_time"
                ,"category_image":"$_id.category_image","products":"$products"},
                "_id":"$order_id_id",
                "order_id":"$order_id",
                "order_status":"$order_status",
                "tracking_status":"$tracking_status",
                "user_id":"$user_id",
                "offers":"$offers",
                "payment_mode":"$payment_mode",
                "total_amount":"$total_amount",
                "discount":"$discount",
                "net_amount":"$net_amount",
                delivery_address:"$delivery_address",
                promo_code:"$promo_code",
                order_date:"$order_date"
            }},
            {$group:{_id:"$_id",
                "category":{$push:"$category"},
                "order_id":{$first:"$order_id"},
                "user_id":{$first:"$user_id"},
                "driver":{$first:"$driver"},
                "promo_code":{$first:"$promo_code"},
                "order_status":{$first:"$order_status"},
                "tracking_status":{$first:"$tracking_status"},
                "offers":{$first:"$offers"},
                "payment_mode":{$first:"$payment_mode"},
                "total_amount":{$first:"$total_amount"},
                "discount":{$first:"$discount"},
                "net_amount":{$first:"$net_amount"},
                delivery_address:{"$first":"$delivery_address"},
                promo_code:{"$first":"$promo_code"},
                order_date:{$first:"$order_date"}
            }}
			
        ]).then((orderDetails) => {

            console.log("orderDetails",orderDetails)

        return orderDetails;
    

    }).catch((err)=>{

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
    updateRecord: async (data, condition) => {
      return await Order.findOneAndUpdate(data, condition, { new: true })
        .select("")
        .then((createRes) => {
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
            
        
    
}
//NotificationServices.createRecord({title:"Hello2",message:"Test message2",user_id:'5f730e04b8ca663ae84a36ce',user_type:3,sender_id:'5f18295dd364c8608604b992',sender_type:1,read_status:0,notification_type:1})
module.exports = OrderServices; 