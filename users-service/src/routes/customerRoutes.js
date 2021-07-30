'use strict';

const express = require('express');
const Router = express.Router();
const { Login, Product, Wallet, Profile, Address, Notification, Cart, Order, Offer, Content,CcavenuPayment,DealOfDay } = require('../controllers/customer')


// LOGIN

Router.post("/registration", Login.customer_register);
Router.post("/login", Login.login);
// Router.put("/customer_logout/:user_id", Login.customer_logout);
Router.post("/resend_otp", Login.resend_otp);
Router.post("/verify_otp", Login.verify_otp);
Router.post("/update_forgot_password", Login.update_forgot_password);
// Router.get("/profile/:user_id", Login.get_profile);
// Router.put("/profile/:user_id", Login.update_profile);
// Router.put("/profile/image/:user_id", Login.update_profile_image);
Router.post("/profile/change_password", Profile.changePassword);
// Router.get("/is_exist/:phone", Login.is_customer_exist);


//  Products
Router.get("/product/get_business_category", Product.getBusinesscategory);
Router.post("/product/get_category", Product.getCategory);
Router.post("/product/get_subcategory", Product.getSubCategory);
Router.post("/product/get_products", Product.getProducts);
Router.post("/product/get_product_detail", Product.getProductDetail);
Router.post("/product/other_customization_products", Product.OtherProductList);

//Popular  or discount rating Product
Router.get("/product/popularproduct", Product.getPopularProduct);
Router.get("/product/discountproduct", Product.getDiscountProduct);
Router.post("/product/ratings", Product.giveRating);


// // Favourite Item
Router.post("/product/add_favourite_item", Product.addFavouriteItem);
Router.get("/product/get_favourite_items", Product.getFavouriteItems);
// Router.delete("/Product/delete_favourite_item/:user_id/:product_id", FavouriteItem.delete_favourite_item);

// // Brand
Router.get("/product/brand/get_brands", Product.getBrands);


// Wallet routes
Router.post("/wallet/add_to_wallet", Wallet.addToWallet);
Router.get("/wallet/get_transaction_history", Wallet.getTransactionHistory);

//Profile routes
Router.get("/profile/get_profile", Profile.getProfile);
Router.post("/profile/update_profile", Profile.updateProfile);
Router.post("/resend_verification_email", Profile.resendVerificationEmail);
Router.get("/verify_email/:user_id/:token", Profile.verifyEmail);
Router.post("/profile/change_password", Profile.changePassword);


// DELIVERY ADDRESS 
Router.post("/address/create_address", Address.create_address);
Router.post("/address/set_default_address", Address.set_default_address);
Router.post("/address/delete_address", Address.delete_address);
Router.get("/address/get_addresses", Address.getAddresses);


// Banner  
Router.get("/product/banner/get_banners", Product.getBannerList);


//Deal of day
Router.get("/product/dealofday", Product.getDealOfDayList);
Router.get("/product/dealofday/:dealofday_id", Product.getDealOfDayDetails);


//similar product
Router.post("/product/similar_products", Product.similarProductList);


//Notifications
Router.get("/notifications", Notification.getNotificationList);
Router.delete("/notifications/:notifications_id", Notification.deleteNotification);
Router.delete("/notifications", Notification.deleteAllNotification);


//Cart routes
Router.get("/cart", Cart.getCartItems);
Router.post("/cart", Cart.addToCart);
Router.put("/cart", Cart.updateCart);
Router.delete("/cart/:cart_id", Cart.deleteCartItem);
Router.get("/cart/get_cart_item_count", Cart.getCartItemCount);

// Customization Filter
Router.get("/product/customizationtype/:category_id", Product.getCustomizationType);
Router.get("/product/customizationsubtype/:customizationtype_id", Product.getCustomizationSubType);
Router.post("/product/listbyfilter", Product.getProductsByFilter);

// Order Apis
Router.post("/order/checkout", Order.processOrder);
Router.get("/order/user_orders", Order.userOrders);
Router.get("/order/order_details/:id", Order.customerOrderDetails);
Router.get("/order/past_orders", Order.getPastOrders);

Router.get("/order/get_order_detail", Order.getOrderDetail);
Router.post("/orders/cancel_order", Order.CancelOrderByUser);
Router.post("/orders/cancel_grocery_order", Order.CancelGroceryOrderByUser);
Router.post("/order/calculate_delivery_fees",Order.calculateDeliveryFees); 
Router.post("/orders/return_request", Order.ReturnOrderByUser);
Router.post("/orders/grocery_return_request", Order.ReturnGroceryOrderByUser);

Router.get("/order/get_redeem_point",Order.getRedeemPoints);
Router.post("/order/genrate_online_order", Order.genrateOrderforOnlinePayment);

Router.post("/offer/apply_coupon", Offer.applyOffer);
Router.get("/offer", Offer.getOffers);

//CONTENT
Router.get("/contents/:content_key", Content.get_content);

//Notify Me
Router.post("/product/notifyme", Product.notifyMe);

//get Payment response
Router.post("/payment/complete_payment", CcavenuPayment.completePayment);
Router.post("/payment/check_status", CcavenuPayment.checkTransationStatus);

//Download Invoice
Router.post("/order/downloadOrderInvoice",Order.downloadOrderPdf)


module.exports = Router;


