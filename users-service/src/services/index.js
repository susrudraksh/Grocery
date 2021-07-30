'use strict';

const AdminServices = require('./AdminServices');
const UserServices = require('./UserServices');
const OtpServices = require('./OtpServices');
const BusinessCategoryServices = require('./BusinessCategoryServices');
const CategoryServices = require('./CategoryServices');
const ProductServices = require('./ProductServices');
const ProductInventoryServices = require('./ProductInventoryServices');
const ProductCustomizationServices = require('./ProductCustomizationServices');
const CustomizationTypeServices = require('./CustomizationTypeServices');
const BrandServices = require('./BrandServices');
const FavouriteItemServices = require('./FavouriteItemServices');
const TransactionHistoryServices = require("./TransactionHistoryServices");
const WarehouseServices = require("./WarehouseServices");
const PermissionServices = require("./PermissionServices");
//const ContentServices = require("./ContentServices");
const BannerServices = require("./BannerServices");
const ProductImageServices = require("./ProductImageServices");
const SettingServices = require("./SettingServices");
const NotificationServices = require("./NotificationServices");
const CartServices = require("./CartServices");
const OrderServices = require("./OrderServices");
const OfferServices = require("./OfferServices");
const DeliveryServices = require("./DeliveryServices");
const {ContentServices} = require("./Other_services");
const RedeemPointServices = require("./RedeemPointServices");
const DealOfDayServices = require("./DealOfDayServices");


module.exports = {
    AdminServices:AdminServices,
    UserServices:UserServices,
    OtpServices:OtpServices,
    BusinessCategoryServices:BusinessCategoryServices,
    CategoryServices:CategoryServices,
    ProductServices:ProductServices,
    CustomizationTypeServices:CustomizationTypeServices,
    BrandServices:BrandServices,
    FavouriteItemServices:FavouriteItemServices,
    ProductInventoryServices:ProductInventoryServices,
    ProductCustomizationServices:ProductCustomizationServices,
    TransactionHistoryServices:TransactionHistoryServices,
    WarehouseServices:WarehouseServices,
    PermissionServices:PermissionServices,
    ContentServices:ContentServices,
    BannerServices:BannerServices,
    ProductImageServices:ProductImageServices,
    SettingServices:SettingServices,
    NotificationServices:NotificationServices,
    CartServices:CartServices,
    OrderServices:OrderServices,
    OfferServices:OfferServices,
    DeliveryServices:DeliveryServices,
    RedeemPointServices:RedeemPointServices,
    DealOfDayServices:DealOfDayServices
}