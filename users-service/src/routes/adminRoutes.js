'use strict';
const express = require('express');
const Router = express.Router();
const { Login, Setting, Customers, Rating, Driver, Transaction, BusinessCategory, Category, SubCategory, Product, Offer, Notification, Brand, Warehouse, CustomizationType, Subadmin, Content, CustomizationSubType, Banner, Order ,Report,DealOfDay} = require('../controllers/admin');



Router.post('/login', Login.admin_login);
Router.get("/profile", Login.get_profile);
Router.put("/update_profile", Login.update_profile);
Router.put("/change_password", Login.change_password);
Router.put("/profile/logout", Login.admin_logout);

Router.post("/profile/resend_otp", Login.resend_otp);
Router.post("/profile/update_forgot_password", Login.update_forgot_password);
Router.get("/profile/get_dashboard_data", Login.getDashboardData);

// SUB ADMIN
Router.get("/subadmins/get_permissions", Subadmin.getPermissions);
Router.get("/subadmins/get_subadmins", Subadmin.getSubadmins);
Router.post("/subadmins/create_subadmin", Subadmin.createSubadmin);
Router.get("/subadmins/get_subadmin/:subadmin_id", Subadmin.getSubadmin);
Router.put("/subadmins/update_subadmin/:subadmin_id", Subadmin.updateSubadmin);
Router.put("/subadmins/update_status/:subadmin_id", Subadmin.updateSubadminStatus);
Router.delete("/subadmins/delete_subadmin/:subadmin_id", Subadmin.deleteSubadmin);


//Customers
Router.get("/users", Customers.get_users);
Router.post("/users/create_user", Customers.create_user);
Router.get("/users/get_user/:user_id", Customers.get_user);
Router.put("/users/update_user/:user_id", Customers.update_user);
Router.put("/users/status/:user_id", Customers.update_status);
Router.delete("/users/delete_user/:user_id", Customers.delete_user);

//Drivers
Router.get("/drivers", Driver.get_drivers);
Router.post("/drivers/create_driver", Driver.create_driver);
Router.get("/drivers/get_driver/:user_id", Driver.get_driver);
Router.put("/drivers/update_driver/:user_id", Driver.update_driver);
Router.put("/drivers/status/:user_id", Driver.update_status);
Router.put("/drivers/online_status/:user_id", Driver.update_online_status);
Router.delete("/drivers/delete_driver/:user_id", Driver.delete_driver);

// Buiness category
Router.post("/business_categories/create_business_category", BusinessCategory.create_business_category);
Router.get("/business_categories", BusinessCategory.get_business_categories);
Router.get('/business_categories/get_business_category/:business_id',BusinessCategory.get_business_category);
Router.put('/business_categories/update_business_category/:business_id',BusinessCategory.update_business_category);
Router.put("/business_categories/update_status/:business_id", BusinessCategory.update_status);
Router.delete("/business_categories/delete_business_category/:business_id", BusinessCategory.delete_business_category);

// Category
Router.post("/product_categories/create_category", Category.create_category);
Router.get("/product_categories/get_categories", Category.get_categories);
Router.get("/product_categories/get_category/:category_id", Category.get_category);
Router.put("/product_categories/update_category/:category_id", Category.update_category);
Router.put("/product_categories/status/:category_id", Category.update_status);
Router.delete("/product_categories/delete_category/:category_id", Category.delete_category);


// Sub Category
Router.post("/product_sub_category/create_subcategory", SubCategory.create_subcategory);
Router.get("/product_sub_category/get_subcategories", SubCategory.get_subcategories);
Router.get("/product_sub_category/get_subcategory/:subcategory_id", SubCategory.get_subcategory);
Router.put("/product_sub_category/update_subcategory/:subcategory_id", SubCategory.update_subcategory);
Router.put("/product_sub_category/update_status/:subcategory_id", SubCategory.update_status);
Router.delete("/product_sub_category/delete_subcategory/:subcategory_id", SubCategory.delete_subcategory);
Router.get("/product_sub_category/get_category_by_business/:business_category_id", SubCategory.get_category_by_business);


// Brand
Router.post("/brand/create_brand", Brand.create_brand);
Router.get("/brand/get_brands", Brand.get_brands);
Router.get("/brand/get_brand/:brand_id", Brand.get_brand);
Router.put("/brand/update_brand/:brand_id", Brand.update_brand);
Router.put("/brand/update_status/:brand_id", Brand.update_status);
Router.delete("/brand/delete_brand/:brand_id", Brand.delete_brand);


// Warehouse
Router.post("/warehouse/create_warehouse", Warehouse.create_warehouse);
Router.get("/warehouse/get_warehouses", Warehouse.getWarehouses);
Router.get("/warehouse/get_warehouse/:warehouse_id", Warehouse.getWarehouse);
Router.put("/warehouse/update_warehouse/:warehouse_id", Warehouse.updateWarehouse);
Router.put("/warehouse/update_status/:warehouse_id", Warehouse.updateStatus);
Router.delete("/warehouse/delete_warehouse/:warehouse_id", Warehouse.deleteWarehouse);


