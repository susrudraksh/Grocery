'use strict';

const express = require('express');
const Router = express.Router();
const { Login, Profile, Notification, Order, Content } = require('../controllers/driver');


// LOGIN
Router.post("/login", Login.login);
// Router.put("/customer_logout/:user_id", Login.customer_logout);
Router.post("/resend_otp", Login.resend_otp);
Router.post("/verify_otp", Login.verify_otp);
Router.post("/update_forgot_password", Login.update_forgot_password);

//Profile routes
Router.get("/profile/get_profile", Profile.getProfile);
Router.post("/profile/update_profile", Profile.updateProfile);
Router.post("/profile/change_password", Profile.changePassword);
Router.put("/profile/change_online_status", Profile.changeOnlineStatus);
Router.put("/profile/update_location", Profile.updateLocation);


//Notifications
Router.get("/notifications", Notification.getNotificationList);
Router.delete("/notifications/:notifications_id", Notification.deleteNotification);
Router.delete("/notifications", Notification.deleteAllNotification);
Router.get("/notifications/get_notification_count", Notification.getNotificationCount);

// Order module
Router.get("/order", Order.getOrders);
Router.get("/order/order_detail/:order_id", Order.OrderDetails);
Router.put("/order/update_order_status/:order_id",Order.updateOrderStatus);
Router.get("/order/order_stats",Order.orderStats);

//CONTENT
Router.get("/contents/:content_key", Content.get_content);


module.exports = Router;