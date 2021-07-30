'use strict';


const _ = require('lodash');
const { OrderServices, UserServices, NotificationServices } = require('../../services');
const { Response, Messages, Validation, Media, DateTime, PushNotification } = require('../../helpers');
var ObjectID = require("mongoose").Types.ObjectId;


const NotificationController = {

    getCustomerLists: async (req, res) => {

        try {
            var status = req.query.status || 1;
            var user_type = req.query.user_type || 3;
            var daysLimit = parseInt(req.query.days_limit);
            var amountLimit = parseInt(req.query.amount_limit*1000) || 0;
            var page = parseInt(req.query.page_no) || 1;
            var limit =  10000;

            var findPattern = {};

          //  findPattern = { order_status: { $in: [0, 1] } }
            //findPattern = { user: { $in: [0, 1] } }

            var currentDate = new Date();
            if(daysLimit!=""){
                currentDate.setMonth(currentDate.getMonth() - daysLimit);
                findPattern = { createdAt: { $gte: currentDate } }
            }
           
            var sortPattern = { createdAt: -1 };

            let aggregateCondition = [
                { $match: findPattern },
                {
                    $group:{
                        _id:"$user_id",
                        net_amount:{$sum:"$net_amount"},
                    }
                },
                {
                    $redact: {
                      $cond: {
                        if: { $gte: [ "$net_amount", amountLimit ] },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                      }
                    }
                  }
            ];

            var userIdsArr = [];

            OrderServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(async userdata => {
               
                if (userdata) {
                    await userdata.docs.map((user) => {
                        userIdsArr.push(ObjectID(user._id));
                    });
                    var findPatternUser = {};

                   // findPatternUser.is_active = parseInt(status);
                    findPatternUser.is_deleted = 0;
                    findPatternUser.user_role = parseInt(user_type);
                    if(user_type==3){
                        if(status==0){
                            findPatternUser._id = { $nin: userIdsArr };
                        }else{
                            findPatternUser._id = { $in: userIdsArr };
                        }
                    }
                   

                    var aggregateCondition = [{
                        $match: findPatternUser,
                    },
                    {
                        "$project": {
                            "username": 1
                        }
                    }];

                    UserServices.allRecord(aggregateCondition).then(userdata => {

                        let resMsg = "Success";
                        Response.send(req, res, 200, resMsg, userdata);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });
                } else {
                    let resMsg = "Not Found";
                    Response.send(req, res, 200, resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 200, resMsg);
            });
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    addNotifications: async (req, res) => {

        try {

            var user_ids = JSON.parse(req.body.sent_to_users);

            var title = "Test";

            var status = req.body.status;

            var message = req.body.notification_text;

            var sender_id = req.body.sender_id;

            var user_type = req.body.user_type;

            //var order_id = "5f6daa41ab1e3719e88db2e1";

            var findPatternUser = {};

            findPatternUser.is_active = parseInt(status);

            findPatternUser.is_deleted = 0;

            findPatternUser.user_role = parseInt(user_type);

            var aggregateCondition = [{

                $match: findPatternUser,

            }];

            if (req.body.sent_to == "all_users") {

                UserServices.allRecord(aggregateCondition).then(async userdata => {

                  
                        await userdata && userdata.reduce(async (promise, user, key) => {

                            await promise;
                            var createNotification = {

                                user_id: user._id,

                                title: title,

                                message: message,

                                sender_id: sender_id,

                                user_type: user.user_role,

                               // order_id: order_id,

                                sender_type: 1,
                                notification_type: 1,

                            }

                            //Notification 
                            if(user.device_token!=""){
                                var notifymessage = {
                                    to: user.device_token,
                                    collapse_key: '',
                                    data: {
                                        user_id: user._id,
                                        custom_message_type:1
                                    },
                                    notification: {
                                        title: 'Athewas Notification',
                                        body: message
                                    }
                                };
                                PushNotification.sendForAndriodIos(notifymessage);
                            }

                            await NotificationServices.createRecord(createNotification).then(async result => {

                                let resMsg = "Success";

                                //Response.send(req, res, 200, resMsg);

                            }).catch(err => {

                                let resMsg = Validation.getErrorMessage(err);

                                Response.send(req, res, 500, resMsg);

                            })

                        }, Promise.resolve());

                    
                    let resMsg = "Success";

                    Response.send(req, res, 200, resMsg, userdata);

                }).catch(err => {

                    let resMsg = Validation.getErrorMessage(err);

                    Response.send(req, res, 500, resMsg);

                });

            } else {

                await user_ids.reduce(async (promise, user, key) => {

                    await promise;

                    var createNotification = {

                        user_id: user,

                        title: title,

                        message: message,

                        sender_id: sender_id,

                        user_type: user_type,

                       // order_id: order_id,
                        sender_type: 1,
                        notification_type: 1,

                    }

                    let userData = await UserServices.getUserDetailById({ _id: user });

                    if (userData) {

                        var notifymessage = {

                            to: userData.device_token,

                            collapse_key: '',

                            data: {

                                user_id: user,
                                custom_message_type:1
                            },

                            notification: {

                                title: 'Athewas Notification',

                                body: message

                            }

                        };

                        PushNotification.sendForAndriodIos(notifymessage);

                    }

                    await NotificationServices.createRecord(createNotification).then(async result => {

                        let resMsg = "Success";

                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {

                        let resMsg = Validation.getErrorMessage(err);

                        Response.send(req, res, 500, resMsg);

                    })

                }, Promise.resolve());

                let resMsg = "Success";

                Response.send(req, res, 200, resMsg, userdata);

            }

        } catch (err) {

            Response.send(req, res, 500, err.message);

        }

    },
    getNotifications: async(req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            var start_date = req.query.start_date || "";
            var end_date = req.query.end_date || "";

            var findPattern = {
                user_type : 1
            };

            if (start_date != "" || end_date != "") {
                findPattern["$and"] = [];
            }

            if (start_date != "") {
                start_date = start_date + " 00:00:00"
                var start_date = new Date(start_date);
                start_date.setDate(start_date.getDate());
                
            }

            if (end_date != "") {
                end_date = end_date + " 23:59:59"
                var end_date = new Date(end_date);
                end_date.setDate(end_date.getDate());
            }

            if (start_date != "" || end_date != "") {
                findPattern["$and"] = [
                    { createdAt: { "$gte": start_date } },
                    { createdAt: { "$lte": end_date } }
                ];
            }
            console.log(JSON.stringify(findPattern))

            var sortPattern = { createdAt: -1 };

            var aggregateCondition = [
                { $match: findPattern },
                {
                    $lookup: {
                        from: "users",
                        let: { id: "$sender_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { username: 1 } },
                        ],
                        as: "userdata",
                    },
                },
                {
                    $lookup: {
                        from: "admins",
                        let: { id: "$user_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { username: 1 } },
                        ],
                        as: "admindata",
                    },
                },
                {
                    $project:{
                        userData : {
                            $cond: { 
                                if:{$gte: [{$size: "$userdata"}, 0]},
                                then:"$userdata",
                                else:"$admindata"
                            }
                        },
                        title:1,
                        message:1,
                        createdAt:1
                    }
                }
               // { $unwind: "$userdata" },
            ];

            var NotificationCount = await NotificationServices.updateRecordMany({user_type:1},{read_status:1});
            
           await NotificationServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(notificationdata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, notificationdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
}
module.exports = NotificationController;