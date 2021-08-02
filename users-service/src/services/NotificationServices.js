'use strict';
const {Notifications} = require('../models');
const UserServices = require('../services/UserServices');
const {Pubnub,Validation,PushNotification}  = require('../helpers');
const NotificationServices = {
    createRecord: async function(Records) {
        return await Notifications.create(Records).then(notificationData=>{
                return notificationData;
        }).catch((err)=>{
            throw err;
        })
    },

    allRecord: async function(condition = {}){
        return await Notifications.findAll(condition).then(notificationData=>{
            return notificationData;
        }).catch((err)=>{
            throw err;
        })
    },

    oneRecord: async function(condition = []){
        return await Notifications.aggregate(condition).then(notificationData=>{
            return notificationData;
        }).catch((err)=>{
            throw err;
        })
    },

    deleteRecord : async function (condition) {
        return Notifications.deleteOne(condition).then(deleteRes => {
            return deleteRes;
        }).catch(err => {
            throw err;
        });
    },

    deleteAllRecord : async function (condition) {
        return Notifications.deleteMany(condition).then(deleteRes => {
            return deleteRes;
        }).catch(err => {
            throw err;
        });
    },

    
    getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

        var query = findPattern;
        var options = {
            sort: sortPattern,
            page: page_no,
            limit: limit,
        };
        var myAggregate = Notifications.aggregate(findPattern);
        return await Notifications.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
            return paginatedData;
        }).catch(err => {
            throw err;
        })
    },

    getDataCount: async function (findPattern) {

        return Notifications.countDocuments(findPattern).then((count) => {
            return count;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async (data, condition) => {
        return await Notifications.findOneAndUpdate(data, condition, { new: true }).select('').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
    },

    updateRecordMany: async (data, condition) => {
        return await Notifications.updateMany(data, condition, { new: true }).select('').then(createRes => {
            return createRes;
        }).catch(err => {
            throw err; 
        });
    },

    
    sendNotification: async (title = "Athwas", message = "", user_id, user_type, sender_id, sender_type,order_id="",notification_type=[1,2,3],product_id='',message_type='') => {
      
        console.log(user_id,user_type,notification_type)
        if (user_id && user_id!="") {
            
            var createNotification = {
                user_id: user_id,   
                title: title,
                message: message,
                user_type: user_type,
                notification_type: 1,
            }
            if(order_id && order_id!=""){
                createNotification.order_id=order_id;
            }
            if(product_id && product_id!=""){
                createNotification.product_id=product_id;
            }
            if(sender_id && sender_id!=""){
                createNotification.sender_id = sender_id;
                createNotification.sender_type = sender_type;
            }

            //-----------------------------------Pubnub-------------------------------//
            if(notification_type.includes(1)){
                console.log('createNotification',createNotification)
                Pubnub.publishSampleMessage(title,message)
            }
            //-----------------------------------Pubnub-------------------------------//


            //-----------------------------------Fcm-------------------------------//
            
            if(notification_type.includes(2)){
              let userInfo = await UserServices.getUserDetailById({ _id: user_id });
             
             
              if(userInfo.device_token!="" && (user_type==3 || user_type==4)){
                var messagedata_id  = '';
                if(message_type ==2){
                    messagedata_id = product_id;
                }
                if(message_type ==3){
                    messagedata_id = order_id;
                }

                var Fcmmessage = {};
                if(userInfo.device_type=="1"){
                    // var newdata = {
                    //     your_custom_data_key: 'your_custom_data_value',
                    //     custom_message_type:message_type,
                    //     id:messagedata_id,
                    //     title: title,
                    //     body: message
                    // }
                     Fcmmessage = {
                        to: userInfo.device_token,
                        collapse_key: '',
                        priority: "high",
                        data: {
                            your_custom_data_key: 'your_custom_data_value',
                            custom_message_type:message_type,
                            id:messagedata_id,
                            title: title,
                            body: message
                        },
                        // notification: {
                        //     title: title,
                        //     body: message
                        // }
                    };
                }else{
                    Fcmmessage = {
                        to: userInfo.device_token,
                        collapse_key: '',
                        data: {
                            your_custom_data_key: 'your_custom_data_value',
                            custom_message_type:message_type,
                            id:messagedata_id
                        },
                        notification: {
                            title: title,
                            body: message
                        }
                    };
                }

            
                  console.log(JSON.stringify(Fcmmessage));
                  PushNotification.sendForAndriodIos(Fcmmessage);
              }
            }
            //-----------------------------------Fcm-------------------------------//


            //-----------------------------------Normal-------------------------------//
            if(notification_type.includes(3)){
                console.log("store",createNotification)
                await NotificationServices.createRecord(createNotification).then(async result => {
                    let resMsg = "Success";
                    console.log("resMsg",resMsg)
                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err)
                    console.log("resMsg",resMsg)
                   // Response.send(req, res, 500, resMsg);
                })
            }
            //-----------------------------------Normal-------------------------------//
            return true;
          
        }
    }
    
}
//NotificationServices.sendNotification('Athwas', 'test', "6052f3833a20d57e9738223b", 3, '', '', "", [2])
//NotificationServices.createRecord({title:"Hello2",message:"Test message2",user_id:'5f730e04b8ca663ae84a36ce',user_type:3,sender_id:'5f18295dd364c8608604b992',sender_type:1,read_status:0,notification_type:1})
module.exports = NotificationServices; 