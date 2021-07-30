'use strict';

const Users =  require('./Users');
const Admins =  require('./Admins');
const UsersOtp =  require('./UsersOtps');
const BusinessCategory =  require('./BusinessCategory');
const Category =  require('./Category');
const Product =  require('./Products');
const ProductInventry =  require('./ProductInventry');
const ProductCustomization =  require('./ProductCustomization');
const CustomizationType =  require('./CustomizationType');
const ProductImages =  require('./ProductImages');
const Brand =  require('./Brand');
const FavouriteItem =  require('./FavouriteItem');
const TransactionHistory = require("./TransactionHistory");
const Warehouse = require("./Warehouse");
const Permissions = require("./Permissions");
const Contents = require("./Contents");
const Banner = require("./Banner");
const Setting = require("./Setting");
const Notifications = require("./Notifications");
const Carts = require("./Carts");
const Order = require("./Order");
const Offer = require("./Offer");
const RedeemPoint = require("./RedeemPoint");
const DealOfDay = require("./DealOfDay");

module.exports = {
    Users:Users,
    Admins:Admins,
    UsersOtp:UsersOtp,
    BusinessCategory:BusinessCategory,
    Category:Category,
    Product:Product,
    ProductInventry:ProductInventry,
    ProductCustomization:ProductCustomization,
    ProductImages:ProductImages,
    CustomizationType:CustomizationType,
    Brand:Brand,
    FavouriteItem:FavouriteItem,
    TransactionHistory:TransactionHistory,
    Warehouse:Warehouse,
    Permissions:Permissions,
    Contents:Contents,
    Banner:Banner,
    Setting:Setting,
    Notifications:Notifications,
    Carts:Carts,
    Order:Order,
    Offer:Offer,
    RedeemPoint:RedeemPoint,
    DealOfDay:DealOfDay
}