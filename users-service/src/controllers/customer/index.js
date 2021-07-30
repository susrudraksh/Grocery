'use strict';

const Login = require('./Login');
const Product = require('./Product');
const Profile = require('./Profile');
const Wallet = require('./Wallet');
const Address = require('./Address');
const Notification = require('./Notification');
const Cart = require('./Cart');
const Order = require('./Order');
const Offer = require('./Offer');
const Content = require('./Content');
const CcavenuPayment = require('./CcavenuPayment');

module.exports = {
    Login: Login,
    Product: Product,
    Profile: Profile,
    Wallet: Wallet,
    Address: Address,
    Notification: Notification,
    Cart: Cart,
    Order: Order,
    Offer: Offer,
    Content: Content,
    CcavenuPayment:CcavenuPayment
}