'use strict';
const Login = require('./Login');
const Customers = require('./Customer');
const Driver = require('./Driver');
const BusinessCategory = require('./BusinessCategory');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Product = require('./Product');
const Brand = require('./Brand');
const Warehouse = require('./Warehouse');
const CustomizationType = require('./CustomizationType');
const Subadmin = require('./Subadmin');
const Content = require('./Content');
const CustomizationSubType = require('./CustomizationSubType');
const Banner = require('./Banner');
const Setting = require('./Setting');
const Rating = require('./Rating');
const Offer = require('./Offer');
const Order = require('./Order');
const Notification = require('./Notification');
const Transaction = require('./Transaction');
const Report = require('./Report');
const DealOfDay = require('./DealOfDay');

module.exports = {
    Login: Login,
    Customers: Customers,
    Driver: Driver,
    BusinessCategory: BusinessCategory,
    Category: Category,
    SubCategory: SubCategory,
    Product: Product,
    Brand: Brand,
    Warehouse: Warehouse,
    CustomizationType: CustomizationType,
    Subadmin: Subadmin,
    Content: Content,
    CustomizationSubType: CustomizationSubType,
    Banner: Banner,
    Setting: Setting,
    Rating: Rating,
    Offer: Offer,
    Order: Order,
    Notification: Notification,
    Transaction: Transaction,
    Report:Report,
    DealOfDay:DealOfDay
}