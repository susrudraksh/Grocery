'use strict';

module.exports = {

	BAD_REQUEST: "Bad Request",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	NOT_FOUND: "Not Found",
	INTERNAL_SERVER_ERROR: "Internal Server Error",

	PHONE_ALREADY_REGISTERED: "You are already registered with this phone number.",

	EMAIL_ALREADY_REGISTERED: "You are already registered with this email address.",
	EMAIL_ALREADY_REGISTERED_FB: "You are already registered with this email address through your facebook account.",
	EMAIL_ALREADY_REGISTERED_GOOGLE: "You are already registered with this email address through your google account.",

	NEW_EMAIL_ALREADY_EXIST: "New email address is already exist.",
	VERIFY_EMAIL: "Please verify Email which is sent to your email id.",

	VERIFY_OTP: "Please verify OTP which is sent to your phone.",
	OTP_SENT_ON_EMAIL: "OTP has sent to your email.",
	OTP_SENT_ON_PHONE: "OTP has sent to your phone.",

	LOGIN_SUCCESS: "You have logged in successfully.",
	LOGOUT_SUCCESS: "You have logged out successfully.",
	OTP_VERIFY_SUCCESS: "OTP has verified successfully.",
	CHANGE_PASSWORD_SUCCESS: "You have changed password successfully.",
	CHANGE_EMAIL_SUCCESS: "You have changed email successfully.",
	PHONE_UPDATE_SUCCESSFULLY:"You have changed phone successfully.",
	CHANGE_PROFILE_SUCCESS: "profile update successfully.",
	CHANGE_NOTIFICATION_SUCCESS: "You have changed notification settings successfully.",
	CHANGE_PROFILE_IMAGE_SUCCESS: "Your profile image has changed successfully.",
	FIELD_VALUE_INVALID:"Invalid field key",

	ACCOUNT_IS_DEACTIVATE: "Your account has deactivated. Please contact to Administration.",
	ACCOUNT_IS_DELETED: "Your account has removed. Please contact to Administration.",

	INVALID_LOGIN_CREDENTIALS: "Login credentials are invalid.",
	INVALID_EMAIL: "Invalid Email. No account exist with this email.",
	INVALID_PHONE: "Invalid Phone Number. No account exist with this phone number.",
	INVALID_USERNAME_EMAIL: "Invalid Username/Email. No account exist.",
	INVALID_OTP: "Invalid OTP provided , Please enter corrrect OTP",
	INVALID_OLD_PASSWORD: "Your old password is incorrect.",
	EMAIL_IS_BLANK: "Email address is empty. Please provide a valid email address.",


	USER_NOT_EXIST: "User doesn't exist.",
	USER_CREATE_SUCCESS: "User has created successfully.",
	USER_UPDATE_SUCCESS: "User details has updated successfully.",
	USER_STATUS_UPDATE_SUCCESS: "User status has updated successfully.",
	USER_DELETE_SUCCESS: "User has deleted successfully.",
	NO_USERS_EXIST: "No users found.",

	INVALID_OTP_REQUEST: "Invalid OTP Request.",
	INVALID_USER_REQUEST: "Invalid User Request.",
	INVALID_UPDATE_REQUEST: "Invalid Update Request.",
	INVALID_IMAGE_FORMAT: "Invalid Image File Format.",
	INVALID_ADDRESS: "Invalid Address.",

	NOT_ALLOW_TO_CHANGE_PASSWORD: "You are not allowed to changed password. You can login via social links only.",

	NO_NOTIFICATIONS_EXIST: "No notifications yet.",

	NOT_ALLOW_TO_USE_FREE_SUBSCRIPTION: "You are not able to use Free Membership now.",
	SUBSCRIPTION_PURCHASE_SUCCESS: "You have purchased subscription successfully.",
	NO_ACTIVATED_SUBSCRIPTION_EXIST: "No activated subscription plan yet.",
	NO_SUBSCRIPTION_EXIST: "You don't have any subscription plan. Please upgrade your subscription plan.",
	SUBSCRIPTION_DATE_EXPIRED: "Your subscription plan has expired. Please upgrade your subscription plan.",
	SUBSCRIPTION_POSTS_LIMIT_EXCEEDED: "You have exceeded your featured posts limit. Please upgrade your subscription plan.",

	CONTACT_REQUEST_SUCCESS: "Your request has submitted successfully.",

	ADMIN_NOT_EXIST: "Admin doesn't exist.",
	ADMIN_UPDATE_SUCCESS: "Admin details has updated successfully.",


	SUBADMIN_CREATE_SUCCESS: "Sub admin has created successfully.",
	SUBADMIN_UPDATE_SUCCESS: "Sub admin details has updated successfully.",
	SUBADMIN_STATUS_UPDATE_SUCCESS: "Sub admin status has changed successfully.",
	SUBADMIN_DELETE_SUCCESS: "Sub admin has deleted successfully.",
	SUBADMIN_NOT_EXIST: "Sub admin doesn't exist.",

	// VOUCHERS
	VOUCHER_CREATE_SUCCESS: "Voucher has created successfully.",
	VOUCHER_UPDATE_SUCCESS: "Voucher details has updated successfully.",
	VOUCHER_STATUS_UPDATE_SUCCESS: "Voucher status has changed successfully.",
	VOUCHER_DELETE_SUCCESS: "Voucher has deleted successfully.",
	VOUCHER_NOT_EXIST: "Voucher doesn't exist.",

	//BUSINESS CATEGORY	
	BUSINESS_CATEGORY_CREATE_SUCCESS: "Business category has created successfully.",
	BUSINESS_CATEGORY_NOT_EXIST: "Business category doesn't exist.",
	BUSINESS_CATEGORY_UPDATE_SUCCESS: "Business category details has updated successfully.",
	BUSINESS_CATEGORY_STATUS_UPDATE_SUCCESS: "Business category status has updated successfully.",
	BUSINESS_CATEGORY_DELETE_SUCCESS: "Business category has deleted successfully.",

	// CATEGORY
	CATEGORY_CREATE_SUCCESS: "Category has created successfully.",
	CATEGORY_NOT_EXIST: "Category doesn't exist.",
	CATEGORY_UPDATE_SUCCESS: "Category details has updated successfully.",
	CATEGORY_STATUS_UPDATE_SUCCESS: "Category status has updated successfully.",
	CATEGORY_DELETE_SUCCESS: "Category has deleted successfully.",

	//BUSINESS CATEGORY	
	SUB_CATEGORY_CREATE_SUCCESS: "Sub Category has created successfully.",
	SUB_CATEGORY_NOT_EXIST: "Sub Category doesn't exist.",
	SUB_CATEGORY_UPDATE_SUCCESS: "Sub Category details has updated successfully.",
	SUB_CATEGORY_STATUS_UPDATE_SUCCESS: "Sub Category status has updated successfully.",
	SUB_CATEGORY_DELETE_SUCCESS: "Sub Category has deleted successfully.",



	// CART ITEMS
	CARTITEM_ADD_SUCCESS: "Cart item has added successfully.",
	CARTITEM_REMOVE_SUCCESS: "Cart item has removed successfully.",
	CART_IS_EMPTY: "Cart is empty.",
	CART_UPDATE_SUCCESS: "Cart has updated successfully.",
	CART_CLEAR_SUCCESS: "Cart has cleared successfully.",
	CARTITEM_FETCH_SUCCESS: "Cart item list fetched successfully.",

	// TRANSACTIONS
	MONEY_ADDED_SUCCESS: "Money has added successfully.",
	MONEY_SENT_SUCCESS: "Money has sent successfully.",
	MONEY_SENDER_RECEIVER: "Invalid Sender or Receiver Id.",
	INSUFFICIENT_WALLET_BALANCE: "You have insufficient balance in your wallet.",

	NOTIFICATIONS_SENT_SUCCESS: "Notification has sent successfully.",

	ERRORLOG_DELETE_SUCCESS: "Error log has deleted successfully.",
	ERRORLOG_NOT_EXIST: "Error log doesn't exist.",
	DATA_FETCH_SUCCESSFULLY: "Data fetch successfully",
	ADMIN_UPDATE_SUCCESS: "Admin details has updated successfully.",

	// Product
	PRODUCT_CREATE_SUCCESS: "Product has created successfully.",
	PRODUCT_NOT_EXIST: "Product doesn't exist.",
	PRODUCT_UPDATE_SUCCESS: "Product details has updated successfully.",
	PRODUCT_STATUS_UPDATE_SUCCESS: "Product status has updated successfully.",
	PRODUCT_DELETE_SUCCESS: "Product has deleted successfully.",
	PRODUCT_FETCH_SUCCESS: "Product list fetch successfully.",
	PRODUCT_IMAGE_DELETE_SUCCESS: "Product image has deleted successfully.",
	PRODUCT_IMAGE_NOT_EXIST: "Product image doesn't exist.",
	CUSTOMIZE_DATA_DELETE_SUCCESS: "Product customize has deleted successfully.",
	CUSTOMIZE_DATA_NOT_EXIST: "Product customize data not exist.",



	 // BRAND
	 BRAND_CREATE_SUCCESS: "Brand has created successfully.",
	 BRAND_NOT_EXIST: "Brand doesn't exist.",
	 BRAND_UPDATE_SUCCESS: "Brand details has updated successfully.",
	 BRAND_STATUS_UPDATE_SUCCESS: "Brand status has updated successfully.",
	 BRAND_DELETE_SUCCESS: "Brand has deleted successfully.",

	 // SETTING
	 SETTING_UPDATE_SUCCESS: "Setting details has updated successfully.",
	 SETTING_NOT_EXIST: "Setting doesn't exist.",
 
	 // WAREHOUSE
	 WAREHOUSE_CREATE_SUCCESS: "WAREHOUSE has created successfully.",
	 WAREHOUSE_NOT_EXIST: "WAREHOUSE doesn't exist.",
	 WAREHOUSE_UPDATE_SUCCESS: "WAREHOUSE details has updated successfully.",
	 WAREHOUSE_STATUS_UPDATE_SUCCESS: "WAREHOUSE status has updated successfully.",
	 WAREHOUSE_DELETE_SUCCESS: "WAREHOUSE has deleted successfully.",
 
	 // ADDRESS
	 ADDRESS_CREATE_SUCCESS: "Address has created successfully.",
	 ADDRESS_NOT_EXIST: "Address doesn't exist.",
	 ADDRESS_DELETE_SUCCESS: "Address has deleted successfully.",
 
	 // CUSTOMIZATION TYPE
	 TYPE_CREATE_SUCCESS: "Customization type has created successfully.",
	 TYPE_VALUE_CREATE_SUCCESS: "Customization type value has created successfully.",
	 TYPE_UPDATE_SUCCESS: "Type details has updated successfully.",
	 TYPE_DELETE_SUCCESS: "Type has deleted successfully.",
	 TYPE_NOT_EXIST: "Type doesn't exist.",

	 // CUSTOMIZATION TYPE
	 SUB_TYPE_CREATE_SUCCESS: "Customization sub type has created successfully.",
	 SUB_TYPE_VALUE_CREATE_SUCCESS: "Customization type value has created successfully.",
	 SUB_TYPE_UPDATE_SUCCESS: "Type details has updated successfully.",
	 SUB_TYPE_DELETE_SUCCESS: "Type has deleted successfully.",
	 SUB_TYPE_NOT_EXIST: "Type doesn't exist.",
 
	 
 
	 // FAVOURITE ITEMS
	 FAV_CREATE_SUCCESS: "Item successfully added to your favourite list.",
	 FAV_REMOVE_SUCCESS: "Item successfully remove to your favourite list.",
	 FAV_STATUS_UPDATE: "favourite status update succssfully.",
 

	 //Wallet 
	 MONEY_ADDED_WALLET_SUCCESS: "Amount added successfully.",

	 
	 // CONTENT
	CONTENT_UPDATE_SUCCESS: "Content has updated successfully.",
	INVALID_CONTENT_KEY: "Invalid content key.",
	NOT_ALLOW_CONTENT_KEY: "Not allowed to update content with this key.",

	// FAQS
	FAQ_CREATE_SUCCESS: "FAQ has created successfully.",
	FAQ_UPDATE_SUCCESS: "FAQ details has updated successfully.",
	FAQ_STATUS_UPDATE_SUCCESS: "FAQ status has changed successfully.",
	FAQ_DELETE_SUCCESS: "FAQ has deleted successfully.",
	NO_FAQS_EXIST: "No FAQs Yet.",
	FAQ_NOT_EXIST: "FAQ doesn't exist.",
	FAQ_DATA_MISSING: "FAQ data not found in database.",
	INVALID_FAQ_REQUEST: "Invalid FAQ Request.",

	// BANNER	
	BANNER_CREATE_SUCCESS: "Banner has created successfully.",
	BANNER_NOT_EXIST: "Banner doesn't exist.",
	BANNER_UPDATE_SUCCESS: "Banner details has updated successfully.",
	BANNER_STATUS_UPDATE_SUCCESS: "Banner status has updated successfully.",
	BANNER_DELETE_SUCCESS: "Banner has deleted successfully.",
	 

	//NOTIFICATION
	NOTIFICATION_LIST_SUCCESS: "Successfully fetch notifications list.",
	NOTIFICATION_DELETE_SUCCESS: "Notification has been deleted successfully.",

	// NOTIFY_ME
	NOTIFY_ME: "You have been notify , when product is available"

};