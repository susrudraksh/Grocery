'use strict';

const DriverProfile = require('./Profile');
const Login = require('./Login');
const Notification = require('./Notification');
const Order = require('./Order');
const Content = require('./Content');


module.exports = {
    Login: Login,
    Profile: DriverProfile,
    Notification: Notification,
    Order: Order,
    Content:Content
}