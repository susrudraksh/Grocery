"use strict";
const { ObjectID } = require('mongodb');
//var ObjectID = require('mongoose').Types.ObjectId;
const { CartServices, OrderServices, UserServices, ProductInventoryServices, TransactionHistoryServices, ProductServices, BusinessCategoryServices, WarehouseServices,ContentServices, NotificationServices,RedeemPointServices,DealOfDayServices} = require('../services');
const { Common, Response, Validation, Messages,DateTime,PushNotification } = require('../helpers');
const config = require('../config');
const moment = require("moment");

//console.log(RedeemPointServices);

module.exports = {

    redeemPoint: async()=>{
        
        let normal_setting = await ContentServices.getRequest("customer/normal_settings");
           // console.log(normal_setting);
            await OrderServices.allRecord([
                {
                    $match:
                    {
                        order_status:2,
                        "delivered_date":{ $gte: new Date((new Date().getTime() - (90 * 24 * 60 * 60 * 1000))) }
                    }
                },
                {
                    $group:{
                        _id:"$user_id",
                        net_amount:{$sum:"$net_amount"},
                    }
                },
                {
                    $redact: {
                      $cond: {
                        if: { $gte: [ "$net_amount", normal_setting.total_sale ] },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                      }
                    }
                  }
            ]).then(async result=>{
               
                if(result && result.length>0){
                    await result.reduce(async (promise, orderdata, key) => {
                        await promise;
                        var find ={
                            _id: ObjectID(orderdata._id),
                        }
                        find["$or"]=[{
                            last_earned_point_date:{ $lte: new Date((new Date().getTime() - (90 * 24 * 60 * 60 * 1000))) },
                            last_earned_point_date: { $exists: false}
                        }]
                        console.log(find);
                            await UserServices.updateRecord(find,
                                { $inc: { earned_point: +(parseInt(normal_setting.reward_points)) },last_earned_point_date: new Date()}, 'id wallet username').then(async updatedWallet => {
                                    
                                if (updatedWallet) {
                                    var createRecord ={
                                        user_id:orderdata._id,
                                        earned_points:normal_setting.reward_points,
                                        expiration_date:new Date((new Date().getTime() + ((normal_setting.expiration_time) * 24 * 60 * 60 * 1000)))
                                    }
                                    await  RedeemPointServices.createRecord(createRecord).then(async customizersult => {
                                        return true;
                                    }).catch(err => {
                                        let resMsg = Validation.getErrorMessage(err);
                                       console.log(err)
                                    })
                                    return true;
                                }
                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                               console.log(err);
                            })
                            return true;
                       
                    }, Promise.resolve());

                   
                }
               
              })
    },

    notifyMe: async()=>{
    await ProductInventoryServices.allRecord([
        {
            $match:{notify_me : {$exists:true, $gt: { '$size': 0 }},product_quantity:{$gt:0}}
        },{
            $project:{
                notify_me:1
        }
        }
        ]).then(async result=>{
            if(result && result.length>0){
                await result.reduce(async (promise, productdata, key) => {
                    await promise;

                    await productdata.notify_me.reduce(async (promise, userdata, key) => {
                        await promise;
                        
                        let userInfo = await UserServices.getUserDetailById({ _id: userdata.user_id });
                        if(userInfo.device_token!=""){
                            var productname = await ProductInventoryServices.oneRecord([{$match:{_id:ObjectID(productdata._id)}}]);
                         
                            var message =  "Product "+productname.inventory_name+" is restocked"
                            var fcmmessage = {};
                            if(userInfo.device_type==1){
                                fcmmessage = {
                                    to: userInfo.device_token,
                                    collapse_key: '',
                                    data: {
                                        your_custom_data_key: 'your_custom_data_value',
                                        custom_message_type:2,
                                        id:productdata._id,
                                        title: 'Athwas',
                                        body: message
                                    },
                                    // notification: {
                                    //     title: 'Athwas',
                                    //     body: message
                                    // }
                                };
                            }else{
                                fcmmessage = {
                                    to: userInfo.device_token,
                                    collapse_key: '',
                                    data: {
                                        your_custom_data_key: 'your_custom_data_value',
                                        custom_message_type:2,
                                        id:productdata._id
                                    },
                                    notification: {
                                        title: 'Athwas',
                                        body: message
                                    }
                                };
                            }
                            PushNotification.sendForAndriodIos(fcmmessage);
                            var createNotification = {
                                user_id: userdata.user_id,
                                title: "Stock Available",
                                message: message,
                                sender_id: "5f18295dd364c8608604b992",
                                user_type: 3,
                                sender_type: 1,
                                notification_type: 1,
                            } 
                            await NotificationServices.createRecord(createNotification).then(async result => {
                                return true;
                            })
                        }
                        return true;
                    }, Promise.resolve());

                   console.log(ObjectID)
                    var newfindPattern = { _id: ObjectID(productdata._id)};
                    await ProductInventoryServices.updateRecord(newfindPattern, { notify_me: []  }).then(updatedRes => {
                        return true;
                    });

                    return true;
                }, Promise.resolve());
            }
            //  Response.send(req, res, 200,  'sussMessage',result);
        })
    return ;
},
updateDealofDay: async () => {
        
    var datefilter = {};
        // var startDate = new Date(Date.now() - 1000 * 60 * 60 * 24)
        // startDate.setDate(startDate.getDate());
        // datefilter["$and"] = [
        //     { 
        //         updatedAt: { "$lt": startDate },
        //         is_active:1,
        //         is_deleted:0
        //     }
        // ]
    
    var aggregate = [
        {$match:{"statusactiveDate":{$lt:new Date(Date.now() - 1000 * 60 * 60 * 24)}, is_active:1,is_deleted:0}},
    ]

    var alldealofdayIds = await DealOfDayServices.allRecord(aggregate);
    alldealofdayIds = alldealofdayIds.map(v => v._id);

    var filterbyids = {};
    if (alldealofdayIds.length > 0) {
        filterbyids = { $expr: { $in: ["$_id", alldealofdayIds] } }
    }
    if (alldealofdayIds.length > 0) {
        await DealOfDayServices.updateManyRecord(filterbyids,{is_active:0}).then(resut=>{
            console.log("deal inactive");
        }).catch(err=>{
            console.log("err",err);
        })
    }
    console.log("alldealofdayIds",alldealofdayIds)
    return;
},


minimumInventory: async()=>{
    var toDay = moment();
        toDay = toDay.format('YYYY-MM-DD');
        console.log(toDay)
        // var startDate = new Date(toDay + " 00:00:01");
        // console.log(startDate)
       // startDate.setDate(startDate.getDate());
            
    await ProductInventoryServices.allRecord([
        {
            $match:{ $expr: {$eq:['$product_quantity','$min_inventory']},last_notification_time:{$ne:toDay}}
        }
        ]).then(async result=>{
            console.log("result",result)
          var   allproductIds = result.map(v => v._id);

            var filterbyids = {};
            if (allproductIds.length > 0) {
                filterbyids = { $expr: { $in: ["$_id", allproductIds] } }
            }
            if(result && result.length>0){
                await result.reduce(async (promise, productdata, key) => {
                    await promise;
                    //console.log("productdata",productdata)
                    var productname = await ProductInventoryServices.oneRecord([{$match:{_id:ObjectID(productdata._id)}}]);
                         
                    var message =  "Product "+productname.inventory_name+" reach at their  min inventory limit"
                    var title = "Minimum Inventory Alert!";
                    await  NotificationServices.sendNotification(title,message,config.adminid,1,'','','',[1,3],productdata.product_id);
                   
                    return true;
                }, Promise.resolve());
                await ProductInventoryServices.updateManyRecord(filterbyids,{last_notification_time: toDay}).then(resut=>{
                    console.log("Update Inventory");
                }).catch(err=>{
                    console.log("err",err);
                })
            }   
        }).catch(err=>{
            console.log("err",err);
        })
},

expireRedeemPoint: async()=>{
        
    
    await RedeemPointServices.allRecord(
    [
        {
            $match:{
                expiration_date:{$lte:new Date()}
            }
        },
        { 
            "$project": {
                "remain_point": { 
                    "$subtract": ["$earned_points", "$redeem_points"] 
                },
                "user_id": 1
            }
        },{
            $group: { 
                _id: "$user_id", 
                total: { 
                    $sum: "$remain_point" 
                } 
            } 
        }
    
    ]).then(async result=>{

       var redeemPointsIds = result.map(v => ObjectID(v._id));
    
        var filterbyids = {};
        if (redeemPointsIds.length > 0) {
            filterbyids = { $expr: { $in: ["$user_id", redeemPointsIds] } }
            console.log(JSON.stringify(filterbyids));
            await RedeemPointServices.updateManyRecord(filterbyids,[{$set: {'redeem_points': '$earned_points',"expiration_date":""}}], {"multi": true});
            result.map((v)=>{
                UserServices.updateRecord({_id:ObjectID(v._id)},
                [{
                    $set: {
                        earned_point: {
                            $cond: [
                              { $lte: ['$earned_point', -parseInt(v.total)] }, // balance + amount <= 0
                              0, 
                              { $subtract: ['$earned_point',parseInt(v.total)]}
                            ]
                            
                        }
                           
                    }
                  }])
                  //{ $inc: { 'earned_point': -(v.total)} })
            })
          
        }
       
    }).catch(err=>{
        console.log("err",err);
    })  
}

};