// Product
Router.get("/product/get_product_lists", Product.getProductLists);
Router.post("/product/add_product", Product.add_product);
Router.put("/product/update_status/:product_id", Product.updateStatus);
Router.delete("/product/delete_product/:product_id", Product.deleteProduct);
Router.post("/product/delete_product_image", Product.deleteProductImages);
Router.post("/product/get_category", Product.getCategory);
Router.post("/product/get_subcategory", Product.getSubCategory);
Router.get("/product/get_customization_types", Product.getCustomizationTypes);
Router.get("/product/get_customization_type_values/:type_id", Product.getCustomizationTypeValues);
Router.get("/product/get_product/:product_id", Product.getProductDetail);
Router.put("/product/update_product_detail/:product_id", Product.updateProductDetail);
Router.post("/product/update_inventory_detail", Product.updateInventoryDetail);
Router.delete("/product/delete_customize_data/:customize_id", Product.deleteCustomizeData);
Router.delete("/product/delete_inventory_data/:inventory_id", Product.deleteInventoryData);
Router.delete("/product/delete_warehouseinventory/:inventory_id/:warehouseinventory_id", Product.deleteWarehouseInventoryData);

// Customization type
Router.post("/product_customizations/create_customization_type", CustomizationType.createCustomizationType);
Router.get("/product_customizations/get_customization_types", CustomizationType.getCustomizationTypes);
Router.get("/product_customizations/get_customization_type/:type_id", CustomizationType.getCustomizationType);
Router.put("/product_customizations/update_customize_type/:type_id", CustomizationType.update_customize_type);
Router.delete("/product_customizations/delete_type/:type_id", CustomizationType.delete_type);


Router.post("/product_customizations_subtype/create_subtype", CustomizationSubType.create_subtype);
Router.get("/product_customizations_subtype/get_subtypes", CustomizationSubType.get_subtypes);
Router.get("/product_customizations_subtype/get_subtype/:subtype_id", CustomizationSubType.get_subtype);
Router.put("/product_customizations_subtype/update_subtype/:subtype_id", CustomizationSubType.update_subtype);
Router.delete("/product_customizations_subtype/delete_subtype/:subtype_id", CustomizationSubType.delete_subtype);

// CONTENT
Router.get("/contents/faq", Content.get_faqs);
Router.post("/contents/faq", Content.create_faq);
Router.get("/contents/faq/:question_id", Content.get_faq);
Router.put("/contents/faq/:question_id", Content.update_faq);
Router.delete("/contents/faq/:question_id", Content.delete_faq);

Router.get("/contents/:content_key", Content.get_content);
Router.put("/contents/:content_key", Content.update_content);

// BANNER MODULE
Router.post("/banner/create_banner", Banner.create_banner);
Router.get("/banner/get_banners", Banner.getBanners);
Router.get("/banner/get_banner/:banner_id", Banner.getBanner);
Router.put("/banner/update_banner/:banner_id", Banner.updateBanner);
Router.put("/banner/update_status/:banner_id", Banner.updateStatus);
Router.delete("/banner/delete_banner/:banner_id", Banner.deleteBanner);
Router.post("/banner/get_banner_products", Banner.getBannerProducts);

// Deal of day MODULE
Router.post("/dealofday/create_dealofday", DealOfDay.create_dealofday);
Router.get("/dealofday/get_dealofday", DealOfDay.getDealOfDayList);
Router.get("/dealofday/get_dealofday/:dealofday_id", DealOfDay.getDealOfDay);
Router.put("/dealofday/update_dealofday/:dealofday_id", DealOfDay.updateDealOfDay);
Router.put("/dealofday/update_status/:dealofday_id", DealOfDay.updateStatus);
Router.delete("/dealofday/delete_dealofday/:dealofday_id", DealOfDay.deleteDealOfDay);
Router.post("/dealofday/get_dealofday_products", DealOfDay.getDealOfDayProducts);

//RATING
Router.post("/rating/add_rating", Rating.addRating);
Router.get("/rating/get_ratings/:product_id", Rating.getRatings);
Router.put("/rating/update_status/:product_inventory_id/:rating_id", Rating.updateStatus);

// SETTING MODULE
Router.get("/setting/get_setting", Setting.getSettings);
Router.post("/setting/update_setting", Setting.updateSetting);

// ORDER MODULE
Router.get("/orders/available_drivers", Order.getAvailableDrivers);
Router.get("/orders", Order.getOrders);
Router.get("/orders/get_order_detail/:order_id", Order.getOrderDetail);
Router.post("/orders/assign_order", Order.assignOrder);
Router.get("/orders/order_details/:id", Order.customerOrderDetails);
Router.put("/orders/update_status/:order_id/:status/:business_category_id/:user_id", Order.returnGroceryOrderByAdmin);
Router.put("/orders/update_normal_status/:order_id/:status/:sub_order_id/:user_id", Order.returnOrderByAdmin);
Router.post("/orders/downloadOrderInvoice",Order.downloadOrderPdf)
Router.get("/orders/downloadOrderInvoice",Order.getOrderPdf)



Router.post("/offer", Offer.createOffer);
Router.get("/offer", Offer.getOffers);
Router.get("/offer/:offer_id", Offer.getOffer);
Router.put("/offer/:offer_id", Offer.updateOffer);
Router.put("/offer/update_status/:offer_id", Offer.updateStatus);
Router.delete("/offer/:offer_id", Offer.deleteOffer);

// TRANSACTON MODULE
Router.get("/transaction", Transaction.getTransactionHistory);

// NOTIFICATION MODULE
Router.get("/notification", Notification.getCustomerLists);
Router.post("/notification", Notification.addNotifications);
Router.get("/notification/list", Notification.getNotifications);

// Reports MODULE
Router.post("/report/get_sale_report", Report.getOrders);
Router.post("/report/get_reconcilation_report", Report.getProducts);

module.exports = Router;
